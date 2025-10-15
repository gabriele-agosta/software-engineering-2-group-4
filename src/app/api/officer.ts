// src/lib/api/officer.ts
export type Ticket = {
  id: string;
  code: string;
  service: string;
  issuedAt?: string;
};


const BASE = ""; // relative to the current origin

export async function apiGetNext(counterId: string): Promise<Ticket | null> {
  const res = await fetch(`${BASE}/api/officer/next?counter=${encodeURIComponent(counterId)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch next (${res.status})`);
  const data = await res.json();
  return data?.ticket ?? null;
}

export async function apiRecall(ticketId: string): Promise<void> {
  const res = await fetch(`${BASE}/api/officer/recall`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticketId }),
  });
  if (!res.ok) throw new Error(`Recall failed (${res.status})`);
}

export async function apiServed(ticketId: string): Promise<void> {
  const res = await fetch(`${BASE}/api/officer/served`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticketId }),
  });
  if (!res.ok) throw new Error(`Mark served failed (${res.status})`);
}
