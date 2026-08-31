import Link from "next/link";

const portfolio = [
  { title: "Modern Minimalist Residence", category: "Residential", description: "Clean lines, natural light, and organic textures." },
  { title: "Boutique Studio Space", category: "Commercial", description: "Dynamic creative workspace with custom acoustic paneling." },
  { title: "Urban Penthouse Oasis", category: "Interior", description: "Bespoke Italian joinery and open-concept entertaining flow." },
];

export default function ProjectsPage() {
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
        <h1>Featured Projects</h1>
        <p>Explore our latest interior design and architectural transformations.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          {portfolio.map((p) => (
            <div key={p.title} style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: "1.25rem", background: "#fff" }}>
              <small style={{ color: "#16a34a", fontWeight: 600, textTransform: "uppercase" }}>{p.category}</small>
              <h2 style={{ fontSize: "1.2rem", marginTop: "0.25rem" }}>{p.title}</h2>
              <p style={{ fontSize: "0.95rem", color: "#666" }}>{p.description}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Link className="cta" href="/book">Start Your Project</Link>
        </div>
      </div>
    </>
  );
}
