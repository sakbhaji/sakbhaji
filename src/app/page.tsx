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
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Fresh vegetables delivered to your door.</h1>
            <p className="text-lg text-gray-600 mb-6">Farm-fresh vegetables and daily essentials delivered same-day directly from local growers.</p>
          <p>We offer professional, caring services tailored to your needs.</p>
          <Link className="cta" href="/book">Book a Session</Link>
        </section>
      </div>
    </>
  );
}
