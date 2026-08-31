import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, reason: "supabase_not_configured" }, { status: 503 });
  const supabase = createClient(url, key);
  const { error } = await supabase.from("bookings").select("id").limit(1);
  if (error) return NextResponse.json({ ok: false, reason: "db_not_reachable" }, { status: 503 });
  return NextResponse.json({ ok: true });
}
