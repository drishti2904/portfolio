import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Code, Database, Wrench, Award, BookOpen, ChevronDown } from 'lucide-react';

// --- Typewriter Hook ---
const useTypewriter = (texts, speed = 80, pause = 2000) => {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timer;
    if (!deleting && charIndex < current.length) {
      timer = setTimeout(() => setCharIndex(c => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex(c => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex(i => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timer);
  }, [charIndex, deleting, textIndex, texts, speed, pause]);

  return displayed;
};

// --- Intersection Observer Hook ---
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// --- Animated Section Wrapper ---
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// --- Glitch Text ---
const GlitchText = ({ text, className = '' }) => (
  <span className={`glitch-wrapper ${className}`} data-text={text}>
    {text}
  </span>
);

// --- Particle Star Field ---
const StarField = () => {
  const stars = useRef(
    Array.from({ length: 130 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 2,
      opacity: Math.random() * 0.7 + 0.2,
    }))
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.current.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.y}%`,
            left: `${s.x}%`,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      {/* Nebula blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-purple-700/10 blur-3xl animate-drift-slow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl animate-drift-slow2" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-pink-700/8 blur-3xl animate-drift-slow3" />
    </div>
  );
};

// --- Cursor Follower ---
const CursorGlow = () => {
  const pos = useRef({ x: -200, y: -200 });
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const raf = useRef(null);
  const current = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.12;
      current.current.y += (pos.current.y - current.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={glowRef} className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-10 will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 will-change-transform mix-blend-screen" />
    </>
  );
};

const SpacePortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loadPct, setLoadPct] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  const profileImage = "/profile.jpg";
  const typeText = useTypewriter(
    ['Software Engineer', 'Full-Stack Developer', 'Problem Solver', 'System Designer'],
    75, 2200
  );

  useEffect(() => {
    let pct = 0;
    const iv = setInterval(() => {
      pct += Math.random() * 18 + 4;
      if (pct >= 100) { pct = 100; clearInterval(iv); setTimeout(() => setIsLoading(false), 300); }
      setLoadPct(Math.min(Math.round(pct), 100));
    }, 100);

    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
      const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
      const current = sections.find(s => {
        const el = document.getElementById(s);
        if (el) { const r = el.getBoundingClientRect(); return r.top <= 100 && r.bottom >= 100; }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => { clearInterval(iv); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const skills = {
    frontend: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
    backend: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
    tools: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    ],
  };

  const projects = [
    { title: 'Talkify', desc: 'Real-time chat and video communication platform with JWT authentication, typing indicators, and file sharing.', tech: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'], live: 'https://talkify-5kpo.onrender.com/', github: 'https://github.com/drishti2904' },
    { title: 'TripLodger', desc: 'Full-stack travel accommodation platform connecting property owners with travelers. Features user auth and image management.', tech: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Cloudinary'], live: 'https://triplodger-1.onrender.com/', github: 'https://github.com/drishti2904' },
    { title: 'SpendWise', desc: 'Full-stack personal expense tracker with category-wise budget limits, a transaction ledger with CSV export, and dashboard charts breaking down spending by category and share.', tech: ['React.js', 'Vite', 'Node.js', 'Express.js', 'Tailwind CSS'], live: 'https://expense-tracker-seven-kohl-40.vercel.app/', github: 'https://github.com/drishti2904/Expense-Tracker' },
    { title: 'Kanban Board', desc: 'Real-time collaborative task board with Smart Assign and conflict handling. Manages tasks across different statuses with live updates.', tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.IO', 'JWT'], live: 'https://kanban-board-gray-five.vercel.app/', github: 'https://github.com/drishti2904/KanbanBoard' },
    { title: 'API Health Checker', desc: 'Real-time API monitoring dashboard tracking uptime, HTTP status codes, and response latency. Implements health-check workflows with live status visualization for operational debugging.', tech: ['React.js', 'Node.js', 'Express.js', 'Axios'], github: 'https://github.com/drishti2904/api-health-checker' },
    { title: 'Weather App', desc: 'Real-time weather dashboard using OpenWeatherMap API. Displays temperature, humidity, wind speed, and weather conditions.', tech: ['React.js', 'OpenWeatherMap API', 'Axios', 'CSS'], github: 'https://github.com/drishti2904/WeatherApp_using_react' },
    { title: 'Spotify UI Clone', desc: 'Front-end clone of Spotify Web Player with responsive design, sidebar navigation, and music player controls.', tech: ['HTML5', 'CSS3', 'JavaScript', 'FontAwesome'], github: 'https://github.com/drishti2904/Spotify_UI_Clone' },
    { title: 'Student Performance Analysis', desc: 'Data analysis project identifying academic performance trends using Python libraries for visualization and statistical analysis.', tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'], github: 'https://github.com/drishti2904' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (Demo mode)');
    setFormData({ name: '', email: '', message: '' });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50" style={{ fontFamily: "'Courier New', monospace" }}>
        <StarField />
        <div className="relative z-10 text-center">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 112" style={{ animation: 'spin 2s linear infinite' }}>
              <circle cx="56" cy="56" r="50" fill="none" stroke="url(#grad)" strokeWidth="2" strokeDasharray="314" strokeDashoffset={314 - (314 * loadPct) / 100} strokeLinecap="round" />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white">{loadPct}%</span>
            </div>
          </div>
          <p className="text-cyan-400 text-sm tracking-[0.3em] mb-2">INITIALIZING</p>
          <div className="w-64 h-px bg-gray-800 mx-auto overflow-hidden rounded-full">
            <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-200 rounded-full" style={{ width: `${loadPct}%` }} />
          </div>
          <p className="text-gray-600 text-xs mt-3 tracking-widest">DRISHTI.PORWAL.EXE</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Sora', 'Segoe UI', sans-serif" }}>
      <StarField />
      <CursorGlow />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${navScrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-purple-900/10' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">DP</span>
            <span className="text-white/20 ml-1 text-sm font-normal tracking-widest">// dev</span>
          </a>
          <div className="flex gap-8 items-center">
            {['Home', 'About', 'Skills', 'Projects', 'Resume', 'Contact'].map((item, i) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className={`text-sm tracking-wide relative transition-all duration-300 hover:text-white nav-link ${activeSection === item.toLowerCase() ? 'text-white' : 'text-gray-500'}`}
                style={{ transitionDelay: `${i * 30}ms` }}>
                <span className="text-purple-500/50 text-xs mr-1">0{i + 1}.</span>{item}
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0'}`} />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black/0 to-black z-0 pointer-events-none" />
        <div className="relative z-10 text-center max-w-4xl w-full">

          {/* Profile Image */}
          <div className="mb-10 flex justify-center hero-image-wrapper">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-spin-slow" />
              <div className="relative w-44 h-44 rounded-full overflow-hidden border border-white/10 bg-black">
                <img src={profileImage} alt="Drishti Porwal" className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-5xl font-bold bg-gradient-to-br from-purple-400 to-cyan-400 bg-clip-text text-transparent">DP</div>';
                  }} />
              </div>
            </div>
          </div>

          {/* Name with glitch */}
          <div className="mb-4 hero-name">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              <span className="glitch-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent" data-text="Drishti Porwal">
                Drishti Porwal
              </span>
            </h1>
          </div>

          {/* Typewriter */}
          <div className="h-10 flex items-center justify-center mb-6">
            <span className="text-lg md:text-2xl font-light text-cyan-400 tracking-widest font-mono">
              &lt; {typeText}<span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 animate-blink align-middle" /> /&gt;
            </span>
          </div>

          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed hero-sub">
            Building scalable software solutions and crafting<br className="hidden md:block" />
            seamless digital experiences from the ground up.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-10 hero-btns">
            <a href="#projects" className="magnetic-btn px-7 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-sm font-semibold tracking-wide hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105">
              View Projects ↗
            </a>
            <a href="#contact" className="magnetic-btn px-7 py-3 border border-white/20 rounded-full text-sm font-semibold tracking-wide hover:bg-white/5 hover:border-purple-400/50 transition-all duration-300">
              Say Hello
            </a>
          </div>

          <div className="flex gap-5 justify-center">
            {[
              { href: 'https://github.com/drishti2904', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
              { href: 'https://linkedin.com/in/drishti-porwal-272001255', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
              { href: 'mailto:drishtiporwal345@gmail.com', icon: <Mail className="w-5 h-5" />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2 text-gray-500 hover:text-white transition-all duration-300">
                <span className="group-hover:scale-110 transition-transform duration-200">{icon}</span>
                <span className="text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-1">{label}</span>
              </a>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-slow">
            <span className="text-gray-600 text-xs tracking-widest">SCROLL</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-purple-500 text-sm font-mono tracking-widest">02.</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">About Me</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-4" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden border border-white/5 p-8 bg-white/2"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.05) 0%, rgba(0,0,0,0) 50%, rgba(34,211,238,0.04) 100%)' }}>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

              {[
                "I'm a passionate Software Engineer and Full-Stack Developer pursuing B.Tech in Computer Science at Graphic Era University. My journey in software engineering encompasses building robust, scalable applications and solving complex computational problems through elegant code.",
                "I specialize in the complete software development lifecycle—from requirements analysis and system design to implementation, testing, and deployment. With expertise in React.js, Node.js, and MongoDB, I maintain strong software engineering principles like SOLID, DRY, and clean architecture.",
                "I'm particularly interested in distributed systems, real-time applications, cloud technologies, microservices architecture, and leveraging data analytics to drive intelligent decision-making.",
              ].map((p, i) => (
                <p key={i} className="text-gray-400 leading-relaxed mb-5 last:mb-0">{p}</p>
              ))}

              <div className="grid md:grid-cols-3 gap-5 mt-10">
                {[
                  { icon: <Award className="w-8 h-8 text-purple-400" />, title: 'Top 30 Finalist', sub: 'MariTHON 2025 Hackathon', color: 'purple' },
                  { icon: <Code className="w-8 h-8 text-cyan-400" />, title: '10+ Projects', sub: 'Full-Stack Applications', color: 'cyan' },
                  { icon: <BookOpen className="w-8 h-8 text-pink-400" />, title: 'Problem Solver', sub: 'DSA & System Design', color: 'pink' },
                ].map(({ icon, title, sub, color }) => (
                  <div key={title} className={`group p-5 rounded-xl border border-${color}-500/15 hover:border-${color}-500/40 bg-black/30 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-${color}-500/10`}>
                    <div className="flex justify-center mb-3">{icon}</div>
                    <h3 className="font-bold text-white mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="text-purple-500 text-sm font-mono tracking-widest">03.</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Skills</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-4" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {[
              { key: 'frontend', label: 'Frontend', icon: <Code className="w-5 h-5" />, color: 'purple', items: skills.frontend },
              { key: 'backend', label: 'Backend', icon: <Database className="w-5 h-5" />, color: 'cyan', items: skills.backend },
              { key: 'tools', label: 'Tools', icon: <Wrench className="w-5 h-5" />, color: 'pink', items: skills.tools },
            ].map(({ key, label, icon, color, items }, ci) => (
              <Reveal key={key} delay={ci * 0.1} className="h-full">
                <div className={`group relative rounded-2xl border border-${color}-500/20 hover:border-${color}-500/50 bg-black/40 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-${color}-500/10 overflow-hidden h-full flex flex-col`}>
                  <div className={`absolute inset-0 bg-gradient-to-br from-${color}-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`text-${color}-400`}>{icon}</span>
                      <h3 className={`font-bold text-${color}-400 tracking-wide`}>{label}</h3>
                    </div>
                    {/* Fixed 2-column icon grid so all cards have same visual density */}
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      {items.map((skill) => (
                        <div key={skill.name} className="flex flex-col items-center gap-2 group/skill">
                          <div className={`w-full aspect-square max-w-[72px] mx-auto p-3 rounded-xl border border-${color}-500/20 hover:border-${color}-500/50 bg-black/50 hover:bg-${color}-500/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center justify-center`}>
                            <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                          </div>
                          <span className={`text-xs text-gray-500 group-hover/skill:text-${color}-300 transition-colors text-center`}>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="text-purple-500 text-sm font-mono tracking-widest">04.</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Projects</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-4" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 0.08}>
                <div className="group relative h-full rounded-2xl border border-white/5 hover:border-purple-500/30 bg-black/40 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/50 transition-all duration-500" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-purple-500/50 font-mono text-sm">0{idx + 1}.</span>
                      <Code className="w-5 h-5 text-gray-700 group-hover:text-cyan-500 transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-5 group-hover:text-gray-400 transition-colors">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-mono text-purple-400/70 border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 border-t border-white/5 pt-4">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-cyan-400/70 hover:text-cyan-300 transition-colors group/link">
                          <ExternalLink className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />Live
                        </a>
                      )}
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-purple-400/70 hover:text-purple-300 transition-colors group/link">
                        <Github className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Resume */}
      <section id="resume" className="relative py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="text-purple-500 text-sm font-mono tracking-widest">05.</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Resume</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-4" />
            </div>
          </Reveal>

          {/* Download CTA */}
          <Reveal delay={0.05}>
            <div className="relative rounded-2xl overflow-hidden border border-white/5 p-8 mb-10 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(0,0,0,0) 50%, rgba(34,211,238,0.06) 100%)' }}>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <div className="mb-5">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Drishti Porwal — Resume</h3>
                <p className="text-gray-500 text-sm mb-6">B.Tech CSE · Full-Stack Developer · Software Engineer</p>
                <a
                  href="/Resume_drishti.pdf"
                  download
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-sm font-semibold tracking-wide hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 group"
                >
                  <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="space-y-6">
            {/* Education */}
            <Reveal delay={0.1}>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">Education</h3>
                  <div className="flex-1 h-px bg-cyan-500/20" />
                </div>
                <div className="relative pl-6 border-l border-white/10">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-cyan-500/60 border-2 border-black" />
                  <div className="group p-5 rounded-xl border border-white/5 hover:border-cyan-500/20 bg-black/30 hover:bg-cyan-500/5 transition-all duration-300">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                      <h4 className="font-bold text-white">B.Tech — Computer Science & Engineering</h4>
                      <span className="text-xs font-mono text-cyan-500/70 bg-cyan-500/10 px-2.5 py-1 rounded-full">2022 – 2026</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Graphic Era University, Dehradun</p>
                    <p className="text-gray-600 text-xs">Data Structures · Algorithms · DBMS · OS · System Design · Computer Networks</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Experience / Achievements */}
            <Reveal delay={0.15}>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Award className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-semibold text-purple-400 tracking-widest uppercase">Achievements</h3>
                  <div className="flex-1 h-px bg-purple-500/20" />
                </div>
                <div className="relative pl-6 border-l border-white/10 space-y-4">
                  {[
                    { title: 'Top 30 Finalist — MariTHON 2025', org: 'National Level Hackathon', date: '2025', desc: 'Selected among top 30 teams out of 500+ participants in a national-level hackathon.' },
                    { title: 'Full-Stack Development', org: 'Self-directed Projects', date: '2023 – Present', desc: 'Built 10+ production-level full-stack applications covering real-time, e-commerce, and data domains.' },
                  ].map((item, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-7 top-1.5 w-3 h-3 rounded-full bg-purple-500/60 border-2 border-black" />
                      <div className="group p-5 rounded-xl border border-white/5 hover:border-purple-500/20 bg-black/30 hover:bg-purple-500/5 transition-all duration-300">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                          <h4 className="font-bold text-white text-sm">{item.title}</h4>
                          <span className="text-xs font-mono text-purple-500/70 bg-purple-500/10 px-2.5 py-1 rounded-full">{item.date}</span>
                        </div>
                        <p className="text-gray-400 text-xs mb-2">{item.org}</p>
                        <p className="text-gray-600 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="text-purple-500 text-sm font-mono tracking-widest">06.</span>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-4" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12">
            <Reveal delay={0.05}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Let's build something<br /><span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">remarkable together.</span></h3>
                <p className="text-gray-500 mb-10 leading-relaxed text-sm">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Reach out — I'd love to connect.
                </p>
                <div className="space-y-5">
                  {[
                    { href: 'mailto:drishtiporwal345@gmail.com', icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'drishtiporwal345@gmail.com', color: 'purple' },
                    { href: 'https://github.com/drishti2904', icon: <Github className="w-4 h-4" />, label: 'GitHub', value: '@drishti2904', color: 'cyan' },
                    { href: 'https://linkedin.com/in/drishti-porwal-272001255', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', value: 'Drishti Porwal', color: 'purple' },
                  ].map(({ href, icon, label, value, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`group flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-${color}-500/30 hover:bg-${color}-500/5 transition-all duration-300`}>
                      <div className={`w-9 h-9 flex items-center justify-center rounded-lg bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform`}>
                        {icon}
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs tracking-wide">{label}</p>
                        <p className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { type: 'text', placeholder: 'Your Name', key: 'name' },
                  { type: 'email', placeholder: 'Your Email', key: 'email' },
                ].map(({ type, placeholder, key }) => (
                  <input key={key} type={type} placeholder={placeholder} value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} required
                    className="w-full px-5 py-3.5 bg-black/60 border border-white/8 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all duration-300"
                    style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
                ))}
                <textarea placeholder="Your Message" value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows="5" required
                  className="w-full px-5 py-3.5 bg-black/60 border rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all duration-300 resize-none"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
                <button type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-sm font-semibold tracking-wide hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
                  <span className="relative z-10">Send Message →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-gray-700 text-sm">© 2026 <span className="text-gray-500">Drishti Porwal</span></span>
          <span className="text-gray-700 text-xs font-mono tracking-widest">BUILT WITH REACT ✦ TAILWIND</span>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&display=swap');

        html { scroll-behavior: smooth; cursor: none; }
        * { cursor: none !important; }

        @keyframes twinkle {
          from { opacity: 0.1; transform: scale(0.8); }
          to { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes drift-slow {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes drift-slow2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-25px, 15px) scale(0.95); }
        }
        @keyframes drift-slow3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(15px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 10px) scale(0.9); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(8px) translateX(-50%); }
        }
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(-3px, 0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(3px, 0); }
          40% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 0); }
          60% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 0); }
          80% { clip-path: inset(10% 0 80% 0); transform: translate(-1px, 0); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(100% 0 0% 0); transform: translate(3px, 0); }
          20% { clip-path: inset(60% 0 20% 0); transform: translate(-3px, 0); }
          40% { clip-path: inset(30% 0 50% 0); transform: translate(2px, 0); }
          60% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 0); }
          80% { clip-path: inset(80% 0 10% 0); transform: translate(1px, 0); }
        }

        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-drift-slow { animation: drift-slow 12s ease-in-out infinite; }
        .animate-drift-slow2 { animation: drift-slow2 15s ease-in-out infinite; }
        .animate-drift-slow3 { animation: drift-slow3 18s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 2.5s ease-in-out infinite; }

        /* Glitch effect */
        .glitch-text {
          position: relative;
          display: inline-block;
        }
        .glitch-text:hover::before,
        .glitch-text:hover::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          background: inherit;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glitch-text:hover::before {
          color: #a855f7;
          -webkit-text-fill-color: #a855f7;
          background: none;
          animation: glitch-1 0.4s steps(1) infinite;
          opacity: 0.7;
        }
        .glitch-text:hover::after {
          color: #22d3ee;
          -webkit-text-fill-color: #22d3ee;
          background: none;
          animation: glitch-2 0.4s steps(1) infinite;
          opacity: 0.7;
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #a855f7, #22d3ee); border-radius: 2px; }

        /* Hero entrance */
        .hero-image-wrapper { animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-name { animation: slideDown 0.8s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-sub { animation: slideDown 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-btns { animation: slideDown 0.8s 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Nav link hover */
        .nav-link:hover { color: white; }
      `}</style>
    </div>
  );
};

export default SpacePortfolio;