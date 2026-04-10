/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly OPENROUTER_API_KEY?: string;
  readonly DEEPSEEK_API_KEY?: string;
  readonly PUBLIC_LLM_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    runtime?: {
      env?: Record<string, string | undefined>;
    };
  }
}
