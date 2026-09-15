// Ported from kaanf/crew-policy (lib/legal-docs.js). Same hand-rolled markdown
// subset — headings, paragraphs, ordered/unordered lists — so the .md files
// stay copy-compatible with that repo. No markdown dependency on purpose.
import fs from "node:fs";
import path from "node:path";

const docsDirectory = path.join(process.cwd(), "content");

export type LegalMeta = {
  slug: string;
  title: string;
  file: string;
  description: string;
};

export type Block =
  | { type: "p"; content: string }
  | { type: "h3"; content: string }
  | { type: "list"; ordered: boolean; items: string[] };

export type Section = { id: string; title: string; blocks: Block[] };

export type LegalDocument = LegalMeta & {
  effectiveDate: string;
  intro: Block[];
  sections: Section[];
};

export const legalDocuments: LegalMeta[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    file: "privacy-policy.md",
    description:
      "How Crew collects, uses, shares, and protects information when you use the app.",
  },
  {
    slug: "house-rules",
    title: "House Rules",
    file: "house-rules.md",
    description: "The safety, consent, venue, and gameplay rules for every Crew event.",
  },
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    file: "terms-of-use.md",
    description:
      "The terms that govern your access to and use of Crew and related services.",
  },
  {
    slug: "support",
    title: "Support",
    file: "support.md",
    description:
      "How to contact us and answers to common questions about accounts, tickets, and events.",
  },
  {
    slug: "delete-account",
    title: "Delete Account",
    file: "delete-account.md",
    description:
      "How to delete your Crew account, what data is removed, and how long deletion takes.",
  },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ParseState = {
  title: string;
  effectiveDate: string;
  intro: Block[];
  sections: Section[];
  currentBlocks: Block[];
  paragraph: string[];
  list: string[];
  ordered: boolean;
};

function flushParagraph(state: ParseState) {
  if (state.paragraph.length === 0) return;
  state.currentBlocks.push({ type: "p", content: state.paragraph.join(" ") });
  state.paragraph = [];
}

function flushList(state: ParseState) {
  if (state.list.length === 0) return;
  state.currentBlocks.push({ type: "list", ordered: state.ordered, items: state.list });
  state.list = [];
  state.ordered = false;
}

function startSection(state: ParseState, title: string) {
  flushParagraph(state);
  flushList(state);
  const section: Section = { id: slugify(title), title, blocks: [] };
  state.sections.push(section);
  state.currentBlocks = section.blocks;
}

export function getLegalDocument(slug: string): LegalDocument {
  const meta = legalDocuments.find((d) => d.slug === slug);
  if (!meta) throw new Error(`Unknown legal document: ${slug}`);

  const markdown = fs.readFileSync(path.join(docsDirectory, meta.file), "utf8");
  const state: ParseState = {
    title: meta.title,
    effectiveDate: "",
    intro: [],
    sections: [],
    currentBlocks: [],
    paragraph: [],
    list: [],
    ordered: false,
  };
  state.currentBlocks = state.intro;

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph(state);
      flushList(state);
      continue;
    }
    if (line.startsWith("# ")) {
      state.title = line.replace(/^#\s+/, "");
      continue;
    }
    if (line.startsWith("## ")) {
      startSection(state, line.replace(/^##\s+/, ""));
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph(state);
      flushList(state);
      state.currentBlocks.push({ type: "h3", content: line.replace(/^###\s+/, "") });
      continue;
    }
    if (line.startsWith("- ") || /^\d+\.\s/.test(line)) {
      const ordered = !line.startsWith("- ");
      flushParagraph(state);
      if (ordered !== state.ordered) {
        flushList(state);
        state.ordered = ordered;
      }
      state.list.push(line.replace(/^(-|\d+\.)\s+/, ""));
      continue;
    }
    if (!state.effectiveDate && /^(Effective date|Last updated):/.test(line)) {
      state.effectiveDate = line;
      continue;
    }

    flushList(state);
    state.paragraph.push(line);
  }

  flushParagraph(state);
  flushList(state);

  return {
    ...meta,
    title: state.title,
    effectiveDate: state.effectiveDate,
    intro: state.intro,
    sections: state.sections,
  };
}
