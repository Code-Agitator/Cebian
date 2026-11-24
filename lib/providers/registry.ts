// ─── Provider registry ───

import { t } from '@/lib/i18n';

export const OAUTH_PROVIDERS = [
  { provider: 'github-copilot', label: 'GitHub Copilot', getDescription: () => t('provider.oauth.descriptions.githubCopilot'), flow: 'device-code' as const },
  { provider: 'openai-codex', label: 'OpenAI Codex', getDescription: () => t('provider.oauth.descriptions.openaiCodex'), flow: 'auth-code' as const },
] as const satisfies readonly {
  provider: string;
  label: string;
  getDescription: () => string;
  flow: 'device-code' | 'auth-code';
}[];

export const APIKEY_PROVIDERS = [
  { provider: 'ant-ling', label: 'Ant Ling' },
  { provider: 'anthropic', label: 'Anthropic', pinned: true },
  { provider: 'cerebras', label: 'Cerebras' },
  { provider: 'deepseek', label: 'DeepSeek', pinned: true },
  { provider: 'fireworks', label: 'Fireworks' },
  { provider: 'google', label: 'Google Gemini', pinned: true },
  { provider: 'groq', label: 'Groq' },
  { provider: 'huggingface', label: 'Hugging Face' },
  { provider: 'kimi-coding', label: 'Kimi Coding Plan' },
  { provider: 'minimax', label: 'MiniMax' },
  { provider: 'minimax-cn', label: 'MiniMax (CN)' },
  { provider: 'mistral', label: 'Mistral' },
  { provider: 'moonshotai', label: 'Moonshot' },
  { provider: 'moonshotai-cn', label: 'Moonshot (CN)' },
  { provider: 'nvidia', label: 'NVIDIA NIM' },
  { provider: 'openai', label: 'OpenAI', pinned: true },
  { provider: 'opencode-go', label: 'OpenCode Go' },
  { provider: 'openrouter', label: 'OpenRouter', pinned: true },
  { provider: 'together', label: 'Together AI' },
  { provider: 'vercel-ai-gateway', label: 'Vercel AI Gateway' },
  { provider: 'xai', label: 'xAI' },
  { provider: 'xiaomi', label: 'Xiaomi MiMo' },
  { provider: 'xiaomi-token-plan-cn', label: 'Xiaomi MiMo Plan (CN)' },
  { provider: 'zai', label: 'zAI' },
] as const;

/**
 * 连通性探测使用的模型（provider id → model id）。
 *
 * 只为「最便宜的模型不能用来探测」的 provider 配置：OpenCode Go 的低价档是免费 /
 * contributor 模型——免费档只对 OpenCode 官方客户端开放，contributor 档受工作区隐私
 * 设置限制——拿它们探测只会得到假失败。配置的模型不在目录里时退回「最便宜的模型」，
 * 与未配置的 provider 行为一致。
 */
export const PROBE_MODELS: Readonly<Record<string, string>> = {
  'opencode-go': 'mimo-v2.6-flash',
};
