import React, { useState, useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const projects = [
  {
    title: "3D Solar System Simulator",
    description: "An interactive, physics-driven planetary simulator rendered directly in the browser.",
    tech: ["MERN Stack", "Three.js", "React"],
    link: "https://github.com/samybit/solar-orbital-engine"
  },
  {
    title: "Terminal Ledger",
    description: "A lightning-fast, command-line personal finance manager and expense tracker built for speed.",
    tech: ["C", "CLI", "Linux"],
    link: "https://github.com/samybit/cli-expense-tracker"
  },
  {
    title: "Vanilla Storefront",
    description: "A raw, dependency-free e-commerce experience built entirely from scratch without frameworks.",
    tech: ["Vanilla JS", "DOM API", "CSS"],
    link: "https://github.com/samybit/vanilla-js-ecommerce"
  },
  {
    title: "Lead Gen SaaS",
    description: "Production-ready automated e-commerce data extraction tool. Containerized and built for raw scraping performance.",
    tech: ["Flask", "Docker", "Pandas"],
    link: "https://github.com/samybit/lead-gen-tool"
  },
  {
    title: "BearBuzz Tracker",
    description: "Dual-interface Python engine tracking stock volatility. Dispatches automated SMS financial alerts. Backed by full CI/CD testing.",
    tech: ["Python", "Twilio API", "CI/CD"],
    link: "https://github.com/samybit/bearbuzz"
  },
  {
    title: "Progression Board",
    description: "Full-stack application engineered to log milestones and visually track completion percentages via a dynamic dashboard.",
    tech: ["Full-Stack", "Web", "UI/UX"],
    link: "https://github.com/samybit/game-completion-board"
  }
];

export default function App() {
  // --- PAGE ROUTING STATE ---
  const [activeView, setActiveView] = useState<"home" | "about" | "404">(() => {
    if (typeof window === "undefined") return "home";

    const search = window.location.search;
    const path = window.location.pathname;

    // 1. Check for GitHub Pages redirect
    if (search.includes("404=true")) return "404";

    // 2. Check for bad local/direct paths (ignoring the root or the repo name)
    const validPaths = ["/", "/brutalist-portfolio", "/brutalist-portfolio/"];
    if (!validPaths.includes(path)) return "404";

    return "home";
  });

  // --- MOBILE CURSOR FIX ---
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Only show the custom cursor on screens 768px or wider
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // Check immediately on load

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- DYNAMIC TAB TITLE LOGIC ---
  useEffect(() => {
    if (activeView === "home") {
      document.title = "Samy Barsoum - Work";
    } else if (activeView === "about") {
      document.title = "Samy Barsoum - About";
    } else if (activeView === "404") {
      document.title = "404 - Transmission Lost";
    }
  }, [activeView]);

  // --- FORM STATE ---
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string, email?: string, message?: string }>({});

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newErrors: { name?: string, email?: string, message?: string } = {};

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name.trim()) newErrors.name = "IDENTIFICATION REQUIRED.";
    if (!email.trim()) {
      newErrors.email = "EMAIL ADDRESS REQUIRED.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "INVALID EMAIL FORMAT.";
    }
    if (!message.trim()) newErrors.message = "TRANSMISSION CANNOT BE EMPTY.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setFormStatus("submitting");

    // WEB3FORMS
    formData.append("access_key", "fa441d0e-c6d1-41e5-9fd2-7e80b5658873");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("success");
        event.currentTarget.reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  const routeHome = () => {
    // Determine the base path depending on the environment
    const basePath = window.location.pathname.startsWith('/brutalist-portfolio')
      ? '/brutalist-portfolio/'
      : '/';
    window.history.replaceState({}, document.title, basePath);
    setActiveView("home");
  };

  return (
    <div className="min-h-screen bg-bgBrand text-foreground p-8 selection:bg-mainBrand selection:text-white">

      {/* Custom cursor - Only render if on desktop device */}
      {isDesktop && (
        <AnimatedCursor
          innerSize={20}
          outerSize={0}
          color="255, 51, 102"
          innerScale={1.5}
          clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'button',
            'textarea',
            'label'
          ]}
          innerStyle={{
            borderRadius: '0',
            border: '3px solid #000'
          }}
        />
      )}

      {/* --- RESPONSIVE NAVBAR --- */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-8 border-foreground pb-6 mb-12 md:mb-20 gap-6 sm:gap-0">
        <h1
          className="text-5xl md:text-4xl font-heading font-black uppercase leading-none tracking-tighter hover:text-mainBrand transition-colors glitch-hover"
          data-text="Samy.Dev"
          onClick={routeHome}
        >
          Samy<span className="text-mainBrand">.</span>Dev
        </h1>

        <nav className="flex flex-wrap gap-4 sm:gap-6 font-sans font-bold uppercase text-base w-full sm:w-auto border-t-4 border-foreground pt-4 sm:border-none sm:pt-0">
          <button
            onClick={routeHome}
            className={`underline decoration-4 underline-offset-4 transition-colors hover:text-mainBrand ${activeView === "home" ? "text-mainBrand" : "text-foreground"}`}
          >
            Work
          </button>

          <button
            onClick={() => setActiveView("about")}
            className={`underline decoration-4 underline-offset-4 transition-colors hover:text-mainBrand ${activeView === "about" ? "text-mainBrand" : "text-foreground"}`}
          >
            About
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              if (activeView !== "home") {
                e.preventDefault();
                routeHome();
                setTimeout(() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
            className="hover:text-mainBrand underline decoration-4 underline-offset-4 transition-colors text-foreground"
          >
            Contact
          </a>

          {/* Legacy Portfolio Link */}
          <a
            href="https://my-portfolio-seven-beta-98.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-mainBrand underline decoration-4 underline-offset-4 transition-colors text-foreground"
          >
            Archive
          </a>
        </nav>
      </header>

      {/* --- CONDITIONAL RENDERING LOGIC --- */}
      <main className="max-w-6xl mx-auto">

        {/* ========================================= */}
        {/* HOME VIEW                                 */}
        {/* ========================================= */}
        {activeView === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero Content */}
            <div className="mb-32">
              <h2 className="text-5xl sm:text-7xl md:text-9xl font-heading font-black uppercase leading-[0.85] mb-8 md:mb-10 break-words">
                Design <br /> Without <br /> <span className="italic text-mainBrand">Apology.</span>
              </h2>

              <p className="font-sans text-xl md:text-2xl max-w-xl font-bold mb-12 leading-tight">
                A developer building interfaces that demand attention through heavy borders and sharp typography.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-6 text-base font-bold rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-mainBrand text-white hover:bg-bgBrand hover:text-mainBrand"
                >
                  <a href="#contact">LET'S TALK</a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 text-base font-bold rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-bgBrand hover:text-mainBrand"
                >
                  <a href="/cv.pdf" download="Samy_CV.pdf">
                    DOWNLOAD CV
                  </a>
                </Button>
              </div>
            </div>

            {/* The Brutalist Marquee */}
            <div className="border-y-8 border-foreground bg-mainBrand text-white py-3 mb-32 overflow-hidden flex whitespace-nowrap -mx-8 md:mx-0">
              <div className="animate-marquee inline-block font-heading font-black text-2xl md:text-3xl uppercase tracking-widest">
                <span className="mx-6">/// OPEN TO FULL-TIME ROLES</span>
                <span className="mx-6">/// AVAILABLE FOR FREELANCE</span>
                {/* <span className="mx-6">/// NO APOLOGIES</span> */}

                <span className="mx-6">/// OPEN TO FULL-TIME ROLES</span>
                <span className="mx-6">/// AVAILABLE FOR FREELANCE</span>
                {/* <span className="mx-6">/// NO APOLOGIES</span> */}
              </div>
            </div>

            {/* Selected Work Section */}
            <section id="work" className="mb-32">
              <div className="flex items-center gap-6 mb-12">
                <div className="h-2 w-12 bg-foreground"></div>
                <h3 className="text-5xl font-heading font-black uppercase tracking-tight">Selected Work</h3>
                <div className="h-2 flex-grow bg-foreground"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all bg-white duration-200 group">
                      <CardHeader className="border-b-4 border-foreground bg-accent/20 p-6">
                        <CardTitle className="text-2xl font-heading font-black uppercase group-hover:text-mainBrand transition-colors">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow p-6">
                        <CardDescription className="font-sans text-lg text-foreground font-medium mb-6">
                          {project.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="rounded-none border-2 border-foreground font-sans font-bold uppercase text-xs px-3 py-1 bg-white"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-6 mt-auto">
                        <a href={project.link} target="_blank" rel="noreferrer" className="font-sans font-bold uppercase text-sm underline decoration-4 underline-offset-4 hover:text-mainBrand transition-colors">
                          View Project &rarr;
                        </a>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="mb-32">
              <div className="flex items-center gap-6 mb-12">
                <div className="h-2 w-12 bg-foreground"></div>
                <h3 className="text-5xl font-heading font-black uppercase tracking-tight">Initiate Contact</h3>
                <div className="h-2 flex-grow bg-foreground"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-5xl md:text-7xl font-heading font-black uppercase mb-8 leading-[0.85]">
                    Got a <br /> <span className="text-mainBrand">Project</span> <br /> in mind?
                  </h4>
                  <p className="font-sans text-2xl font-bold mb-8 max-w-md leading-tight">
                    I'm actively taking on new freelance clients and open to full-time roles. Drop a transmission below.
                  </p>

                  <div className="space-y-4 font-sans font-black uppercase text-xl mt-12 mb-12">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-mainBrand border-4 border-foreground"></div>
                      <p>Based in Egypt</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-foreground border-4 border-foreground"></div>
                      <p>Available Worldwide</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 font-sans font-bold uppercase underline decoration-4 underline-offset-4 text-xl">
                    <a href="https://upwork.com/freelancers/YOUR_PROFILE" target="_blank" rel="noreferrer" className="hover:text-mainBrand transition-colors">Upwork</a>
                    <a href="https://khamsat.com/user/YOUR_PROFILE" target="_blank" rel="noreferrer" className="hover:text-mainBrand transition-colors">Khamsat</a>
                    <a href="https://mostaql.com/u/YOUR_PROFILE" target="_blank" rel="noreferrer" className="hover:text-mainBrand transition-colors">Mostaql</a>
                  </div>
                </motion.div>

                <motion.form
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border-8 border-foreground p-8 md:p-12 shadow-brutal-lg flex flex-col gap-6"
                  onSubmit={onSubmit}
                  noValidate
                >
                  <div className="space-y-3">
                    <Label htmlFor="name" className="font-sans font-black uppercase text-xl">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="JOHN DOE"
                      className={`rounded-none border-4 h-16 text-xl font-bold font-sans focus-visible:ring-0 focus-visible:bg-accent/10 bg-bgBrand transition-colors ${errors.name ? 'border-mainBrand focus-visible:border-mainBrand' : 'border-foreground focus-visible:border-mainBrand'}`}
                    />
                    {errors.name && <p className="text-mainBrand font-bold font-sans uppercase text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="font-sans font-black uppercase text-xl">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="JOHN@DOE.COM"
                      className={`rounded-none border-4 h-16 text-xl font-bold font-sans focus-visible:ring-0 focus-visible:bg-accent/10 bg-bgBrand transition-colors ${errors.email ? 'border-mainBrand focus-visible:border-mainBrand' : 'border-foreground focus-visible:border-mainBrand'}`}
                    />
                    {errors.email && <p className="text-mainBrand font-bold font-sans uppercase text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="font-sans font-black uppercase text-xl">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="TELL ME ABOUT YOUR PROJECT..."
                      className={`rounded-none border-4 min-h-[200px] text-xl font-bold font-sans focus-visible:ring-0 focus-visible:bg-accent/10 bg-bgBrand resize-none transition-colors p-4 ${errors.message ? 'border-mainBrand focus-visible:border-mainBrand' : 'border-foreground focus-visible:border-mainBrand'}`}
                    />
                    {errors.message && <p className="text-mainBrand font-bold font-sans uppercase text-sm">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={formStatus === "submitting"}
                    className="w-full h-20 mt-6 text-lg sm:text-xl md:text-2xl font-black rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-mainBrand text-white hover:bg-bgBrand hover:text-mainBrand disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "idle" && "SEND TRANSMISSION"}
                    {formStatus === "submitting" && "SENDING..."}
                    {formStatus === "success" && "TRANSMISSION SENT!"}
                    {formStatus === "error" && "ERROR. TRY AGAIN."}
                  </Button>
                </motion.form>
              </div>
            </section>
          </motion.div>
        )}

        {/* ========================================= */}
        {/* ABOUT VIEW                                */}
        {/* ========================================= */}
        {activeView === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="pb-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Left Column: Bio */}
              <div className="lg:col-span-7 space-y-8">
                <h2 className="text-7xl md:text-9xl font-heading font-black uppercase leading-[0.85] mb-8">
                  About <br /> <span className="text-mainBrand">Me.</span>
                </h2>

                <div className="font-sans text-xl md:text-2xl font-bold space-y-6 max-w-2xl border-l-8 border-mainBrand pl-6">
                  <p>
                    I am a Full Stack Developer based in Egypt, bridging the gap between modern JavaScript interfaces and powerful Python backends.
                  </p>
                  <p>
                    My journey began with Python automation and scripting, building tools to scrape data and automate tasks. I then expanded into full-stack development, mastering the MERN stack to engineer dynamic applications.
                  </p>
                  <p>
                    Today, I focus on building complete, containerized applications using Docker, ensuring that what runs on my machine runs everywhere.
                  </p>
                  <p className="text-foreground/70 text-lg">
                    When I'm not coding, you can find me exploring retro tech, playing classic games, or experimenting with 3D web graphics.
                  </p>
                </div>
              </div>

              {/* Right Column: Education & Certs */}
              <div className="lg:col-span-5 space-y-12 mt-8 lg:mt-0">
                {/* Education */}
                <div>
                  <h3 className="text-3xl font-heading font-black uppercase tracking-tight border-b-4 border-foreground pb-2 mb-6">
                    Education
                  </h3>
                  <div className="bg-white border-4 border-foreground shadow-brutal-sm p-6">
                    <div className="flex justify-between items-start mb-4 flex-col sm:flex-row gap-2 sm:gap-0">
                      <div>
                        <h5 className="font-black font-sans uppercase text-xl">Bachelor of Commerce (B.B.A.)</h5>
                        <p className="font-sans font-bold text-mainBrand">Ain Shams University</p>
                      </div>
                      <Badge className="rounded-none border-2 border-foreground bg-bgBrand text-foreground font-black text-sm uppercase">2019 - 2023</Badge>
                    </div>
                    <p className="font-sans font-medium text-base">
                      Developed a foundation in logic, problem-solving, and a strategic mindset for system architecture. This allows me to translate business requirements into efficient, scalable technical solutions.
                    </p>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-3xl font-heading font-black uppercase tracking-tight border-b-4 border-foreground pb-2 mb-6">
                    Certifications
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white border-4 border-foreground p-4 flex items-center justify-between hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-brutal-sm">
                      <span className="font-black font-sans uppercase text-lg">MERN Stack & AI</span>
                      <span className="font-black font-sans text-mainBrand uppercase">ITI</span>
                    </div>
                    <div className="bg-white border-4 border-foreground p-4 flex items-center justify-between hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-brutal-sm">
                      <span className="font-black font-sans uppercase text-lg">Database Fundamentals</span>
                      <span className="font-black font-sans text-mainBrand uppercase">egFWD</span>
                    </div>
                    <div className="bg-white border-4 border-foreground p-4 flex items-center justify-between hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-brutal-sm">
                      <span className="font-black font-sans uppercase text-lg">CS50x</span>
                      <span className="font-black font-sans text-mainBrand uppercase">Harvard</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Technical Arsenal Grid */}
            <div className="mt-24">
              <div className="flex items-center gap-6 mb-12">
                <div className="h-2 w-12 bg-foreground"></div>
                <h3 className="text-5xl font-heading font-black uppercase tracking-tight">Technical Arsenal</h3>
                <div className="h-2 flex-grow bg-foreground"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Frontend */}
                <Card className="rounded-none border-4 border-foreground shadow-brutal bg-white">
                  <CardHeader className="border-b-4 border-foreground bg-mainBrand text-white p-4">
                    <CardTitle className="font-heading font-black uppercase text-2xl">Frontend & UI</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-wrap gap-3">
                    {["React.js", "Angular", "JavaScript (ES6+)", "HTML5 & CSS3", "Bootstrap 5", "Figma"].map(skill => (
                      <Badge key={skill} variant="outline" className="rounded-none border-2 border-foreground font-sans font-bold uppercase text-sm px-3 py-1 bg-bgBrand">{skill}</Badge>
                    ))}
                  </CardContent>
                </Card>

                {/* Backend */}
                <Card className="rounded-none border-4 border-foreground shadow-brutal bg-white">
                  <CardHeader className="p-4">
                    <CardTitle className="font-heading font-black uppercase text-2xl text-mainBrand">Backend & Database</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-wrap gap-3">
                    {["Python", "Node.js", "Express.js", "Flask", "MongoDB", "WTForms"].map(skill => (
                      <Badge key={skill} variant="outline" className="rounded-none border-2 border-foreground font-sans font-bold uppercase text-sm px-3 py-1 bg-bgBrand">{skill}</Badge>
                    ))}
                  </CardContent>
                </Card>

                {/* DevOps */}
                <Card className="rounded-none border-4 border-foreground shadow-brutal bg-white">
                  <CardHeader className="p-4">
                    <CardTitle className="font-heading font-black uppercase text-2xl text-mainBrand">DevOps & Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-wrap gap-3">
                    {["Docker", "Git / GitHub", "Linux OS", "Nexus Repo Manager"].map(skill => (
                      <Badge key={skill} variant="outline" className="rounded-none border-2 border-foreground font-sans font-bold uppercase text-sm px-3 py-1 bg-bgBrand">{skill}</Badge>
                    ))}
                  </CardContent>
                </Card>

                {/* Scripting */}
                <Card className="rounded-none border-4 border-foreground shadow-brutal bg-white">
                  <CardHeader className="border-b-4 border-foreground bg-mainBrand text-white p-4">
                    <CardTitle className="font-heading font-black uppercase text-2xl">Automation & Scripting</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-wrap gap-3">
                    {["Selenium", "BeautifulSoup", "Tkinter (GUI)", "REST APIs"].map(skill => (
                      <Badge key={skill} variant="outline" className="rounded-none border-2 border-foreground font-sans font-bold uppercase text-sm px-3 py-1 bg-bgBrand">{skill}</Badge>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================= */}
        {/* 404 ERROR VIEW                            */}
        {/* ========================================= */}
        {activeView === "404" && (
          <motion.div
            key="404"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >

            <h2
              className="text-[150px] md:text-[250px] font-heading font-black leading-none text-foreground mb-4 glitch-hover cursor-default"
              data-text="404"
            >
              4<span className="text-mainBrand">0</span>4
            </h2>

            <div className="bg-foreground text-background px-6 py-2 font-sans font-black uppercase text-2xl md:text-4xl tracking-widest mb-8">
              Transmission Lost
            </div>
            <p className="font-sans text-xl md:text-2xl font-bold max-w-lg mb-12">
              The coordinate you are looking for does not exist in this sector.
            </p>
            <Button
              onClick={routeHome}
              size="lg"
              className="h-16 px-10 text-xl font-bold rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-mainBrand text-white hover:bg-bgBrand hover:text-mainBrand"
            >
              RETURN TO BASE
            </Button>
          </motion.div>
        )}

      </main>

    </div>
  );
}