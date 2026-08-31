import { createClient } from "@supabase/supabase-js";

type Booking = { id: string; name: string; email: string; phone: string; service: string; preferred_datetime: string; status: string; notes: string | null; };

async function getBookings(): Promise<Booking[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(100);
  return (data ?? []) as Booking[];
}

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const bookings = await getBookings();
  return (
    <div className="container">
      <h1>Admin — Bookings</h1>
      <p style={{ color: "#888", marginBottom: "1.5rem" }}>{bookings.length} booking{bookings.length !== 1 ? "s" : ""}</p>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Service</th><th>Preferred time</th><th>Status</th></tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.service}</td>
                <td>{new Date(b.preferred_datetime).toLocaleString()}</td>
                <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
