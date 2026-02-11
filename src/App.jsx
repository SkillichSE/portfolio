import { Github, Send, MessageCircle, Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Кнопка с hover-эффектом
function HoverButton({ href, style, children }) {
  const [hovered, setHovered] = useState(false);

  const styleBtn = {
    width: "100%",
    backgroundColor: "hsl(from #3f3f46 h s calc(l + 20))",
    border: "1px solid hsl(from #3f3f46 h s calc(l + 30))",
    color: "white",
    borderRadius: "0.375rem",
    padding: "0.5rem 1rem",
    textAlign: "center",
    fontWeight: "500",
    textDecoration: "none",
    display: "block",
    transition: "all 0.2s ease",
    boxShadow: hovered
      ? "0 8px 20px rgba(0,0,0,0.25)"
      : "0 2px 5px rgba(0,0,0,0.25)",
    transform: hovered ? "scale(1.05)" : "scale(1)",
    cursor: "pointer",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{...style, width: '100%'}}
    >
      <button style={styleBtn}>
        {children}
      </button>
    </a>
  );
}

// Компонент для отображения последнего поста из Telegram
function TelegramWidget() {
  const widgetRef = useRef(null);
  const [latestPostId, setLatestPostId] = useState(15);
  const [loading, setLoading] = useState(true);

  const fetchLatestPostId = async () => {
    try {
      console.log('🔍 Fetching latest Telegram post...');
      
      // Пробуем несколько CORS прокси по очереди
      const proxies = [
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest=',
        'https://thingproxy.freeboard.io/fetch/'
      ];
      
      for (const proxy of proxies) {
        try {
          const channelUrl = 'https://t.me/s/ntr1_0';
          const url = proxy + encodeURIComponent(channelUrl);
          
          console.log('Trying proxy:', proxy);
          const response = await fetch(url, { 
            signal: AbortSignal.timeout(8000) // 8 секунд таймаут
          });
          
          if (!response.ok) continue;
          
          const html = await response.text();
          
          // Ищем все ссылки на посты
          const postMatches = html.matchAll(/data-post="ntr1_0\/(\d+)"/g);
          const postIds = Array.from(postMatches, match => parseInt(match[1]));
          
          if (postIds.length > 0) {
            const maxId = Math.max(...postIds);
            console.log('✅ Found latest post:', maxId);
            setLatestPostId(maxId);
            return maxId;
          }
        } catch (err) {
          console.log('Proxy failed:', proxy, err.message);
          continue;
        }
      }
      
      console.log('⚠️ All proxies failed, using fallback post ID:', latestPostId);
    } catch (error) {
      console.error('❌ Error fetching latest post:', error);
    }
    return latestPostId;
  };

  const loadWidget = (postId) => {
    if (widgetRef.current) {
      widgetRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-post', `ntr1_0/${postId}`);
    script.setAttribute('data-width', '100%');
    script.setAttribute('data-dark', '1');
    script.async = true;

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    // Загружаем последний пост при монтировании
    const initWidget = async () => {
      const postId = await fetchLatestPostId();
      loadWidget(postId);
    };
    
    initWidget();

    // Обновление каждые 5 минут
    const interval = setInterval(async () => {
      console.log('🔄 Auto-refreshing Telegram widget...');
      const postId = await fetchLatestPostId();
      loadWidget(postId);
    }, 300000); // 5 минут

    return () => clearInterval(interval);
  }, []);

  const cardStyle = {
    backgroundColor: "#3f3f46",
    border: "1px solid #52525b",
    borderRadius: "0.5rem",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    minHeight: "200px",
    height: "100%",
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <Radio style={{ width: "1.5rem", height: "1.5rem", color: "#60a5fa" }} />
        <h3 style={{ 
          fontSize: "1.25rem", 
          fontWeight: "600", 
          color: "white", 
          margin: 0 
        }}>
          Latest Update
        </h3>
      </div>
      {loading && (
        <div style={{ 
          minHeight: "150px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: "#9ca3af"
        }}>
          Loading latest post...
        </div>
      )}
      <div 
        ref={widgetRef}
        style={{
          minHeight: "150px",
          maxHeight: "400px",  
          borderRadius: "0.375rem",
          overflow: "auto",    // <--- скролл внутри блока
          display: loading ? 'none' : 'block'
  }}
/>
      <a 
        href="https://t.me/ntr1_0"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          marginTop: "1rem",
          color: "#60a5fa",
          textDecoration: "none",
          fontSize: "0.875rem",
          textAlign: "center",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => e.target.style.color = "#93c5fd"}
        onMouseLeave={(e) => e.target.style.color = "#60a5fa"}
      >
        View Channel →
      </a>
    </div>
  );
}


// Компонент для отображения последних коммитов из GitHub
function GitHubCommits() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      console.log('🔄 Fetching GitHub activity...');
      try {
        const response = await fetch(
          'https://api.github.com/users/SkillichSE/events/public'
        );
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Total events received:', data.length);
        console.log('📊 Event types:', [...new Set(data.map(e => e.type))]);
        console.log('🔍 First event FULL:', JSON.stringify(data[0], null, 2)); // Полный JSON первого события
        
        // Собираем разные типы активности
        const activities = [];
        
        data.slice(0, 10).forEach((event, index) => {
          if (index === 0) {
            console.log('🔍 Detailed first event payload:', JSON.stringify(event.payload, null, 2));
          }
          
          console.log(`Processing ${event.type}:`, event.payload);
          
          if (event.type === 'PushEvent') {
            const commits = event.payload.commits || [];
            console.log(`  Commits array:`, commits);
            console.log(`  Found ${commits.length} commits in PushEvent`);
            
            // Если есть коммиты - используем первый
            if (commits.length > 0 && commits[0].sha && commits[0].message) {
              activities.push({
                type: 'commit',
                repo: event.repo.name,
                message: commits[0].message,
                date: new Date(event.created_at),
                sha: commits[0].sha.substring(0, 7),
                url: `https://github.com/${event.repo.name}/commit/${commits[0].sha}`
              });
            } else {
              // Fallback - показываем сам факт пуша без деталей коммита
              console.log('  Using fallback for PushEvent without commits array');
              activities.push({
                type: 'commit',
                repo: event.repo.name,
                message: `Pushed to ${event.payload.ref || 'repository'}`,
                date: new Date(event.created_at),
                sha: 'push',
                url: `https://github.com/${event.repo.name}`
              });
            }
          } else if (event.type === 'CreateEvent') {
            const refType = event.payload.ref_type;
            const ref = event.payload.ref;
            console.log(`  CreateEvent: ${refType} - ${ref}`);
            activities.push({
              type: 'create',
              repo: event.repo.name,
              message: `Created ${refType}${ref ? ': ' + ref : ''}`,
              date: new Date(event.created_at),
              sha: 'new',
              url: `https://github.com/${event.repo.name}`
            });
          } else if (event.type === 'ForkEvent') {
            console.log(`  ForkEvent:`, event.payload.forkee);
            activities.push({
              type: 'fork',
              repo: event.repo.name,
              message: `Forked repository`,
              date: new Date(event.created_at),
              sha: 'fork',
              url: event.payload.forkee?.html_url || `https://github.com/${event.repo.name}`
            });
          } else if (event.type === 'WatchEvent') {
            activities.push({
              type: 'star',
              repo: event.repo.name,
              message: `Starred repository`,
              date: new Date(event.created_at),
              sha: '⭐',
              url: `https://github.com/${event.repo.name}`
            });
          } else if (event.type === 'IssuesEvent') {
            activities.push({
              type: 'issue',
              repo: event.repo.name,
              message: `${event.payload.action} issue: ${event.payload.issue.title}`,
              date: new Date(event.created_at),
              sha: '#' + event.payload.issue.number,
              url: event.payload.issue.html_url
            });
          } else if (event.type === 'PullRequestEvent') {
            activities.push({
              type: 'pr',
              repo: event.repo.name,
              message: `${event.payload.action} PR: ${event.payload.pull_request.title}`,
              date: new Date(event.created_at),
              sha: '#' + event.payload.pull_request.number,
              url: event.payload.pull_request.html_url
            });
          }
        });
        
        console.log('✅ Activities found:', activities.length);
        console.log('📝 Activities:', activities);
        
        setCommits(activities.slice(0, 2));
        setError(null);
        setLoading(false);
      } catch (error) {
        console.error('❌ Error fetching activity:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCommits();
    
    // Обновление каждые 5 минут
    const interval = setInterval(fetchCommits, 300000);
    
    return () => clearInterval(interval);
  }, []);

  const cardStyle = {
    backgroundColor: "#3f3f46",
    border: "1px solid #52525b",
    borderRadius: "0.5rem",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    minHeight: "200px",
    height: "100%",
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // секунды
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <Github style={{ width: "1.5rem", height: "1.5rem", color: "#a78bfa" }} />
        <h3 style={{ 
          fontSize: "1.25rem", 
          fontWeight: "600", 
          color: "white", 
          margin: 0 
        }}>
          Recent Activity
        </h3>
      </div>
      
      {loading ? (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "150px",
          color: "#d4d4d8" 
        }}>
          Loading commits...
        </div>
      ) : error ? (
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "150px",
          color: "#fca5a5",
          textAlign: "center",
          padding: "1rem"
        }}>
          <p style={{ margin: "0 0 0.5rem 0", fontWeight: "600" }}>Failed to load activity</p>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#d4d4d8" }}>{error}</p>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.75rem", color: "#a1a1aa" }}>
            Check browser console for details
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {commits.length === 0 ? (
            <p style={{ color: "#d4d4d8", textAlign: "center" }}>No recent activity</p>
          ) : (
            commits.map((commit, index) => (
              <a
                key={index}
                href={commit.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  padding: "0.75rem",
                  backgroundColor: "#52525b",
                  borderRadius: "0.375rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  border: "1px solid #71717a",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#71717a";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#52525b";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  marginBottom: "0.25rem" 
                }}>
                  <span style={{ 
                    fontSize: "0.75rem", 
                    color: "#a1a1aa",
                    fontFamily: "monospace"
                  }}>
                    {commit.repo.split('/')[1]}
                  </span>
                  <span style={{ 
                    fontSize: "0.75rem", 
                    color: "#d4d4d8",
                    fontFamily: "monospace"
                  }}>
                    {commit.sha}
                  </span>
                </div>
                <p style={{ 
                  margin: "0 0 0.25rem 0", 
                  color: "#e4e4e7",
                  fontSize: "0.875rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {commit.message}
                </p>
                <span style={{ 
                  fontSize: "0.75rem", 
                  color: "#a1a1aa" 
                }}>
                  {formatDate(commit.date)}
                </span>
              </a>
            ))
          )}
        </div>
      )}
      
      <a 
        href="https://github.com/SkillichSE"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          marginTop: "1rem",
          color: "#a78bfa",
          textDecoration: "none",
          fontSize: "0.875rem",
          textAlign: "center",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => e.target.style.color = "#c4b5fd"}
        onMouseLeave={(e) => e.target.style.color = "#a78bfa"}
      >
        View Profile →
      </a>
    </div>
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
        "A Telegram bot project with automation and intelligent behavior elements. Designed as a practical bot architecture using modern Python Telegram libraries.　　　　　　",
      link: "https://github.com/SkillichSE/Lumi-bot",
    },
  ];

  // Убираем горизонтальный скролл
  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const imagePaths = [
      import.meta.env.BASE_URL + "blackwhite.png",
      import.meta.env.BASE_URL + "blackpurple.png",
      import.meta.env.BASE_URL + "BRAZILAVA.png",
      import.meta.env.BASE_URL + "green.png",
      import.meta.env.BASE_URL + "logocat.png",
      import.meta.env.BASE_URL + "USAava.png",
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
      s: Math.random() * 0.3 + 0.1,
      size: objectSize,
      img: images[Math.floor(Math.random() * images.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
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
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    height: "auto",
  };

  const projectCardStyle = {
    ...cardStyle,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", 
    height: "auto", 
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
        style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.6 }}
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
          <h1 style={{ 
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.75))", 
            fontSize: "3rem", 
            fontWeight: "bold", 
            color: "white", 
            marginBottom: "1rem" 
          }}>
            Ski's
          </h1>
          <p style={{ 
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.75))", 
            color: "#e4e4e7", 
            fontSize: "1.125rem", 
            marginBottom: "0.5rem" 
          }}>
            ML-Developer • Python Junior
          </p>
          <p style={{ 
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.75))", 
            color: "#d4d4d8", 
            fontSize: "0.875rem", 
            marginBottom: "1rem" 
          }}>
            I study AI development, implement and train. I can do a little bit in Telegram bots.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            {skills.map((s) => (
              <span
                key={s}
                style={{
                  padding: "0.25rem 0.75rem",
                  fontSize: "0.875rem",
                  borderRadius: "9999px",
                  backgroundColor: "#3f3f46",
                  fontFamily: "monospace",
                  border: "1px solid hsl(from #3f3f46 h s calc(l + 10))",
                  color: "white",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Telegram Channel Widget and GitHub Commits - side by side */}
        <div style={{ 
          maxWidth: "80rem", 
          margin: "0 auto 3rem auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "1.5rem"
        }}>
          <TelegramWidget />
          <GitHubCommits />
        </div>

        {/* Projects */}
        <div style={{ maxWidth: "80rem", margin: "0 auto 3rem auto" }}>
          <h2 style={{ 
            fontSize: "1.875rem", 
            fontWeight: "600", 
            color: "white", 
            marginBottom: "1.5rem" 
          }}>
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
              <div key={i} style={projectCardStyle}>
                <h3 style={{ 
                  fontSize: "1.25rem", 
                  fontWeight: "bold", 
                  color: "white", 
                  marginBottom: "0", 
                  marginTop: "0" 
                }}>
                  {project.name}
                </h3>
                <p style={{ 
                  color: "#e4e4e7", 
                  textWrap: "pretty", 
                  margin: "0.5rem 0" 
                }}>
                  {project.description}
                </p>
                <HoverButton href={project.link} style={{marginTop: "auto"}}>
                  View on GitHub
                </HoverButton>
              </div>
            ))}
          </div>
        </div>

        {/* Контакты - перемещены вниз */}
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "1.875rem", 
            fontWeight: "600", 
            color: "white", 
            marginBottom: "1.5rem" 
          }}>
            Contact
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            <div style={cardStyle}>
              <p style={{ 
                display: "flex", 
                fontSize: "1.125rem", 
                fontWeight: "600", 
                color: "white" 
              }}>
                <MessageCircle style={{
                  width: "1.5rem", 
                  height: "1.5rem", 
                  color: "white" 
                }} />
                <span style={{margin: "unset auto", marginLeft: "0.5rem"}}>
                  Discord
                </span>
              </p>
              <HoverButton href="https://discordapp.com/users/1101053298351538236">
                Ski's
              </HoverButton>
            </div>

            <div style={cardStyle}>
              <p style={{ 
                display: "flex", 
                fontSize: "1.125rem", 
                fontWeight: "600", 
                color: "white" 
              }}>
                <Send style={{ 
                  width: "1.5rem", 
                  height: "1.5rem", 
                  color: "white" 
                }} />
                <span style={{margin: "unset auto", marginLeft: "0.5rem"}}>
                  Telegram
                </span>
              </p>
              <HoverButton href="https://t.me/Skillich">
                @Skillich
              </HoverButton>
            </div>

            <div style={cardStyle}>
              <p style={{ 
                display: "flex", 
                fontSize: "1.125rem", 
                fontWeight: "600", 
                color: "white" 
              }}>
                <Github style={{
                  width: "1.5rem", 
                  height: "1.5rem", 
                  color: "white" 
                }} />
                <span style={{margin: "unset auto", marginLeft: "0.5rem"}}>
                  GitHub
                </span>
              </p>
              <HoverButton href="https://github.com/SkillichSE">
                SkillichSE
              </HoverButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}