import { Github, Send, MessageCircle, Radio, X, User, Code, Brain, Wrench, Globe, Users, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Кнопка с hover-эффектом
function HoverButton({ href, style, children, onClick }) {
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

  if (onClick) {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{...styleBtn, ...style, border: "1px solid hsl(from #3f3f46 h s calc(l + 30))"}}
      >
        {children}
      </button>
    );
  }

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

// Модальное окно About Me
function AboutMeModal({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const projects = [
    {
      name: "SputnikSim",
      description: "A satellite simulation project focused on telemetry, system behavior modeling, and anomaly-oriented logic. Built as a technical foundation for space-related experimentation.",
      link: "https://github.com/SkillichSE/SputnikSim",
      tags: ["Python", "Simulation", "Space Tech"]
    },
    {
      name: "Lumi-bot",
      description: "A Telegram bot project with automation and intelligent behavior elements. Designed as a practical bot architecture using Python Telegram libraries. Also have userbot version.",
      link: "https://github.com/SkillichSE/Lumi-bot",
      tags: ["Python", "Telegram", "Automation"]
    },
  ];

  const skillsData = {
    softSkills: [
      { name: "English B1", icon: Globe },
      { name: "Teamwork", icon: Users },
      { name: "Learning Ability", icon: TrendingUp }
    ],
    programmingLanguages: [
      { name: "Python", color: "#3776ab" },
      { name: "JavaScript", color: "#f7df1e" }
    ],
    mlDataScience: [
      { name: "NumPy", color: "#013243" },
      { name: "PyTorch", color: "#ee4c2c" },
      { name: "aiogram", color: "#26a5e4" },
      { name: "telethon", color: "#2aabee" }
    ],
    tools: [
      { name: "Git", color: "#f05032" }
    ]
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 999,
          animation: isClosing ? "fadeOut 0.3s ease-out" : "fadeIn 0.3s ease-out",
          backdropFilter: "blur(4px)"
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: "90%",
          maxWidth: "900px",
          maxHeight: "85vh",
          backgroundColor: "#27272a",
          border: "2px solid #52525b",
          borderRadius: "1rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          animation: isClosing ? "slideOut 0.3s ease-out" : "slideIn 0.3s ease-out",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Header */}
        <div style={{
          padding: "1.5rem",
          borderBottom: "1px solid #52525b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, #3f3f46 0%, #27272a 100%)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <User style={{ width: "2rem", height: "2rem", color: "#a78bfa" }} />
            <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "white", margin: 0 }}>
              About Me
            </h2>
          </div>
          <button
            onClick={handleClose}
            style={{
              backgroundColor: "#52525b",
              border: "1px solid #71717a",
              borderRadius: "0.375rem",
              padding: "0.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#71717a";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#52525b";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <X style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: "1.5rem",
          overflowY: "auto",
          flex: 1
        }}>
          {/* Skills Section */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Brain style={{ width: "1.5rem", height: "1.5rem", color: "#60a5fa" }} />
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "white", margin: 0 }}>
                Skills
              </h3>
            </div>

            {/* Soft Skills */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: "500", color: "#d4d4d8", marginBottom: "0.75rem" }}>
                Soft Skills
              </h4>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {skillsData.softSkills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#3f3f46",
                        border: "1px solid #52525b",
                        borderRadius: "0.5rem",
                        color: "white",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#52525b";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#3f3f46";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <Icon style={{ width: "1rem", height: "1rem", color: "#60a5fa" }} />
                      <span style={{ fontSize: "0.875rem" }}>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Learning Section */}
            <div style={{
              backgroundColor: "#3f3f46",
              border: "1px solid #52525b",
              borderRadius: "0.75rem",
              padding: "1.25rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <Code style={{ width: "1.25rem", height: "1.25rem", color: "#a78bfa" }} />
                <h4 style={{ fontSize: "1.125rem", fontWeight: "600", color: "white", margin: 0 }}>
                  Learning
                </h4>
              </div>

              {/* Programming Languages */}
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: "0.875rem", color: "#a1a1aa", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Programming Languages
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {skillsData.programmingLanguages.map((lang) => (
                    <span
                      key={lang.name}
                      style={{
                        padding: "0.375rem 0.875rem",
                        fontSize: "0.875rem",
                        borderRadius: "9999px",
                        backgroundColor: "#52525b",
                        color: "white",
                        fontFamily: "monospace",
                        border: `2px solid ${lang.color}`,
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = lang.color;
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#52525b";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {lang.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* ML & Data Science */}
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: "0.875rem", color: "#a1a1aa", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Machine Learning & Data Science
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {skillsData.mlDataScience.map((tech) => (
                    <span
                      key={tech.name}
                      style={{
                        padding: "0.375rem 0.875rem",
                        fontSize: "0.875rem",
                        borderRadius: "9999px",
                        backgroundColor: "#52525b",
                        color: "white",
                        fontFamily: "monospace",
                        border: `2px solid ${tech.color}`,
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = tech.color;
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#52525b";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <p style={{ fontSize: "0.875rem", color: "#a1a1aa", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Tools
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {skillsData.tools.map((tool) => (
                    <span
                      key={tool.name}
                      style={{
                        padding: "0.375rem 0.875rem",
                        fontSize: "0.875rem",
                        borderRadius: "9999px",
                        backgroundColor: "#52525b",
                        color: "white",
                        fontFamily: "monospace",
                        border: `2px solid ${tool.color}`,
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = tool.color;
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#52525b";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Wrench style={{ width: "1.5rem", height: "1.5rem", color: "#60a5fa" }} />
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "white", margin: 0 }}>
                Projects
              </h3>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem"
            }}>
              {projects.map((project) => (
                <div
                  key={project.name}
                  style={{
                    backgroundColor: "#3f3f46",
                    border: "1px solid #52525b",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.4)";
                    e.currentTarget.style.borderColor = "#71717a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#52525b";
                  }}
                >
                  <h4 style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "0.5rem",
                    marginTop: 0
                  }}>
                    {project.name}
                  </h4>
                  <p style={{
                    color: "#d4d4d8",
                    fontSize: "0.875rem",
                    marginBottom: "0.75rem",
                    lineHeight: "1.5"
                  }}>
                    {project.description}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "0.25rem 0.625rem",
                          fontSize: "0.75rem",
                          borderRadius: "9999px",
                          backgroundColor: "#52525b",
                          color: "#d4d4d8",
                          fontFamily: "monospace"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#60a5fa",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      transition: "color 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#93c5fd"}
                    onMouseLeave={(e) => e.target.style.color = "#60a5fa"}
                  >
                    View on GitHub
                    <Github style={{ width: "1rem", height: "1rem" }} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
          @keyframes slideOut {
            from {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            to {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.9);
            }
          }
        `}
      </style>
    </>
  );
}

// Компонент для отображения последнего поста из Telegram
function TelegramWidget() {
  const widgetRef = useRef(null);
  const [latestPostId, setLatestPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLatestPostId = async () => {
    try {
      console.log('🔍 Fetching latest Telegram post...');
      
      // Метод 1: Попробовать угадать последний пост (проверяем несколько ID вперед)
      const tryDirectPostCheck = async (startId) => {
        console.log('🎯 Trying direct post check starting from:', startId);
        const proxies = [
          'https://corsproxy.io/?',
          'https://api.codetabs.com/v1/proxy?quest='
        ];
        
        // Проверяем следующие 10 ID
        for (let id = startId + 10; id > startId; id--) {
          for (const proxy of proxies) {
            try {
              const postUrl = `https://t.me/ntr1_0/${id}?embed=1&mode=tme`;
              const url = proxy + encodeURIComponent(postUrl);
              
              const response = await fetch(url, { 
                signal: AbortSignal.timeout(3000),
                cache: 'no-store'
              });
              
              if (response.ok) {
                const html = await response.text();
                if (!html.includes('Post not found') && html.includes('tgme_widget_message')) {
                  console.log('✅ Found existing post via direct check:', id);
                  return id;
                }
              }
            } catch (err) {
              continue;
            }
          }
        }
        return null;
      };
      
      // Метод 2: Парсинг страницы канала
      const proxies = [
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest=',
        'https://thingproxy.freeboard.io/fetch/'
      ];
      
      for (const proxy of proxies) {
        try {
          const timestamp = Date.now();
          const channelUrl = `https://t.me/s/ntr1_0?_=${timestamp}`;
          const url = proxy + encodeURIComponent(channelUrl);
          
          console.log('Trying proxy:', proxy);
          const response = await fetch(url, { 
            signal: AbortSignal.timeout(8000),
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            }
          });
          
          if (!response.ok) continue;
          
          const html = await response.text();
          
          const patterns = [
            /data-post="ntr1_0\/(\d+)"/g,
            /ntr1_0\/(\d+)/g,
            /post(\d+)/g
          ];
          
          let allPostIds = [];
          
          for (const pattern of patterns) {
            const matches = html.matchAll(pattern);
            const ids = Array.from(matches, match => parseInt(match[1]));
            allPostIds = allPostIds.concat(ids);
          }
          
          const postIds = [...new Set(allPostIds)].sort((a, b) => b - a);
          
          console.log('📊 Found post IDs:', postIds.slice(0, 10));
          
          if (postIds.length > 0) {
            const maxIdFromPage = Math.max(...postIds);
            console.log('✅ Latest post from page:', maxIdFromPage);
            
            const checkedId = await tryDirectPostCheck(maxIdFromPage);
            if (checkedId) {
              return checkedId;
            }
            
            return maxIdFromPage;
          }
        } catch (err) {
          console.log('Proxy failed:', proxy, err.message);
          continue;
        }
      }
      
      console.log('⚠️ All proxies failed, using fallback post ID: 15');
      return 15;
    } catch (error) {
      console.error('❌ Error fetching latest post:', error);
      return 15;
    }
  };

  const loadWidget = (postId) => {
    if (widgetRef.current) {
      widgetRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = `https://telegram.org/js/telegram-widget.js?${Date.now()}`;
    script.setAttribute('data-telegram-post', `ntr1_0/${postId}`);
    script.setAttribute('data-width', '100%');
    script.setAttribute('data-dark', '1');
    script.async = true;

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }
    
    console.log('📺 Widget loaded for post:', postId);
    setLoading(false);
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    console.log('🔄 Manual refresh triggered');
    const postId = await fetchLatestPostId();
    
    if (postId && postId !== latestPostId) {
      console.log('📝 New post detected! Updating from', latestPostId, 'to', postId);
      setLatestPostId(postId);
      loadWidget(postId);
    } else {
      console.log('ℹ️ Already showing latest post:', latestPostId);
      if (postId) {
        loadWidget(postId);
      }
    }
    
    setTimeout(() => setRefreshing(false), 1000);
  };

  useEffect(() => {
    const initWidget = async () => {
      const postId = await fetchLatestPostId();
      setLatestPostId(postId);
      loadWidget(postId);
    };
    
    initWidget();

    const interval = setInterval(async () => {
      console.log('🔄 Auto-refreshing Telegram widget...');
      const postId = await fetchLatestPostId();
      
      if (postId && latestPostId && postId !== latestPostId) {
        console.log('📝 New post detected! Updating from', latestPostId, 'to', postId);
        setLatestPostId(postId);
        loadWidget(postId);
      } else if (!latestPostId && postId) {
        console.log('📝 Initial post load:', postId);
        setLatestPostId(postId);
        loadWidget(postId);
      } else {
        console.log('ℹ️ No new posts, keeping current:', latestPostId, '(fetched:', postId, ')');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [latestPostId]);

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          style={{
            backgroundColor: refreshing ? "#52525b" : "#3f3f46",
            border: "1px solid #52525b",
            borderRadius: "0.375rem",
            padding: "0.5rem",
            cursor: refreshing ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            opacity: refreshing ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!refreshing) {
              e.currentTarget.style.backgroundColor = "#52525b";
              e.currentTarget.style.transform = "scale(1.05)";
            }
          }}
          onMouseLeave={(e) => {
            if (!refreshing) {
              e.currentTarget.style.backgroundColor = "#3f3f46";
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
          title="Refresh latest post"
        >
          <svg 
            style={{ 
              width: "1rem", 
              height: "1rem", 
              color: "white",
              animation: refreshing ? "spin 1s linear infinite" : "none"
            }} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      {latestPostId && (
        <div style={{ 
          fontSize: "0.75rem", 
          color: "#9ca3af",
          marginBottom: "0.5rem"
        }}>
          Post ID: {latestPostId}
        </div>
      )}
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
          overflow: "auto",
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
          transition: "color 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "#93c5fd"}
        onMouseLeave={(e) => e.currentTarget.style.color = "#60a5fa"}
      >
        View Channel →
      </a>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
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
        
        const activities = [];
        
        data.slice(0, 10).forEach((event) => {
          if (event.type === 'PushEvent') {
            const commits = event.payload.commits || [];
            
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
            activities.push({
              type: 'create',
              repo: event.repo.name,
              message: `Created ${refType}${ref ? ': ' + ref : ''}`,
              date: new Date(event.created_at),
              sha: 'new',
              url: `https://github.com/${event.repo.name}`
            });
          } else if (event.type === 'ForkEvent') {
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
    const diff = Math.floor((now - date) / 1000);
    
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
  const canvasRef = useRef(null);
  const [showAboutMe, setShowAboutMe] = useState(false);

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
            marginBottom: "1.5rem" 
          }}>
            I study AI development, implement and train. I can do a little bit in Telegram bots.
          </p>
          
          {/* About Me Button */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <HoverButton 
              onClick={() => setShowAboutMe(true)}
              style={{
                maxWidth: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              <User style={{ width: "1.25rem", height: "1.25rem" }} />
              <span>About Me</span>
            </HoverButton>
          </div>
        </div>

        {/* About Me Modal */}
        <AboutMeModal isOpen={showAboutMe} onClose={() => setShowAboutMe(false)} />

        {/* Telegram Channel Widget and GitHub Commits */}
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

        {/* Контакты */}
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
