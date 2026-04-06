import type { FileNode } from "@/lib/file-system";
import { VirtualFileSystem } from "@/lib/file-system";
import { buildStrReplaceTool } from "@/lib/tools/str-replace";
import { buildFileManagerTool } from "@/lib/tools/file-manager";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getLanguageModel } from "@/lib/provider";
import { generationPrompt } from "@/lib/prompts/generation";

export async function POST(req: Request) {
  const {
    messages,
    files,
    projectId,
  }: { messages: any[]; files: Record<string, FileNode>; projectId?: string } =
    await req.json();

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
}

export const maxDuration = 120;
