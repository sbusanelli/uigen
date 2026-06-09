import { tool } from "ai";
import { z } from "zod";
import { VirtualFileSystem } from "@/lib/file-system";

const TextEditorParameters = z.object({
  command: z.enum(["view", "create", "str_replace", "insert", "undo_edit"]),
  path: z.string(),
  file_text: z.string().optional(),
  insert_line: z.number().optional(),
  new_str: z.string().optional(),
  old_str: z.string().optional(),
  view_range: z.array(z.number()).optional(),
});

export const buildStrReplaceTool = (fileSystem: VirtualFileSystem) => {
  return tool({
    description: "Text editor tool for viewing, creating, and modifying files",
    inputSchema: TextEditorParameters,
    execute: async ({ command, path, file_text, insert_line, new_str, old_str, view_range }) => {
      
      switch (command) {
        case "view":
          return fileSystem.viewFile(
            path,
            view_range ? [view_range[0], view_range[1]] : undefined
          ) || "File not found";

        case "create":
          if (!file_text) {
            return "Error: file_text is required for create command";
          }
          return fileSystem.createFile(path, file_text) || "File created successfully";

        case "str_replace":
          if (!old_str || !new_str) {
            return "Error: old_str and new_str are required for str_replace";
          }
          return fileSystem.replaceInFile(path, old_str, new_str) || "Text replaced successfully";

        case "insert":
          if (insert_line === undefined || !new_str) {
            return "Error: insert_line and new_str are required for insert";
          }
          return fileSystem.insertInFile(path, insert_line, new_str) || "Text inserted successfully";

        case "undo_edit":
          return "Error: undo_edit not implemented yet";

        default:
          return `Error: Unknown command: ${command}`;
      }
    },
  });
};
