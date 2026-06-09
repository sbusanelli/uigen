import { tool } from "ai";
import { z } from "zod";
import { VirtualFileSystem } from "../file-system";

export function buildFileManagerTool(fileSystem: VirtualFileSystem) {
  return tool({
    description:
      'Rename or delete files or folders in the file system. Rename can be used to "move" a file. Rename will recursively create folders as required.',
    inputSchema: z.object({
      command: z
        .enum(["rename", "delete"])
        .describe("The operation to perform"),
      path: z
        .string()
        .describe("The path to the file or directory to rename or delete"),
      new_path: z
        .string()
        .optional()
        .describe("The new path. Only provide when renaming or moving a file."),
    }),
    execute: async ({ command, path, new_path }) => {
      
      switch (command) {
        case "rename":
          if (!new_path) {
            return "Error: new_path is required for rename";
          }
          try {
            // Get the current file content
            const currentFile = fileSystem.viewFile(path);
            if (currentFile === null) {
              return `Error: File not found: ${path}`;
            }
            
            // Create the new file with the same content
            fileSystem.createFile(new_path, currentFile);
            
            // Delete the old file
            fileSystem.deleteFile(path);
            
            return "File renamed successfully";
          } catch (error) {
            return `Error: Failed to rename ${path}`;
          }

        case "delete":
          try {
            const success = fileSystem.deleteFile(path);
            if (success) {
              return "File deleted successfully";
            } else {
              return `Error: Failed to delete ${path}`;
            }
          } catch (error) {
            return `Error: Failed to delete ${path}`;
          }
      }

      return "Error: Invalid command";
    },
  });
}
