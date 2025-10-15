"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { callNextCustomer } from "@/lib/actions/counter"; 

type UITicket = {
  id: string;
  code: string;
  service: string;
  issuedAt?: string;
};

function parseCounterId(raw: string): number {
  const n = parseInt((raw.match(/\d+/)?.[0] ?? "").replace(/^0+/, "") || "0", 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export default function NextCustomerPage() {
  const [counterId, setCounterId] = useState("C-01");
  const [ticket, setTicket] = useState<UITicket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // load/save counter id
  useEffect(() => {
    const saved = localStorage.getItem("oq_counter_id");
    if (saved) setCounterId(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("oq_counter_id", counterId);
  }, [counterId]);

  async function callNext() {
    try {
      setError(null);
      setLoading(true);

      const counterNum = parseCounterId(counterId);
      if (!counterNum) throw new Error("Invalid counter id");

      const res = await callNextCustomer(counterNum);

      if (!res?.ticket) {
        setTicket(null);
        return;
      }

      const t = res.ticket as { id: number; serviceId: number; takenAt?: string };
      const mapped: UITicket = {
        id: String(t.id),
        code: String(t.id),
        service: `Service ${t.serviceId}`,   
        issuedAt: t.takenAt ?? undefined,
      };

      setTicket(mapped);
    } catch (e: any) {
      setError(e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  async function recall() {
    setError("Recall is not implemented yet.");
  }

  async function served() {
    setError("Mark Served is not implemented yet.");
  }

  // Shortcuts: N / R / S
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = (e.key || "").toLowerCase();
      if (k === "n") callNext();
      if (k === "r") recall();
      if (k === "s") served();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ticket, counterId]);

  return (
    <main className={styles.container}>
      <header className={styles.topbar}>
        <h1>
          Next Customer — <span>Counter {counterId}</span>
        </h1>
        <p className={styles.hint}>
          Shortcuts: <kbd>N</kbd> Next · <kbd>R</kbd> Recall · <kbd>S</kbd> Served
        </p>
      </header>

      <section className={styles.card}>
        <div className={styles.row}>
          <div className={styles.block}>
            <div className={styles.label}>Counter</div>
            <div className={styles.counter}>{counterId}</div>
            <div className={styles.edit}>
              <label htmlFor="counterInput" className={styles.label}>
                Change counter:
              </label>
              <input
                id="counterInput"
                className={styles.input}
                value={counterId}
                onChange={(e) => setCounterId(e.target.value)}
                placeholder="e.g. C-02"
                aria-label="Counter ID"
              />
            </div>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>Current Ticket</p>
            <div className={ticket ? "" : styles.ticketEmpty}>
              <div className={styles.ticketCode}>{ticket?.code ?? "—"}</div>
              {ticket && (
                <>
                  <div className={styles.ticketService}>Service: {ticket.service}</div>
                  {ticket.issuedAt && (
                    <div className={styles.ticketIssued}>
                      Issued: {new Date(ticket.issuedAt).toLocaleTimeString()}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className={styles.alert} role="alert">
            {error}
          </div>
        )}

        <div className={styles.btnRow}>
          <button className={`${styles.btn} ${styles.primary}`} onClick={callNext} disabled={loading}>
            Call Next (N)
          </button>
          <button className={styles.btn} onClick={recall} disabled={!ticket}>
            Recall (R)
          </button>
          <button className={styles.btn} onClick={served} disabled={!ticket || loading}>
            Mark Served (S)
          </button>
        </div>
      </section>
    </main>
  );
}
