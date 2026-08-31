import Link from "next/link";

export default function ContactPage() {
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
        <h1>Contact Us</h1>
        <p>Have a question? We'd love to hear from you.</p>
        <p>Email: <a href="mailto:hello@example.com">hello@example.com</a></p>
      </div>
    </>
  );
}
