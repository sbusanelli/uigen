"use client";

import { useState } from "react";

export default function Home() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-50">
      <div className="h-full flex">
        {/* Left Panel - Chat */}
        <div className="w-1/3 flex flex-col bg-white border-r border-neutral-200">
          <div className="h-14 flex items-center px-6 border-b border-neutral-200/60">
            <h1 className="text-lg font-semibold text-neutral-900 tracking-tight">React Component Generator</h1>
          </div>
          <div className="flex-1 p-4">
            <div className="h-full flex flex-col">
              {/* Chat Messages Area */}
              <div className="flex-1 bg-neutral-50 rounded-lg border border-neutral-200 p-4 mb-4">
                <div className="text-center text-neutral-500">
                  <div className="mb-4">💬</div>
                  <p className="text-sm">AI Chat Interface</p>
                  <p className="text-xs mt-2">Start generating React components with AI</p>
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="bg-white rounded-lg border border-neutral-200 p-3">
                <textarea 
                  className="w-full p-2 text-sm border border-neutral-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the React component you want to generate..."
                  rows={3}
                />
                <button className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                  Generate Component
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview/Code */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="h-14 border-b border-neutral-200/60 px-6 flex items-center justify-between bg-neutral-50/50">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveView("preview")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeView === "preview" 
                    ? "bg-white text-neutral-900 border border-neutral-200 shadow-sm" 
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                Preview
              </button>
              <button 
                onClick={() => setActiveView("code")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeView === "code" 
                    ? "bg-white text-neutral-900 border border-neutral-200 shadow-sm" 
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                Code
              </button>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsSignedIn(!isSignedIn)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isSignedIn 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {isSignedIn ? "✓ Signed In" : "Sign In"}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-neutral-50">
            {activeView === "preview" ? (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center text-neutral-500">
                  <div className="mb-4">⚡</div>
                  <p className="text-lg font-medium">Component Preview</p>
                  <p className="text-sm mt-2">Your generated React components will appear here</p>
                  <div className="mt-6 p-6 bg-white rounded-lg border border-neutral-200 max-w-md">
                    <div className="text-left text-sm text-neutral-600">
                      <p className="font-medium text-neutral-900 mb-2">Getting Started:</p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Add ANTHROPIC_API_KEY to .env file</li>
                        <li>Type a component description in the chat</li>
                        <li>Click "Generate Component"</li>
                        <li>See live preview here!</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex">
                {/* File Tree */}
                <div className="w-64 bg-white border-r border-neutral-200 p-4">
                  <h3 className="text-sm font-medium text-neutral-900 mb-3">Files</h3>
                  <div className="space-y-1">
                    <div className="text-sm text-neutral-600 hover:bg-neutral-100 px-2 py-1 rounded cursor-pointer">
                      📁 src/
                    </div>
                    <div className="text-sm text-neutral-600 hover:bg-neutral-100 px-2 py-1 rounded cursor-pointer ml-4">
                      📄 components/
                    </div>
                    <div className="text-sm text-neutral-600 hover:bg-neutral-100 px-2 py-1 rounded cursor-pointer ml-8">
                      📄 Button.jsx
                    </div>
                    <div className="text-sm text-neutral-600 hover:bg-neutral-100 px-2 py-1 rounded cursor-pointer ml-8">
                      📄 Card.jsx
                    </div>
                  </div>
                </div>
                
                {/* Code Editor */}
                <div className="flex-1 bg-gray-900 p-4">
                  <div className="text-green-400 font-mono text-sm">
                    <div>{"// Your generated React code will appear here"}</div>
                    <div className="mt-2">{"import React from 'react';"}</div>
                    <div className="mt-1">{"const Button = ({ children, ...props }) => {"}</div>
                    <div className="ml-4">{"return ("}</div>
                    <div className="ml-8">{"<button {...props} className=\"px-4 py-2 bg-blue-500 text-white rounded\">"}</div>
                    <div className="ml-12">{"{children}"}</div>
                    <div className="ml-8">{"</button>"}</div>
                    <div className="ml-4">{");"}</div>
                    <div className="">{"};"}</div>
                    <div className="mt-1">{"export default Button;"}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
