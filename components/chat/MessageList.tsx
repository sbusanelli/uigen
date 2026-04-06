"use client";

import React from "react";
import { UIMessage } from "ai";
import { cn } from "@/lib/utils";
import { User, Bot, Loader2 } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface MessageListProps {
  messages: UIMessage[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 mb-4 shadow-sm">
          <Bot className="h-7 w-7 text-blue-600" />
        </div>
        <p className="text-neutral-900 font-semibold text-lg mb-2">Start a conversation to generate React components</p>
        <p className="text-neutral-500 text-sm max-w-sm">I can help you create buttons, forms, cards, and more</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-6">
      <div className="space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "flex gap-3 max-w-[85%] items-start",
                message.role === "user"
                  ? "flex-row-reverse"
                  : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full",
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-lg px-4 py-2",
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                )}
              >
                <div className="text-sm whitespace-pre-wrap">
                  {message.content ? (
                    message.content
                  ) : message.parts?.length > 0 ? (
                    message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return <div key={index}>{part.text}</div>;
                      }
                      if (part.type === "tool-invocation") {
                        return (
                          <div key={index} className="text-xs text-gray-500 mt-1">
                            🛠️ {part.toolInvocation.toolName}
                          </div>
                        );
                      }
                      if (part.type === "reasoning") {
                        return (
                          <div key={index} className="text-xs text-blue-600 mt-1 border-l-2 border-blue-200 pl-2">
                            🧠 Reasoning: {part.reasoning}
                          </div>
                        );
                      }
                      if (part.type === "step-start") {
                        return <hr key={index} className="my-2 border-gray-300" />;
                      }
                      return null;
                    })
                  ) : (
                    <div>No content</div>
                  )}
                </div>
                {isLoading && message.role === "assistant" && (
                  <div className="flex items-center gap-2 text-neutral-500 mt-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span className="text-sm">Generating...</span>
                  </div>
                )}
              </div>
            </div>
            
            {message.role === "user" && (
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-lg bg-blue-600 shadow-sm flex items-center justify-center">
                  <User className="h-4.5 w-4.5 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}