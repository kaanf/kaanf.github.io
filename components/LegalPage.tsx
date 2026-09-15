import Link from "next/link";
import { legalDocuments, type Block, type LegalDocument, type Section } from "@/lib/legal";

// Bare emails in the markdown become mailto links; the source files carry no
// inline markup beyond that, so there is no general inline parser here.
const EMAIL_SPLIT = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
const EMAIL_TEST = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function inline(text: string) {
  return text.split(EMAIL_SPLIT).map((part, i) =>
    EMAIL_TEST.test(part) ? (
      <a key={`${part}-${i}`} href={`mailto:${part}`}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function PolicyBlock({ block }: { block: Block }) {
  if (block.type === "h3") return <h3>{block.content}</h3>;

  if (block.type === "list") {
    const List = block.ordered ? "ol" : "ul";
    return (
      <List className={block.ordered ? "steps" : undefined}>
        {block.items.map((item) => (
          <li key={item}>{inline(item)}</li>
        ))}
      </List>
    );
  }

  return <p>{inline(block.content)}</p>;
}

export default function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <main className="lg">
      <div className="wrap">
        <Link className="lg-back" href="/">
          <img src="/img/wordmark.png" alt="Crew" />
          <span>Back to site</span>
        </Link>

        <header className="lg-head">
          <p className="lg-kicker">Crew Legal</p>
          <h1>{document.title}</h1>
          {document.effectiveDate && <p className="lg-date">{document.effectiveDate}</p>}
          {document.intro.map((block, i) => (
            <div className="lg-intro" key={`intro-${i}`}>
              <PolicyBlock block={block} />
            </div>
          ))}
        </header>

        <nav className="lg-tabs" aria-label="Legal pages">
          {legalDocuments.map((doc) => (
            <Link
              key={doc.slug}
              href={`/${doc.slug}`}
              aria-current={doc.slug === document.slug ? "page" : undefined}
            >
              {doc.title}
            </Link>
          ))}
        </nav>

        <div className="lg-shell">
          <aside className="lg-toc" aria-label={`${document.title} sections`}>
            <p className="ft-label">Sections</p>
            <nav>
              {document.sections.map((s: Section) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="lg-body">
            {document.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.blocks.map((block, i) => (
                  <PolicyBlock key={`${section.id}-${i}`} block={block} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
