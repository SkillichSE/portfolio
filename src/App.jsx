import { useEffect, useRef, useState } from "react";
import { featured, projects, skills, contacts } from "./projects";
import "./App.css";

const FILTERS = [
  ["all", "All"],
  ["personal", "Personal"],
  ["olympiad", "Olympiad"],
  ["team", "Team"],
];

// Падающие картинки
function FallingImages() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const base = import.meta.env.BASE_URL;
    const images = ["blackwhite", "blackpurple", "BRAZILAVA", "green", "logocat", "USAava"].map((n) => {
      const img = new Image();
      img.src = `${base}${n}.png`;
      return img;
    });

    const size = 40;
    const objects = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      s: Math.random() * 0.3 + 0.1,
      img: images[Math.floor(Math.random() * images.length)],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01,
    }));

    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const o of objects) {
        o.y += o.s;
        o.rot += o.rotSpeed;
        if (o.y > canvas.height) o.y = -size;
        ctx.save();
        ctx.translate(o.x + size / 2, o.y + size / 2);
        ctx.rotate(o.rot);
        ctx.drawImage(o.img, -size / 2, -size / 2, size, size);
        ctx.restore();
      }
      raf = requestAnimationFrame(animate);
    };

    Promise.all(images.map((img) => new Promise((res) => (img.onload = res)))).then(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="bg" />;
}

function Tags({ list }) {
  return (
    <div className="tags">
      {list.map((t) => (
        <span key={t} className="tag">{t}</span>
      ))}
    </div>
  );
}

function Row({ p, i }) {
  const body = (
    <>
      <span className="n">{String(i + 1).padStart(2, "0")}</span>
      <div>
        <h3>{p.name}</h3>
        <p>{p.description}</p>
        <Tags list={p.tags} />
      </div>
      <div className="side up">
        <span>{p.category}</span>
        {p.link ? <span className="arrow">↗</span> : <span>Soon</span>}
      </div>
    </>
  );
  return p.link ? (
    <a className="row" href={p.link} target="_blank" rel="noreferrer">{body}</a>
  ) : (
    <div className="row soon">{body}</div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <>
      <FallingImages />
      <div className="page">
        <nav className="nav">
          <div className="wrap">
            <a href="#top" className="logo">SKI'S</a>
            <ul className="up">
              <li><a href="#main">Main</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </nav>

        <header className="panel hero" id="top">
          <div className="wrap">
            <h1 className="title">Ski's</h1>
            <p className="role">ML-Developer • Python Junior</p>
            <p className="lede">I study AI development, implement and train. I can do a little bit in Telegram bots.</p>
            <div className="cta">
              <a className="btn solid" href="#projects">Projects</a>
              <a className="btn" href="#contact">Contact</a>
            </div>
          </div>
          <span className="scroll up">Scroll</span>
        </header>

        <section className="panel featured" id="main">
          <div className="wrap">
            <div className="eyebrow">Main project</div>
            <h2 className="title">{featured.name}</h2>
            <p className="lede">{featured.description}</p>
            <Tags list={featured.tags} />
            <div className="cta">
              <a className="btn" href={featured.link} target="_blank" rel="noreferrer">View on GitHub</a>
            </div>
          </div>
        </section>

        <section className="block" id="projects">
          <div className="wrap">
            <div className="eyebrow">Projects</div>
            <h2 className="title">All missions</h2>
            <div className="filters up">
              {FILTERS.map(([key, name]) => (
                <button key={key} className={`tab up ${filter === key ? "on" : ""}`} onClick={() => setFilter(key)}>
                  {name}
                </button>
              ))}
            </div>
            <div className="list">
              {shown.map((p, i) => <Row key={p.name} p={p} i={i} />)}
            </div>
          </div>
        </section>

        <section className="block" id="about">
          <div className="wrap">
            <div className="eyebrow">About</div>
            <h2 className="title">Skills</h2>
            <div className="cols">
              {skills.map((g) => (
                <div key={g.group}>
                  <h3>{g.group}</h3>
                  <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="block" id="contact">
          <div className="wrap">
            <div className="eyebrow">Contact</div>
            <h2 className="title">Get in touch</h2>
            <div className="contact-list">
              {contacts.map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer">
                  <span className="up" style={{ color: "var(--muted)" }}>{c.label}</span>
                  <span className="v">{c.value} ↗</span>
                </a>
              ))}
            </div>
            <footer className="up">© Ski's</footer>
          </div>
        </section>
      </div>
    </>
  );
}
