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

function Card({ p }) {
  const body = (
    <>
      <span className="cat">{p.category}</span>
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <Tags list={p.tags} />
      {p.link && <span className="go">GitHub →</span>}
    </>
  );
  return p.link ? (
    <a className="card" href={p.link} target="_blank" rel="noreferrer">{body}</a>
  ) : (
    <div className="card soon">{body}</div>
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
            <a href="#top" className="logo">Ski's</a>
            <ul>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </nav>

        <main className="wrap" id="top">
          <section className="hero">
            <h1>Ski's</h1>
            <p className="role">ML-Developer • Python Junior</p>
            <p className="bio">I study AI development, implement and train. I can do a little bit in Telegram bots.</p>
            <div className="cta">
              <a className="btn primary" href="#projects">See projects</a>
              <a className="btn" href="#contact">Contact</a>
            </div>
          </section>

          <section id="projects">
            <div className="label">Main project</div>
            <a className="card featured" href={featured.link} target="_blank" rel="noreferrer">
              <h3>{featured.name}</h3>
              <p>{featured.description}</p>
              <Tags list={featured.tags} />
              <span className="go">GitHub →</span>
            </a>

            <div className="label" style={{ marginTop: "2.5rem" }}>Other projects</div>
            <div className="filters">
              {FILTERS.map(([key, name]) => (
                <button key={key} className={`chip ${filter === key ? "on" : ""}`} onClick={() => setFilter(key)}>
                  {name}
                </button>
              ))}
            </div>
            <div className="grid">
              {shown.map((p) => <Card key={p.name} p={p} />)}
            </div>
          </section>

          <section id="about">
            <div className="label">Skills</div>
            <div className="skills">
              {skills.map((g) => (
                <div key={g.group} className="card">
                  <h3>{g.group}</h3>
                  <Tags list={g.items} />
                </div>
              ))}
            </div>
          </section>

          <section id="contact">
            <div className="label">Contact</div>
            <div className="contacts">
              {contacts.map((c) => (
                <a key={c.label} className="card" href={c.href} target="_blank" rel="noreferrer">
                  <span className="k">{c.label}</span>
                  <span className="v">{c.value}</span>
                </a>
              ))}
            </div>
          </section>

          <footer>© Ski's</footer>
        </main>
      </div>
    </>
  );
}
