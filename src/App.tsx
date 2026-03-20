import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Data array for the grid
const projects = [
  {
    title: "Orbital: 3D Solar System",
    description: "An interactive, physics-driven planetary simulator rendered directly in the browser.",
    tech: ["MERN Stack", "Three.js", "React"],
    link: "#"
  },
  {
    title: "Terminal Ledger",
    description: "A lightning-fast, command-line personal finance manager and expense tracker.",
    tech: ["C", "CLI", "Make"],
    link: "#"
  },
  {
    title: "Storefront.js",
    description: "A raw, dependency-free e-commerce experience built entirely from scratch.",
    tech: ["Vanilla JS", "DOM API", "CSS3"],
    link: "#"
  }
];

export default function App() {
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

      {/* Hero Content */}
      <main className="max-w-6xl mx-auto">
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
            <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
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
      </main>
    </div>
  );
}