import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Code2, Gamepad2, Terminal } from "lucide-react";
import { useState } from "react";

/**
 * Modern Minimalist Tech Design
 * - Clean, professional layout with generous whitespace
 * - Teal accent color (#14b8a6) as visual thread
 * - Poppins for headings, Inter for body text
 * - Subtle hover effects and smooth transitions
 */

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"scratch" | "python" | "web">("scratch");
  const [pythonCode, setPythonCode] = useState("# Write Python code here\nprint('Hello, World!')");
  const [pythonOutput, setPythonOutput] = useState("");

  const handlePythonRun = async () => {
    try {
      const pyodide = await (window as any).loadPyodide?.();
      if (pyodide) {
        const output = await pyodide.runPythonAsync(pythonCode);
        setPythonOutput(String(output) || "Code executed successfully!");
      }
    } catch (error) {
      setPythonOutput(`Error: ${error}`);
    }
  };

  const handleProjectClick = (scrollTo: string | null) => {
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-accent rounded-full" />
            <h1 className="text-xl font-bold">Fernando C.</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
            <a href="#projects" className="text-sm font-medium hover:text-accent transition-colors">Projects</a>
            <a href="#skills" className="text-sm font-medium hover:text-accent transition-colors">Skills</a>
            <a href="#python" className="text-sm font-medium hover:text-accent transition-colors">Python</a>
            <a href="#contact" className="text-sm font-medium hover:text-accent transition-colors">Contact</a>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-start gap-4">
                <div className="w-1 h-16 bg-accent rounded-full mt-2" />
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">Fernando C.</h1>
                  <p className="text-xl text-accent font-semibold mb-4">Student Developer | Designer | Problem Solver</p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Welcome to my professional portfolio. This website showcases my coding projects, design work, and the skills I'm developing through technology and creative problem-solving.
                  </p>
                  <div className="flex gap-4">
                    <Button className="bg-accent hover:bg-accent/90">View My Work</Button>
                    <Button variant="outline">Get in Touch</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center border border-accent/20 float-subtle">
                <Code2 className="w-32 h-32 text-accent/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 border-b border-border">
        <div className="container max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-accent rounded-full" />
            <h2>About Me</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            My name is Fernando, and I'm a student passionate about coding, digital design, and creative technology. I enjoy building projects that combine problem-solving, logic, and imagination. This portfolio showcases my growth as a student creator and my journey into the world of technology.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Through hands-on projects and continuous learning, I've developed a strong foundation in web development, game design, and programming. I'm excited to explore new technologies and push the boundaries of what I can create.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 md:py-32 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1 h-12 bg-accent rounded-full" />
            <h2>Featured Projects</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Scratch Game Project",
                description: "A platformer game designed with logic, animation, and interactive controls.",
                tools: "Scratch",
                icon: Gamepad2,
                scrollTo: "games",
              },
              {
                title: "Python Program",
                description: "A coding project that helped me practice variables, logic, and debugging.",
                tools: "Python",
                icon: Terminal,
                scrollTo: "python",
              },
              {
                title: "Portfolio Website",
                description: "A personal website created to present my skills, projects, and goals.",
                tools: "HTML, CSS, JavaScript",
                icon: Code2,
                scrollTo: null,
              },
            ].map((project, idx) => {
              const Icon = project.icon;
              return (
                <div
                  key={idx}
                  className="card-hover p-8 bg-card border border-border rounded-xl"
                >
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <p className="text-sm font-semibold text-accent mb-6">Tools: {project.tools}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full cursor-pointer"
                    onClick={() => handleProjectClick(project.scrollTo)}
                  >
                    View Project
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1 h-12 bg-accent rounded-full" />
            <h2>Skills & Technologies</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "Scratch",
              "Python",
              "Debugging",
              "Problem Solving",
              "Creative Design",
            ].map((skill, idx) => (
              <div
                key={idx}
                className="card-hover p-4 bg-card border border-border rounded-lg text-center"
              >
                <span className="font-semibold text-accent">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Python Code Runner */}
      <section id="python" className="py-20 md:py-32 border-b border-border">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1 h-12 bg-accent rounded-full" />
            <h2>Python Code Runner</h2>
          </div>
          <p className="text-muted-foreground mb-8">Try running Python code directly in your browser! Write your code below and click "Run Code" to see the output.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold mb-2">Python Code</label>
              <textarea
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                className="w-full h-64 p-4 bg-card border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="# Write Python code here"
              />
              <Button
                onClick={handlePythonRun}
                className="mt-4 w-full bg-accent hover:bg-accent/90"
              >
                Run Code
              </Button>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Output</label>
              <div className="w-full h-64 p-4 bg-card border border-border rounded-lg font-mono text-sm overflow-auto">
                {pythonOutput ? (
                  <pre className="text-accent whitespace-pre-wrap break-words">{pythonOutput}</pre>
                ) : (
                  <p className="text-muted-foreground">Output will appear here...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scratch Game Section */}
      <section id="games" className="py-20 md:py-32 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1 h-12 bg-accent rounded-full" />
            <h2>My Scratch Creations</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Check out my latest Scratch games! These projects showcase my skills in game design, animation, and interactive storytelling. I'm constantly improving my coding abilities to create more complex and engaging experiences.
          </p>
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex justify-center mb-6">
              <div className="inline-flex gap-2 bg-secondary p-1 rounded-lg">
                {[
                  { id: "scratch", label: "Platformer" },
                  { id: "python", label: "Coming Soon" },
                  { id: "web", label: "Web Games" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                      activeTab === tab.id
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            {activeTab === "scratch" && (
              <div className="flex justify-center">
                <iframe
                  src="https://scratch.mit.edu/projects/1253706094/embed"
                  allowTransparency
                  width="485"
                  height="402"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  className="rounded-lg"
                  style={{ border: 'none' }}
                  {...({ allowtransparency: 'true' } as any)}
                />
              </div>
            )}
            {activeTab === "python" && (
              <p className="text-center text-muted-foreground">More games coming soon! Check back later.</p>
            )}
            {activeTab === "web" && (
              <p className="text-center text-muted-foreground">Web-based games will be featured here.</p>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="container max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-accent rounded-full" />
            <h2>Growth & Experience</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Through this course and my personal projects, I've learned how to plan projects, test ideas, fix errors, and continuously improve my work. I've also practiced explaining my thinking and presenting my projects in a professional manner.
          </p>
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="mb-6">Key Highlights</h3>
            <ul className="space-y-3">
              {[
                "Built coding projects using multiple digital tools",
                "Learned how to debug and improve programs",
                "Practiced presenting work clearly to others",
                "Developed stronger problem-solving and design skills",
                "Created interactive games and web applications",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-accent rounded-full" />
            <h2>Let's Connect</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            I'm always interested in new opportunities to learn, collaborate, and create. Whether you'd like to discuss my projects, offer feedback, or explore potential collaborations, feel free to reach out!
          </p>
          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <p className="font-semibold mb-2">Email</p>
            <a href="mailto:fernando_carrera@s.thevillageschool.com" className="text-accent hover:underline">
              fernando_carrera@s.thevillageschool.com
            </a>
          </div>
          <div className="flex gap-4">
            <Button className="bg-accent hover:bg-accent/90">Send Email</Button>
            <Button variant="outline">View Resume</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/50">
        <div className="container text-center text-muted-foreground">
          <p>Created by Fernando C. | Student Developer Portfolio</p>
          <p className="text-sm mt-2">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
