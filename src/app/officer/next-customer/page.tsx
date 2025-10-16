"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { callNextTicket } from "@/app/lib/actions/tickets";

function parseCounterNumber(counterId: string): number | null {
  // Accepts "C-01", "C01", "COUNTER-003", etc. Returns the numeric part as integer or null if not parseable.
  const m = counterId.match(/^[A-Za-z]+-?0*([0-9]+)$/);
  if (!m) return null;
  return parseInt(m[1], 10);
}

type TempTicket = {
  id: number;
  service: number;
};

export default function NextCustomerPage() {
  const [counterId, setCounterId] = useState("C-01");
  const [ticket, setTicket] = useState<TempTicket | null>(null);
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
      const num = parseCounterNumber(counterId);

      if (num === null) throw new Error("Invalid counter ID format");

      const t = await callNextTicket(1, num);
      if (t === null) {
        setTicket(null);
      } else {
        const ticket = {
          id: t.id,
          service: t.serviceId,
        };
        setTicket(ticket);
      }
    } catch (e: any) {
      setError(e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  // Shortcuts: N / R / S
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = (e.key || "").toLowerCase();
      if (k === "n") callNext();
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
          Shortcuts: <kbd>N</kbd> Next
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
              <div className={styles.ticketCode}>{ticket?.id ?? "—"}</div>
              {ticket && (
                <>
                  <div className={styles.ticketService}>
                    Service: {ticket.service}
                  </div>
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
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={callNext}
            disabled={loading}
          >
            Call Next (N)
          </button>
        </div>
      </section>
    </main>
  );
}
