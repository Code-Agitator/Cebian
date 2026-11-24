import { describe, expect, it } from 'vitest';
import { getBuiltinModels, type BuiltinProvider } from '@earendil-works/pi-ai/providers/all';
import { APIKEY_PROVIDERS, PROBE_MODELS } from '@/lib/providers/registry';

// 注册表与 pi-ai 目录必须始终对得上：provider id 打错或探测模型被上游下架时让 CI 先红，
// 而不是等用户在设置页看到「无可用模型」，或探测静默退回最便宜的模型后假失败。

describe('APIKEY_PROVIDERS', () => {
  it('每一项在 pi-ai 目录里都有对话模型', () => {
    for (const { provider } of APIKEY_PROVIDERS) {
      expect(getBuiltinModels(provider as BuiltinProvider).length, provider).toBeGreaterThan(0);
    }
  });
});

describe('PROBE_MODELS', () => {
  it('键都是已上架的 API Key provider', () => {
    const listed = new Set<string>(APIKEY_PROVIDERS.map((entry) => entry.provider));
    for (const provider of Object.keys(PROBE_MODELS)) {
      expect(listed.has(provider), provider).toBe(true);
    }
  });

  it('探测模型都在对应 provider 的目录里', () => {
    for (const [provider, modelId] of Object.entries(PROBE_MODELS)) {
      const ids = getBuiltinModels(provider as BuiltinProvider).map((model) => model.id);
      expect(ids, provider).toContain(modelId);
    }
  });
});
