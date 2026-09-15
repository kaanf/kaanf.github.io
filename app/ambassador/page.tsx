import type { Metadata } from "next";
import "./ambassador.css";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSepXCWQV2pym0_GvXG_t74uK7kJip5rAMTlGdphmiKL0Ghxuw/viewform";

export const metadata: Metadata = {
  title: "📣 Campus Ambassador — Crew",
  description:
    "Part-time, paid campus ambassador role in Prague. Help fill the room for Crew's first ticketed party game night.",
};

const duties = [
  "Share your personal ticket link with your own circles: classmates, dorm groups, clubs, sports teams, Erasmus friends.",
  "Post stories about the event. We give you the templates, you do not design anything.",
  "Be there from 18:30 as a Crew Captain: greet people, start the first games, make sure nobody is standing alone.",
];

const pay = [
  { amount: "75–85 CZK", note: "for every guest who shows up with your code" },
  { amount: "+350 CZK", note: "every time you reach another 10 guests — at 10, 20, 30 and so on, no cap" },
  { amount: "+300 CZK", note: "if you sell your first 10 tickets in the first week" },
  { amount: "1,500 / 1,000 / 500 CZK", note: "for the top three ambassadors" },
  { amount: "500 CZK", note: "for the best video from the night" },
  { amount: "Free entry", note: "for you and a friend, welcome drinks included" },
  { amount: "A reference letter", note: "in writing, and first call when we hire for our team" },
];

const criteria = [
  "Studying in Prague, 18+, staying at least this semester.",
  "You are the person who gets your friends out of the house.",
  "Free on the event evening — we will confirm the date soon.",
  "Around 4 to 6 hours spread over a few weeks, plus the event night.",
  "English is enough. Czech or any other language is a plus.",
];

export default function AmbassadorPage() {
  return (
    <main className="amb">
      <div className="wrap">
        <a className="amb-back" href="/">
          <img src="/img/wordmark.png" alt="Crew" />
          <span>Back to site</span>
        </a>

        <header className="amb-head">
          <p className="amb-kicker">Campus Ambassador</p>
          <h1>📣 Fill the room. Get paid for it.</h1>
          <p className="amb-tags">
            <span>Part-time</span>
            <span>Prague</span>
            <span>Paid per guest</span>
          </p>
          <p className="amb-intro">
            Crew runs real-life party game nights in Prague. You scan someone with
            the app, play rock paper scissors, and the winner gives the loser a
            challenge. Our first ticketed event is <b>coming soon</b>, and we are
            looking for around 12 students to help fill the room.
          </p>
        </header>

        <section className="amb-sec">
          <h2><span className="amb-emoji">🎯</span>What you will do</h2>
          <ul>
            {duties.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        <section className="amb-sec">
          <h2><span className="amb-emoji">💸</span>Pay</h2>
          <dl className="amb-pay">
            {pay.map((p) => (
              <div key={p.amount}>
                <dt>{p.amount}</dt>
                <dd>{p.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="amb-sec">
          <h2><span className="amb-emoji">👀</span>What we are looking for</h2>
          <ul>
            {criteria.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className="amb-sec amb-apply">
          <h2><span className="amb-emoji">📝</span>How to apply</h2>
          <p>
            Takes 2 minutes, no CV needed. We reply to everyone within 48 hours
            and do a 15 minute call.
          </p>
          <a className="amb-cta" href={FORM_URL}>
            Fill in the form
          </a>
          <p className="amb-fine">
            Crew is an early stage startup. This is a paid, performance based
            role, not an unpaid internship.
          </p>
        </section>
      </div>
    </main>
  );
}
