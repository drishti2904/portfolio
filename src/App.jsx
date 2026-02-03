import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Code, Database, Wrench, Award, BookOpen } from 'lucide-react';

const SpacePortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Add your local image path here
  // Place your image in the 'public' folder or 'src/assets' folder
  const profileImage = "/profile.jpg"; // For public folder: /profile.jpg
  // Or for assets folder: import profileImage from './assets/profile.jpg' at the top

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    frontend: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' }
    ],
    backend: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
    ],
    tools: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' }
    ]
  };

  const projects = [
    {
      title: 'Talkify',
      desc: 'Real-time chat and video communication platform with JWT authentication, typing indicators, and file sharing.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      live: 'https://talkify-5kpo.onrender.com/',
      github: 'https://github.com/drishti2904'
    },
    {
      title: 'TripLodger',
      desc: 'Full-stack travel accommodation platform connecting property owners with travelers. Features user auth and image management.',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Cloudinary'],
      live: 'https://triplodger-1.onrender.com/',
      github: 'https://github.com/drishti2904'
    },
    {
      title: 'Kanban Board',
      desc: 'Real-time collaborative task board with Smart Assign and conflict handling. Manages tasks across different statuses with live updates.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.IO', 'JWT'],
      live: 'https://kanban-board-gray-five.vercel.app/',
      github: 'https://github.com/drishti2904/KanbanBoard'
    },
    {
      title: 'Weather App',
      desc: 'Real-time weather dashboard using OpenWeatherMap API. Displays temperature, humidity, wind speed, and weather conditions.',
      tech: ['React.js', 'OpenWeatherMap API', 'Axios', 'CSS'],
      github: 'https://github.com/drishti2904/WeatherApp_using_react'
    },
    {
      title: 'Spotify UI Clone',
      desc: 'Front-end clone of Spotify Web Player with responsive design, sidebar navigation, and music player controls.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'FontAwesome'],
      github: 'https://github.com/drishti2904/Spotify_UI_Clone'
    },
    {
      title: 'Student Performance Analysis',
      desc: 'Data analysis project identifying academic performance trends using Python libraries for visualization and statistical analysis.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
      github: 'https://github.com/drishti2904'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (Demo mode)');
    setFormData({ name: '', email: '', message: '' });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 border-4 border-cyan-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Code className="w-12 h-12 text-purple-400 animate-pulse" />
            </div>
          </div>
          <p className="text-cyan-400 text-xl font-light tracking-widest animate-pulse">Loading Universe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      {/* Starfield Background */}
      <div className="fixed inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 3 + 2 + 's'
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md z-40 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            DP
          </a>
          <div className="flex gap-8">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-all duration-300 hover:text-cyan-400 ${
                  activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-400'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black z-0"></div>
        <div className="relative z-10 text-center max-w-4xl w-full">
          <div className="mb-8 flex justify-center">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-1 animate-pulse">
              <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                <img 
                  src={profileImage} 
                  alt="Drishti Porwal" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">DP</span>';
                  }}
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Drishti Porwal
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-cyan-400 mb-4 font-light">
            Software Engineer & Full-Stack Developer
          </p>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Building scalable software solutions and crafting seamless digital experiences
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/20 transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </a>
          </div>
          
          <div className="flex gap-6 justify-center mt-12">
            <a href="https://github.com/drishti2904" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/drishti-porwal-272001255" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:drishtiporwal345@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm a passionate Software Engineer and Full-Stack Developer pursuing B.Tech in Computer Science at 
              Graphic Era University. My journey in software engineering encompasses building robust, scalable applications 
              and solving complex computational problems through elegant code.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              As a software engineer, I specialize in the complete software development lifecycle—from requirements 
              analysis and system design to implementation, testing, and deployment. I build modern web applications 
              using React.js, Node.js, and MongoDB, while maintaining strong software engineering principles like 
              SOLID, DRY, and clean code architecture.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              With a strong foundation in data structures, algorithms, design patterns, and system design, I create 
              scalable and efficient solutions that prioritize performance, maintainability, and user experience. 
              My expertise extends to database design, RESTful API development, version control with Git, and agile 
              development methodologies.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm particularly interested in distributed systems, real-time applications, cloud technologies, 
              microservices architecture, and leveraging data analytics to drive intelligent decision-making. 
              I believe in continuous learning and staying current with emerging technologies and industry best practices.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-black/50 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <Award className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">Top 30 Finalist</h3>
                <p className="text-gray-400 text-sm">MariTHON 2025 Hackathon</p>
              </div>
              
              <div className="text-center p-6 bg-black/50 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <Code className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">10+ Projects</h3>
                <p className="text-gray-400 text-sm">Full-Stack Applications</p>
              </div>
              
              <div className="text-center p-6 bg-black/50 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">Problem Solver</h3>
                <p className="text-gray-400 text-sm">DSA & System Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-600/10 border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="flex items-center gap-4 mb-6">
                  <Code className="w-10 h-10 text-purple-400" />
                  <h3 className="text-2xl font-bold text-purple-400">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {skills.frontend.map(skill => (
                    <div key={skill.name} className="group relative flex flex-col items-center">
                      <div className="w-16 h-16 p-3 bg-purple-500/20 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-all hover:scale-110">
                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs mt-2 text-gray-400 group-hover:text-purple-300 transition-colors">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-600/10 border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="flex items-center gap-4 mb-6">
                  <Database className="w-10 h-10 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-cyan-400">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {skills.backend.map(skill => (
                    <div key={skill.name} className="group relative flex flex-col items-center">
                      <div className="w-16 h-16 p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/30 transition-all hover:scale-110">
                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain filter brightness-0 invert" />
                      </div>
                      <span className="text-xs mt-2 text-gray-400 group-hover:text-cyan-300 transition-colors">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-br from-pink-900/30 to-pink-600/10 border border-pink-500/30 rounded-2xl p-8 hover:border-pink-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                <div className="flex items-center gap-4 mb-6">
                  <Wrench className="w-10 h-10 text-pink-400" />
                  <h3 className="text-2xl font-bold text-pink-400">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {skills.tools.map(skill => (
                    <div key={skill.name} className="group relative flex flex-col items-center">
                      <div className="w-16 h-16 p-3 bg-pink-500/20 border border-pink-500/30 rounded-xl hover:bg-pink-500/30 transition-all hover:scale-110">
                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain filter brightness-0 invert" />
                      </div>
                      <span className="text-xs mt-2 text-gray-400 group-hover:text-pink-300 transition-colors">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
                      {project.title}
                    </h3>
                    <Code className="w-6 h-6 text-purple-400" />
                  </div>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.live && (
                      <a href={project.live} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Live Demo</span>
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                      <Github className="w-4 h-4" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Let's Connect</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-4">
                <a href="mailto:drishtiporwal345@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">drishtiporwal345@gmail.com</p>
                  </div>
                </a>
                
                <a href="https://github.com/drishti2904" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">GitHub</p>
                    <p className="font-semibold">@drishti2904</p>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/drishti-porwal-272001255" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">LinkedIn</p>
                    <p className="font-semibold">Drishti Porwal</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-black/50 border border-purple-500/30 rounded-xl focus:border-cyan-500/50 focus:outline-none text-white placeholder-gray-500 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 bg-black/50 border border-purple-500/30 rounded-xl focus:border-cyan-500/50 focus:outline-none text-white placeholder-gray-500 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    className="w-full px-6 py-4 bg-black/50 border border-purple-500/30 rounded-xl focus:border-cyan-500/50 focus:outline-none text-white placeholder-gray-500 transition-colors resize-none"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © 2026 Drishti Porwal.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default SpacePortfolio;