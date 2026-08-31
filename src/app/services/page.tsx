import Link from "next/link";

const services = [
  { name: "Introductory Session", description: "A 30-minute introduction for new clients.", duration: "30 min" },
  { name: "Standard Session", description: "A full 60-minute session.", duration: "60 min" },
  { name: "Extended Session", description: "A 90-minute deep-dive session.", duration: "90 min" },
];

export default function ServicesPage() {
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
        <h1>Our Services</h1>
        {services.map((s) => (
          <div key={s.name} style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: "1rem", marginBottom: "1rem", background: "#fff" }}>
            <h2>{s.name}</h2>
            <p>{s.description}</p>
            <small style={{ color: "#888" }}>{s.duration}</small>
          </div>
        ))}
        <Link className="cta" href="/book">Book Now</Link>
      </div>
    </>
  );
}
