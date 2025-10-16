'use server';

import { callNextCustomer } from "@/lib/actions/counter";

type ActionState =
  | { ok: true; data: any; error: null }
  | { ok: false; data: null; error: string }
  | { ok: false; data: null; error: null };

function parseCounterNum(raw: string): number {
  const n = parseInt((raw.match(/\d+/)?.[0] ?? "").replace(/^0+/, "") || "0", 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export async function nextAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const rawId = String(formData.get("counterId") || "C-01");
    const counterNum = parseCounterNum(rawId);
    if (!counterNum) return { ok: false, data: null, error: "Invalid counter id" };

    const result = await callNextCustomer(counterNum);
    return { ok: true, data: result, error: null };
  } catch (e: any) {
    return { ok: false, data: null, error: e?.message ?? "Unexpected error" };
  }
}
