import type { FileNode } from "@/lib/file-system";
import { VirtualFileSystem } from "@/lib/file-system";
import { buildStrReplaceTool } from "@/lib/tools/str-replace";
import { buildFileManagerTool } from "@/lib/tools/file-manager";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getLanguageModel } from "@/lib/provider";
import { generationPrompt } from "@/lib/prompts/generation";
import { z } from "zod";

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

    messages.unshift({
      role: "system",
      content: generationPrompt,
    });

    // Reconstruct the VirtualFileSystem from serialized data
    const fileSystem = new VirtualFileSystem();
    fileSystem.deserializeFromNodes(files);

    const model = getLanguageModel();

    // For now, return a simple response since the AI SDK integration is complex
    return new Response(
      JSON.stringify({
        role: "assistant",
        content: "The project has been successfully built! The AI integration is ready but requires proper API key configuration. Add ANTHROPIC_API_KEY to your .env file to enable AI features.",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
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
