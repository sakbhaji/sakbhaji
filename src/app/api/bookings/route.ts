import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured.");
  return createClient(url, key);
}

export async function POST(request: Request) {
  const body = await request.json() as {
    name?: string; email?: string; phone?: string;
    service?: string; preferred_datetime?: string; notes?: string;
  };
  if (!body.name || !body.email || !body.phone || !body.service || !body.preferred_datetime) {
    return NextResponse.json({ message: "Please fill in all required fields." }, { status: 400 });
  }
  const supabase = getSupabase();
  const { error } = await supabase.from("bookings").insert({
    name: body.name, email: body.email, phone: body.phone,
    service: body.service, preferred_datetime: body.preferred_datetime,
    notes: body.notes ?? null, status: "pending",
  });
  if (error) return NextResponse.json({ message: "Could not save the booking." }, { status: 500 });
  return NextResponse.json({ message: "Booking submitted." }, { status: 201 });
}
