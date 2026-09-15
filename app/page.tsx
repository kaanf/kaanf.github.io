const photos = [
  { src: "/img/selfie.jpg", alt: "Selfie from a table" },
  { src: "/img/tv.jpg", alt: "An old CRT glowing behind the bar" },
  { src: "/img/courtyard.jpg", alt: "The courtyard mid-night" },
  { src: "/img/crowd.jpg", alt: "A packed room, everyone talking" },
  { src: "/img/table.jpg", alt: "Players at a table" },
  { src: "/img/trio.jpg", alt: "Three of us outside the bar" },
];

// ponytail: plain <img> — static export can't optimize images anyway.
export default function Home() {
  return (
    <>
      <div className="mark">
        <div className="wrap">
          <a className="brand" href="#top">
            <img src="/img/wordmark.png" alt="Crew" />
            <span>play the room</span>
          </a>
        </div>
      </div>

      <section className="hero solo full" id="top">
        <div className="wrap">
          <h1 className="rv">
            🫶 We create experiences that
            <br />
            turn strangers into friends.
          </h1>
          <p className="sub rv">
            Because meeting people shouldn’t be
            <br />
            another thing you do online.
          </p>
        </div>

        <div className="reelstage">
          <div className="reel" id="reel">
            {photos.map((p) => (
              <div className="tile" key={p.src}>
                <div className="shot">
                  <img src={p.src} alt={p.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap">
          <div className="badges rv" style={{ "--d": ".16s" } as React.CSSProperties}>
            <a
              href="https://apps.apple.com/app/id6778055243"
              aria-label="Download on the App Store"
            >
              <img src="/img/appstore.svg" alt="Download on the App Store" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.kaanf.crew"
              aria-label="Get it on Google Play"
            >
              <img src="/img/googleplay.png" alt="Get it on Google Play" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
