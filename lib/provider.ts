import { anthropic } from "@ai-sdk/anthropic";

const MODEL = "claude-3-5-haiku-20241022";

export function getLanguageModel() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    console.log("No ANTHROPIC_API_KEY found, using mock provider");
    return anthropic("claude-3-haiku-20240307");
  }

  return anthropic(MODEL);
}
