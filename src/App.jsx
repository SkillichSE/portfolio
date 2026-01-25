import { Github, Send, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Кнопка с hover-эффектом
function HoverButton({ href, children }) {
  const [hovered, setHovered] = useState(false);

  const style = {
    width: "100%",
    backgroundColor: "white",
    color: "#18181b",
    borderRadius: "0.375rem",
    padding: "0.5rem 1rem",
    textAlign: "center",
    fontWeight: "500",
    textDecoration: "none",
    display: "block",
    transition: "all 0.2s ease",
    boxShadow: hovered
      ? "0 8px 20px rgba(0,0,0,0.25)"
      : "0 2px 5px rgba(0,0,0,0.15)",
    transform: hovered ? "scale(1.05)" : "scale(1)",
    cursor: "pointer",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

export default function Portfolio() {
  const skills = ["aiogram", "telethon"];
  const canvasRef = useRef(null);

  const projects = [
    {
      name: "SputnikSim",
      description:
        "A satellite simulation project focused on telemetry, system behavior modeling, and anomaly-oriented logic. Built as a technical foundation for space-related experimentation.",
      link: "https://github.com/SkillichSE/SputnikSim",
    },
    {
      name: "Lumi-bot",
      description:
        "A Telegram bot project with automation and intelligent behavior elements. Designed as a practical bot architecture using modern Python Telegram libraries.",
      link: "https://github.com/SkillichSE/Lumi-bot",
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Пути к картинкам в public
    const imagePaths = [
      "/blackwhite.png",
      "/blackpurple.png",
      "/BRAZILAVA.png",
      "/green.png",
      "/logocat.png",
      "/USAava.png",
    ];

    const images = imagePaths.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const objectSize = 40;
    const objects = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      s: Math.random() * 0.5 + 0.2, // скорость падения
      size: objectSize,
      img: images[Math.floor(Math.random() * images.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));

    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      objects.forEach((obj) => {
        obj.y += obj.s;
        obj.rotation += obj.rotationSpeed;

        if (obj.y > canvas.height) obj.y = -obj.size;

        ctx.save();
        ctx.translate(obj.x + obj.size / 2, obj.y + obj.size / 2);
        ctx.rotate(obj.rotation);
        ctx.drawImage(obj.img, -obj.size / 2, -obj.size / 2, obj.size, obj.size);
        ctx.restore();
      });

      raf = requestAnimationFrame(animate);
    };

    // Ждём загрузки всех картинок
    Promise.all(images.map((img) => new Promise((res) => (img.onload = res)))).then(() => {
      animate();
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const cardStyle = {
    backgroundColor: "#3f3f46",
    border: "1px solid #52525b",
    borderRadius: "0.5rem",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#27272a",
        color: "#18181b",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Canvas с падающими картинками */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "1.5rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            maxWidth: "80rem",
            margin: "0 auto 3rem auto",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Ski's
          </h1>
          <p
            style={{
              color: "#e4e4e7",
              fontSize: "1.125rem",
              marginBottom: "0.5rem",
            }}
          >
            AI Developer • Python & Telegram Automation
          </p>
          <p
            style={{
              color: "#d4d4d8",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            Focused on Telegram bots, automation systems, and experimenting with artificial intelligence.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {skills.map((s) => (
              <span
                key={s}
                style={{
                  padding: "0.25rem 0.75rem",
                  fontSize: "0.875rem",
                  borderRadius: "9999px",
                  backgroundColor: "white",
                  color: "#18181b",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Контакты */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
            maxWidth: "80rem",
            margin: "0 auto 3rem auto",
          }}
        >
          <div style={cardStyle}>
            <MessageCircle style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
            <p style={{ fontSize: "1.125rem", fontWeight: "600", color: "white" }}>Discord</p>
            <HoverButton href="https://discordapp.com/users/1101053298351538236">Ski's</HoverButton>
          </div>

          <div style={cardStyle}>
            <Send style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
            <p style={{ fontSize: "1.125rem", fontWeight: "600", color: "white" }}>Telegram</p>
            <HoverButton href="https://t.me/Skillich">@Skillich</HoverButton>
          </div>

          <div style={cardStyle}>
            <Github style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
            <p style={{ fontSize: "1.125rem", fontWeight: "600", color: "white" }}>GitHub</p>
            <HoverButton href="https://github.com/SkillichSE">github.com/SkillichSE</HoverButton>
          </div>
        </div>

        {/* Projects */}
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "600",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            Projects
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {projects.map((project, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#3f3f46",
                  border: "1px solid #52525b",
                  borderRadius: "0.5rem",
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {project.name}
                </h3>
                <p style={{ color: "#e4e4e7", flex: 1 }}>{project.description}</p>
                <HoverButton href={project.link}>View on GitHub</HoverButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
