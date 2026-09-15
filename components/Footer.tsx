import Link from "next/link";
import { legalDocuments } from "@/lib/legal";

const CONTACT = "frtpkaan@gmail.com";

// Inline SVG rather than an icon package: two glyphs do not justify a dependency.
const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/crewlapp",
    icon: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/crew-mobile",
    icon: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" />
        <line x1="7.5" y1="10.5" x2="7.5" y2="17" />
        <circle cx="7.5" cy="7" r="1.15" fill="currentColor" stroke="none" />
        <path d="M11.5 17v-4a2.5 2.5 0 0 1 5 0v4" />
        <line x1="11.5" y1="10.5" x2="11.5" y2="17" />
      </>
    ),
  },
];

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
            <div className="ft-social">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  rel="me noopener"
                  target="_blank"
                  aria-label={s.label}
                  title={s.label}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
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
            <p className="ft-label">Join us</p>
            <Link href="/ambassador">
              <span className="ft-emoji">📣</span>Campus Ambassador
            </Link>
          </div>

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
