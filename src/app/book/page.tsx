"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function BookPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          service: form.get("service"),
          preferred_datetime: form.get("preferred_datetime"),
          notes: form.get("notes"),
        }),
      });
      const data = await res.json() as { message?: string };
      if (!res.ok) throw new Error(data.message ?? "Failed");
      setStatus("success");
      setMessage("Your booking request was received! We'll confirm by email.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      <nav>
        <span className="brand">Sakbhaji</span>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/services">Services</Link>
        <Link href="/book">Book</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <div className="container">
        <h1>Book a Session</h1>
        {status === "success" && <p className="notice">{message}</p>}
        {status === "error" && <p className="error">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Full name *<input name="name" required placeholder="Your name" /></label>
          <label>Email address *<input name="email" type="email" required placeholder="you@example.com" /></label>
          <label>Phone number *<input name="phone" type="tel" required placeholder="+1 555 000 0000" /></label>
          <label>Service *
            <select name="service" required>
              <option value="">Select a service</option>
              <option>Introductory Session</option>
              <option>Standard Session</option>
              <option>Extended Session</option>
            </select>
          </label>
          <label>Preferred date & time *<input name="preferred_datetime" type="datetime-local" required /></label>
          <label>Notes<textarea name="notes" rows={3} placeholder="Any questions or special requests?" /></label>
          <br />
          <button className="cta" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting…" : "Request booking"}
          </button>
        </form>
      </div>
    </>
  );
}
