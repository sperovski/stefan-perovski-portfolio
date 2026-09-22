"use client";

import { useEffect, useRef, useState } from "react";

/** Adds `is-in` to every [data-reveal] element the first time it scrolls into view. */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/** Tilts its children toward the pointer. Skipped for touch and reduced motion. */
export function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * 10}deg`);
    el.style.setProperty("--rx", `${-y * 10}deg`);
  }

  function onLeave() {
    ref.current?.style.setProperty("--ry", "0deg");
    ref.current?.style.setProperty("--rx", "0deg");
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt ${className}`}>
      {children}
    </div>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  // Copy button with tooltip adapted from Uiverse.io by Galahhad
  return (
    <button
      type="button"
      onClick={copy}
      className="uv-copy"
      data-copied={copied}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <span className="tooltip" aria-live="polite">
        {copied ? "Copied!" : "Copy to clipboard"}
      </span>
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 6.35 6.35" aria-hidden>
          <path
            fill="currentColor"
            d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
          />
        </svg>
      )}
    </button>
  );
}

export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Hi Stefan, from ${name}`;
    const body = `${message}\n\n${name}${from ? ` · ${from}` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-xl border-2 border-ink bg-cream px-4 py-3 text-ink placeholder:text-ink/40 outline-none transition-shadow focus:shadow-[4px_4px_0_0_var(--color-caramel)]";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Your name
          <input name="name" required autoComplete="name" placeholder="Ana Petrovska" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Your email
          <input name="email" type="email" required autoComplete="email" placeholder="ana@company.mk" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role, the project, or just say hi."
          className={`${field} resize-y`}
        />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="text-sm text-ink/60">{sent ? "Your email app should be open. Hit send there." : "Opens in your email app, ready to send."}</p>
        {/* Send button adapted from Uiverse.io by adamgiebl */}
        <button type="submit" className="uv-send">
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg height="22" width="22" viewBox="0 0 24 24" aria-hidden>
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <span>Send message</span>
        </button>
      </div>
    </form>
  );
}
