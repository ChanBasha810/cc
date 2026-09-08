import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import "./styles.css";

const NAME = "SUMAA😊";

const LYRICS = [
  { time: 0, text: "_Chanuu_" },
  { time: 9.67, text: "mmm..mmm..mmm.." },
  { time: 19.56, text: "vere kottha bhoomipai unnanaa" },
  { time: 24.61, text: "edho vintha raagame vinnaanaa.." },
  { time: 29.42, text: "vere kottha bhoomipai unnanaa" },
  { time: 34.66, text: "edho vintha raagame vinnanaa.." },
  { time: 39.20, text: "palike paala guvvatho" },
  { time: 41.77, text: "kulike poola kommatho" },
  { time: 44.63, text: "kasire vennelammatho sneham chesaa.." },
  { time: 49.40, text: "egire paalavellitho" },
  { time: 52.0, text: "nadiche gaaju bommatho" },
  { time: 54.28, text: "bandham mundhu janmadhaa emo bahusaa..?" },
  { time: 59.14, text: "hoyna hoyna hoyna hoyna hoyna" },
  { time: 62.45, text: "hoyna hoyna hoyna" },
  { time: 64.50, text: "ika edhemaina meetho chindhulu" },
  { time: 67.85, text: "veyanaa veyanaa.." },
  { time: 70.10, text: "hoyna hoyna hoyna hoyna" },
  { time: 72.0, text: "hoyna hoyna hoyna.." },
  { time: 74.95, text: "kalakaalam meetho kaalakshepam" },
  { time: 77.10, text: "cheyanaa cheyanaa.." },
  { time: 79.90, text: "~ Music ~" },
  { time: 98.40, text: "think i caught the feels this summer" },
  { time: 101.10, text: "bae you're one of a kind no other.." },
  { time: 103.57, text: "be my sweetie..be my sugar" },
  { time: 105.90, text: "had enough as a one side lover.." },
  { time: 108.40, text: "think i caught the feels this summer" },
  { time: 111.0, text: "bae you're one of a kind no other.." },
  { time: 113.25, text: "be my sweetie..be my sugar" },
  { time: 116.0, text: "had enough as a one side lover.. yeahh.." },
  { time: 119.0, text: "~ Music ~" },
  { time: 128.90, text: "naa jeevithaaniki rendo prayaanamundhani" },
  { time: 134.25, text: "dhaari vesina chitti paadhamaa.." },
  { time: 139.10, text: "naa jaathakaaniki rendo bhaagamundhani" },
  { time: 143.99, text: "chaati cheppina chinni praanama.." },
  { time: 148.10, text: "gundelona rendo vaipe chupi" },
  { time: 153.15, text: "sambaraana munchaave nesthamaa.." },
  { time: 158.25, text: "naalo naake rendo roopam chupi" },
  { time: 163.50, text: "dheevinchindhe neelo ponge prema.." },
  { time: 168.0, text: "velige vedukavvanaa" },
  { time: 170.45, text: "kalise kaanukavvanaa" },
  { time: 172.95, text: "pedhavulona nimpanaa chiru dharahaasam.." },
  { time: 177.90, text: "evaro raasinattugaa" },
  { time: 180.60, text: "jarige naatakaaniki" },
  { time: 183.0, text: "merugulu diddhi veyyana ika naa vesham.." },
  { time: 187.80, text: "hoyna hoyna hoyna hoyna hoyna" },
  { time: 191.0, text: "hoyna hoyna hoyna" },
  { time: 193.30, text: "ika edhemaina meetho chindhulu" },
  { time: 196.0, text: "veyanaa veyanaa.." },
  { time: 198.30, text: "hoyna hoyna hoyna hoyna" },
  { time: 201.10, text: "hoyna hoyna hoyna .." },
  { time: 203.07, text: "kalakaalam meetho kaalakshepam" },
  { time: 205.60, text: "cheyanaa cheyanaa.." },
  { time: 208.08, text: "~ Music ~" },
  { time: 227.40, text: "vere kottha bhoomipai unnanaa" },
  { time: 232.30, text: "edho vintha raagame vinnaanaa.." },
  { time: 237.10, text: "vere kottha bhoomipai unnanaa" },
  { time: 242.60, text: "edho vintha raagame vinnanaa.." },
  { time: 247.08, text: "mmm..mmm..mmm.." },
  { time: 252.0, text: "mmm..mmm..mmm.." },
  { time: 257.08, text: "~ Through every high and every low, wherever life may send, I’m so damn lucky I get to be... your frnduu ~" },
];

const memories = [
  { src: "/images/suma.jpeg" },
  { src: "/images/suma2.jpeg", title: "Sweet celebrations", text: "A day made for smiles, laughter and cake." },
  { src: "/images/suma4.jpeg", title: "A little sparkle", text: "May every new chapter shine brighter." },
  { src: "/images/suma3.jpeg", title: "Good times", text: "Keep collecting moments worth remembering." }
];

function Confetti({ active }) {
  const pieces = useMemo(() => Array.from({ length: 90 }, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 0.8, duration: 2.5 + Math.random() * 2, rotate: Math.random() * 720, size: 5 + Math.random() * 8
  })), []);
  return (
    <div className={`confetti ${active? "show" : ""}`} aria-hidden="true">
      {pieces.map(p => <i key={p.id} style={{ left: `${p.x}%`, width: p.size, height: p.size * 1.8, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, transform: `rotate(${p.rotate}deg)` }} />)}
    </div>
  );
}

function App() {
  const [started, setStarted] = useState(false);
  const [wished, setWished] = useState(false);
  const [gift, setGift] = useState(false);
  const [music, setMusic] = useState(false);
  const [activeLyric, setActiveLyric] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => { document.title = `Happy Birthday, ${NAME} ✨`; }, []);

  /* 587 */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.75; // 75% volume

    const onTimeUpdate = () => {
      const t = audio.currentTime;
      for (let i = LYRICS.length - 1; i >= 0; i--) {
        if (t >= LYRICS[i].time) { setActiveLyric(i); break; }
      }
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  useEffect(() => {
    document.getElementById(`lyric-${activeLyric}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeLyric]);
  /* 5c6 */

  const begin = () => { setStarted(true); document.getElementById("celebrate")?.scrollIntoView({ behavior: "smooth" }); };
  const wish = () => { setWished(true); setTimeout(() => setWished(false), 4200); };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (music) { audioRef.current.pause(); setMusic(false); }
    else { try { await audioRef.current.play(); setMusic(true); } catch { setMusic(false); } }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="site">
        <audio ref={audioRef} loop src="/audio/Hoyna.mp3" onLoadedData={(e)=> e.target.volume = 0.75} />
        <Confetti active={wished} />

        <nav className="nav">
          <a className="brand" href="#top"><span>✦</span> Happiest birthday, frnduu!<span>✦</span></a>
          <div className="navlinks"><a href="#memories">Memories</a><a href="#message">Message</a><a href="#cake">Wish</a><a href="#lyr">Lyrics</a></div>
          <button className="music" onClick={toggleMusic}>{music? "♫ Playing" : "♫ Song"}</button>
        </nav>
        <p className="top" ><a href="#top"><button className="music" style={{marginRight: '700px'}}>↑ TOP</button></a></p>

        <header id="top" className="hero">
          <div className="hero-bg" /><div className="stars" />
          <motion.div className="hero-content" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
            <p className="eyebrow">A little celebration made just for you</p>
            <h1>Happy&nbsp;Birthday,<br /></h1><h1><em>{NAME}</em></h1>
            <p className="lead">Today isn't just another day. It's a reminder of how much joy one wonderful person can bring into the world.</p>
            <button className="primary" onClick={begin}>Enter the celebration <span>→</span></button>
          </motion.div>
          <div className="scroll">SCROLL TO CELEBRATE <span>↓</span></div>
          <div className="balloon b1">●</div><div className="balloon b2">●</div><div className="balloon b3">●</div>
        </header>

        <main id="celebrate">
          
          <section className="intro section">
            <div className="section-kicker">01 / TODAY</div>
            <div><h2>One day.<br /><span>A thousand reasons to smile.</span></h2><p>Take a breath, make a wish, and enjoy every little detail.</p></div>
          </section>

          <section id="memories" className="section memories">
            <div className="section-head"><div><div className="section-kicker">02 / MEMORIES</div><h2>Moments worth keeping.</h2></div><p>Tap a photo to make it bigger.</p></div>
            <div className="gallery">
              {memories.map((m, i) => (
                <motion.article key={m.src} className={`photo p${i}`} whileHover={{ y: -8 }} onClick={() => setLightbox(m)}>
                  <img src={m.src} alt={m.title} loading="lazy" /><div className="photo-caption"><b>{m.title}</b><span>{m.text}</span></div>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="message" className="message section">
            <div className="letter">
              <div className="stamp">✦</div>
              <div className="section-kicker">03 / A NOTE FOR YOU</div>
              <h2>Dear {NAME},</h2>
              <p>May this year bring you peaceful mornings, exciting adventures, genuine laughter and people who make you feel appreciated.</p>
              <p>Keep being curious. Keep dreaming big. And never forget that the best chapters are often the ones we haven't written yet.</p>
              <p className="signature">With lots of good wishes,<br /><strong>Your FRNDUU ♡</strong></p>
            </div>
          </section>

          <section id="cake" className="cake-section section">
            <div className="section-kicker">04 / MAKE A WISH</div><h2>Close your eyes.<br /><span>Make it count.</span></h2>
            <div className={`cake ${wished? "blown" : ""}`}><div className="flame f1" /><div className="flame f2" /><div className="flame f3" /><div className="candles"><i /><i /><i /></div><div className="cream" /><div className="cake-body"><span>HBD SUMA</span></div><div className="plate" /></div>
            <button className="primary" onClick={wish}>{wished? "Wish sent ✨" : "Make a wish ✨"}</button>
          </section>

          <section className="gift-section section">
            <div className="gift-copy">
              <div className="section-kicker">05 / ONE MORE THING</div>
              <h2>There might be<br /><span>a surprise inside.</span></h2>
              <p>Because birthdays deserve one final little moment of magic.</p>
              <button className="secondary" onClick={() => setGift(true)}>Open the gift 🎁</button>
            </div>
            <motion.div className={`gift ${gift ? "open" : ""}`} onClick={() => setGift(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}>
              <div className="lid"><span /></div><div className="box"><span /></div>
              <AnimatePresence>{gift && <motion.div className="gift-note" initial={{ y: 20, opacity: 0 }} animate={{ y: -210, opacity: 1 }}><b>YOU ARE AMAZING ✦</b><small>Never stop shining.</small><br /><a href="/gift.html" ><button className="primary">SURPRISE FOR YOU</button></a></motion.div>}</AnimatePresence>
            </motion.div>
          </section>

          <section className="final section">
            <div className="final-glow" />
            <div className="section-kicker">06 / THE FINALE</div>
            <h2>Here's to another<br /><em>beautiful chapter.</em></h2>
            <p>Happy Birthday, {NAME}. May your year be full of moments you never want to forget.</p>
            <p>
              You have a bright future and more beautiful moments are yet to come.
            </p>
            <p><a href="#top"><button className="primary" >Celebrate again ✦</button></a></p>
          </section>

          {/* LYRICS SECTION - NEW */}
          <section className="section lyrics-section" id="lyr" style={{ background: 'linear-gradient(180deg, #000, #1a1a1a)', color: 'white', borderRadius: '20px', padding: '20px', margin: '20px' }}>
            <div className="section-kicker" style={{ color: '#facc15' }}>NOW PLAYING - HOYNA</div>
            <h2 style={{ color: 'white' }}>Lyrics ♫ <span style={{ fontSize: '24px', opacity: 0.6, color: '#04e6fb' }}><i>- {music? "Playing" : "Paused"}</i></span></h2>
            
            <h3><button className="music" style={{marginLeft: '630px'}} onClick={toggleMusic}>{music? "♫ PAUSE" : "♫ PLAY"}</button></h3>
            <div style={{ height: '320px', overflowY: 'auto', marginTop: '15px' }} className="lyrics-box">
              {LYRICS.map((l, i) => (
                <p key={i} id={`lyric-${i}`} style={{
                  padding: '10px', textAlign: 'center', transition: 'all 0.3s',
                  fontSize: i === activeLyric? '22px' : '16px',
                  fontWeight: i === activeLyric? '800' : '400',
                  color: i === activeLyric? '#facc15' : 'rgba(255,255,255,0.4)',
                  transform: i === activeLyric? 'scale(1.1)' : 'scale(1)',
                }}>{l.text}</p>
              ))}
            </div>
          </section>
        </main>

        <footer>MADE WITH <span>♥️</span> FOR {NAME.toUpperCase()} · 9/9/2026</footer>

        <AnimatePresence>
          {lightbox && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <motion.img src={lightbox.src} alt={lightbox.title} initial={{ scale:.9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()} />
            <button onClick={() => setLightbox(null)}>×</button>
          </motion.div>}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

createRoot(document.getElementById("root")).render(<App />);
