import type { APIRoute } from 'astro';
import { handleScorePost } from '../../server/score-post';

export const prerender = false;

function getApiKey(locals: App.Locals): string {
  const runtime = locals.runtime as { env?: Record<string, string | undefined> } | undefined;
  const fromCf = runtime?.env?.OPENROUTER_API_KEY;
  if (fromCf) return fromCf;
  return import.meta.env.OPENROUTER_API_KEY || import.meta.env.DEEPSEEK_API_KEY || '';
}

export const POST: APIRoute = async ({ request, locals }) => {
  const apiKey = getApiKey(locals);
  const baseUrl =
    import.meta.env.PUBLIC_LLM_BASE_URL ||
    (locals.runtime as { env?: Record<string, string | undefined> } | undefined)?.env?.LLM_BASE_URL ||
    undefined;

  return handleScorePost(request, { apiKey, baseUrl });
};

export const OPTIONS: APIRoute = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
