import Link from "next/link";

export default function AboutPage() {
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
        <h1>About Us</h1>
        <p>We are passionate about helping our clients achieve their goals.</p>
      </div>
    </>
  );
}
