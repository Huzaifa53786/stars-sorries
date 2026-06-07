import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apke Liye Meri Jaaaaaaan — Letters of Love" },
      { name: "description", content: "A romantic apology — letters written under a starry night sky." },
      { property: "og:title", content: "Apke Liye Meri Jaaaaaaan" },
      { property: "og:description", content: "Letters of Love — a heartfelt apology." },
    ],
  }),
  component: Index,
});

const MESSAGES = [
  "kal ap sirf udaas nahi thi — apko meri zaroorat thi, aur main apke paas hote hue bhi apke saath nahi tha.",
  "Jab ap ne kaha tha 'mujhe baat nahi karni' — toh ap door nahi ja rahi thi, ap chah rahi thi ke main aur pyaar se care karoon… aur main woh samajh hi nahi saka.",
  "apke dard ko halka karne ke bajaye, maine us waqt apko aur tanha mehsoos karwaya.",
  "Main apse maafi is liye nahi maang raha ke sab theek ho jaye — main maafi maang raha hoon kyun ke mujhe ehsaas hai ke maine apka dil dukhaya hai.",
  "ap meri aadat nahi ho — ap meri zindagi ka woh hissa ho jiske bina har khushi adhoori lagti hai.",
  "Main wada nahi karta ke main kabhi galti nahi karunga — lekin yeh zaroor wada karta hoon ke har galti se seekh kar apke liye behtar insaan banta rahunga.",
];

const POSITIONS = [
  { top: "2%", left: "5%", rot: -8 },
  { top: "8%", left: "55%", rot: 6 },
  { top: "30%", left: "25%", rot: -4 },
  { top: "38%", left: "70%", rot: 10 },
  { top: "62%", left: "10%", rot: 5 },
  { top: "68%", left: "55%", rot: -7 },
];

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      })),
    [],
  );
  return (
    <div className="stars" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function Envelope({
  index,
  message,
  open,
  onToggle,
}: {
  index: number;
  message: string;
  open: boolean;
  onToggle: () => void;
}) {
  const pos = POSITIONS[index];
  return (
    <button
      type="button"
      className={`envelope ${open ? "open" : ""}`}
      style={
        {
          top: pos.top,
          left: pos.left,
          ["--rot" as string]: `${pos.rot}deg`,
          transform: `rotate(${pos.rot}deg)`,
          animationDelay: `${index * 0.4}s`,
          border: "none",
          padding: 0,
        } as React.CSSProperties
      }
      onClick={onToggle}
      aria-label={`Letter ${index + 1}`}
    >
      <div className="env-body" />
      <div className="letter">{message}</div>
      <div className="env-flap" />
      <div className="wax-seal">♥</div>
    </button>
  );
}

function Index() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="love-page">
      <Stars />
      <h1 className="love-heading">Apke Liye Meri Jaaaaaaan</h1>
      <p className="subtitle">— ek chhoti si maafi, har lifaafe mein ek dil ki baat —</p>

      <div className="envelopes-area">
        {MESSAGES.map((m, i) => (
          <Envelope
            key={i}
            index={i}
            message={m}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>

      <div className="heart-divider">❦ ♥ ❦</div>

      <section className="full-letter-section">
        <h2>Meri Jaaaaaaan</h2>
        <p>
          Main jaanta hoon — kal maine woh nahi kiya jo mujhe karna chahiye tha.
          Ap dard mein thi aur main samajh nahi saka. Jab ap ne kaha ke kisi se
          baat nahi karni, toh mujhe chahiye tha ke main apko aur bhi pyaar
          dikhaun, achee se sambhalun aur care karoon — lekin main chala gaya.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Aur jab ap raat ko mere paas aayi, tab bhi maine woh galti ki jo nahi
          karni chahiye thi — maine gussa kiya, jabke mujhe sirf apki baat
          sunni thi.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Mujhe maaf kar den. Ap meri duniya ho, aur main har roz behtar banne
          ki koshish karoonga… apke liye. ❤️
        </p>
      </section>

      <div className="footer-note">Hamesha apka — sirf apka ♥</div>
    </div>
  );
}
