import React, { useState } from "react";
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
  }
];

export default function App() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");

    // Grab the data from the form
    const formData = new FormData(event.currentTarget);

    // Web3Forms access key
    formData.append("access_key", "fa441d0e-c6d1-41e5-9fd2-7e80b5658873");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("success");
        event.currentTarget.reset(); // Clear the form fields
        setTimeout(() => setFormStatus("idle"), 5000); // Reset button after 5 seconds
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-bgBrand text-foreground p-8 selection:bg-mainBrand selection:text-white">
      {/* Brutalist Header */}
      <header className="flex justify-between items-end border-b-8 border-foreground pb-6 mb-20">
        <h1 className="text-4xl font-heading font-black uppercase leading-none tracking-tighter">
          Samy<span className="text-mainBrand">.</span>Dev
        </h1>
        <nav className="space-x-8 font-sans font-bold uppercase text-sm hidden md:block">
          <a href="#work" className="hover:text-mainBrand underline decoration-4 underline-offset-4">Work</a>
          <a href="#contact" className="hover:text-mainBrand underline decoration-4 underline-offset-4">Contact</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Hero Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-32"
        >
          <h2 className="text-7xl md:text-9xl font-heading font-black uppercase leading-[0.8] mb-10">
            Design <br /> Without <br /> <span className="italic text-mainBrand">Apology.</span>
          </h2>

          <p className="font-sans text-xl md:text-2xl max-w-xl font-bold mb-12 leading-tight">
            A developer building interfaces that demand attention through heavy borders and sharp typography.
          </p>

          <div className="flex gap-4">
            <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-mainBrand text-white hover:bg-mainBrand">
              LET'S TALK
            </Button>
          </div>
        </motion.div>

        {/* Selected Work Section */}
        <section id="work" className="mb-32">
          <div className="flex items-center gap-6 mb-12">
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
                <Card className="h-full flex flex-col rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all bg-white duration-200 cursor-pointer group">
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
                          className="rounded-none border-2 border-foreground font-sans font-bold uppercase text-xs px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <a href={project.link} className="font-sans font-bold uppercase text-sm underline decoration-4 underline-offset-4 hover:text-mainBrand transition-colors">
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

          <div className="flex gap-4 mb-8 font-sans font-bold uppercase underline decoration-4 underline-offset-4 text-lg">
            <a href="https://upwork.com/freelancers/YOUR_PROFILE" target="_blank" rel="noreferrer" className="hover:text-mainBrand transition-colors">Upwork</a>
            <a href="https://khamsat.com/user/YOUR_PROFILE" target="_blank" rel="noreferrer" className="hover:text-mainBrand transition-colors">Khamsat</a>
            <a href="https://mostaql.com/u/YOUR_PROFILE" target="_blank" rel="noreferrer" className="hover:text-mainBrand transition-colors">Mostaql</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-5xl md:text-7xl font-heading font-black uppercase mb-8 leading-[0.85]">
                Got a <br /> <span className="text-mainBrand">Project</span> <br /> in mind
              </h4>
              <p className="font-sans text-2xl font-bold mb-8 max-w-md leading-tight">
                I'm actively taking on new freelance clients and open to full-time roles. Drop a transmission below.
              </p>

              <div className="space-y-4 font-sans font-black uppercase text-xl mt-12">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-mainBrand border-4 border-foreground"></div>
                  <p>Based in Egypt</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-foreground border-4 border-foreground"></div>
                  <p>Available Worldwide</p>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border-8 border-foreground p-8 md:p-12 shadow-brutal-lg flex flex-col gap-6"
              onSubmit={onSubmit}
            >
              <div className="space-y-3">
                <Label htmlFor="name" className="font-sans font-black uppercase text-xl">Name</Label>
                <Input
                  id="name"
                  name="name" // Required for Web3Forms
                  required
                  placeholder="JOHN DOE"
                  className="rounded-none border-4 border-foreground h-16 text-xl font-bold font-sans focus-visible:ring-0 focus-visible:border-mainBrand focus-visible:bg-accent/10 bg-bgBrand transition-colors"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="font-sans font-black uppercase text-xl">Email</Label>
                <Input
                  id="email"
                  name="email" // Required for Web3Forms
                  type="email"
                  required
                  placeholder="JOHN@DOE.COM"
                  className="rounded-none border-4 border-foreground h-16 text-xl font-bold font-sans focus-visible:ring-0 focus-visible:border-mainBrand focus-visible:bg-accent/10 bg-bgBrand transition-colors"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="font-sans font-black uppercase text-xl">Message</Label>
                <Textarea
                  id="message"
                  name="message" // Required for Web3Forms
                  required
                  placeholder="TELL ME ABOUT YOUR PROJECT..."
                  className="rounded-none border-4 border-foreground min-h-[200px] text-xl font-bold font-sans focus-visible:ring-0 focus-visible:border-mainBrand focus-visible:bg-accent/10 bg-bgBrand resize-none transition-colors p-4"
                />
              </div>

              {/* Dynamic Button State */}
              <Button
                type="submit"
                size="lg"
                disabled={formStatus === "submitting"}
                className="w-full h-20 mt-6 text-2xl font-black rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-mainBrand text-white hover:bg-bgBrand hover:text-mainBrand disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === "idle" && "SEND TRANSMISSION"}
                {formStatus === "submitting" && "SENDING..."}
                {formStatus === "success" && "TRANSMISSION SENT!"}
                {formStatus === "error" && "ERROR. TRY AGAIN."}
              </Button>
            </motion.form>
          </div>
        </section>
      </main>
    </div>
  );
}