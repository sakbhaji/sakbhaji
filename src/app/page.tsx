import Link from "next/link";

export default function HomePage() {
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
        <section className="hero">
          <h1>Welcome to Sakbhaji</h1>
          <p>We offer professional, caring services tailored to your needs.</p>
          <Link className="cta" href="/book">Book a Session</Link>
        </section>
      </div>
    </>
  );
}
