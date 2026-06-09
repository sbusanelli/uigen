import type { FileNode } from "@/lib/file-system";
import { VirtualFileSystem } from "@/lib/file-system";
import { buildStrReplaceTool } from "@/lib/tools/str-replace";
import { buildFileManagerTool } from "@/lib/tools/file-manager";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getLanguageModel } from "@/lib/provider";
import { generationPrompt } from "@/lib/prompts/generation";
import { z } from "zod";
import { streamText } from "ai";

// Input validation schema
const chatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
  })),
  files: z.record(z.string(), z.any()),
  projectId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Validate and parse request body
    const body = await req.json();
    const validatedData = chatRequestSchema.parse(body);
    
    const { messages, files, projectId } = validatedData;

    // Add system message
    const messagesWithSystem = [
      {
        role: "system" as const,
        content: generationPrompt,
      },
      ...messages,
    ];

    // Reconstruct the VirtualFileSystem from serialized data
    const fileSystem = new VirtualFileSystem();
    fileSystem.deserializeFromNodes(files);

    const model = getLanguageModel();

    // Use the new AI SDK v6 streamText with full tool integration
    const result = await streamText({
      model,
      messages: messagesWithSystem,
      tools: {
        str_replace_editor: buildStrReplaceTool(fileSystem),
        file_manager: buildFileManagerTool(fileSystem),
      },
      onFinish: async ({ response }) => {
        // Save to project if projectId is provided and user is authenticated
        if (projectId) {
          try {
            // Check if user is authenticated
            const session = await getSession();
            if (!session) {
              console.error("User not authenticated, cannot save project");
              return;
            }

            // Get the messages from the response
            const responseMessages = response.messages || [];
            // Combine original messages with response messages
            const allMessages = [...messages, ...responseMessages];

            await prisma.project.update({
              where: {
                id: projectId,
                userId: session.userId,
              },
              data: {
                messages: JSON.stringify(allMessages),
                data: JSON.stringify(fileSystem.serialize()),
              },
            });
          } catch (error) {
            console.error("Failed to save project data:", error);
          }
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid request format", details: error.errors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const maxDuration = 120;
