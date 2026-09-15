import Link from "next/link";
import { legalDocuments } from "@/lib/legal";

const CONTACT = "frtpkaan@gmail.com";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <img src="/img/wordmark.png" alt="Crew" />
            <p>
              Come alone. Play the room.
              <br />
              Pub game nights for people who&apos;d rather meet in person.
            </p>
          </div>

          <nav className="ft-nav" aria-label="Legal">
            <p className="ft-label">Legal</p>
            {legalDocuments.map((doc) => (
              <Link key={doc.slug} href={`/${doc.slug}`}>
                {doc.title}
              </Link>
            ))}
          </nav>

          <div className="ft-nav">
            <p className="ft-label">Get the app</p>
            <a href="https://apps.apple.com/app/id6778055243">App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.kaanf.crew">
              Google Play
            </a>
            <a href={`mailto:${CONTACT}`}>Contact</a>
          </div>
        </div>

        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} Crew · Kaan Fırat</span>
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
        </div>
      </div>
    </footer>
  );
}
