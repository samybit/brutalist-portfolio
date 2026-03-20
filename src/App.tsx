import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen bg-bgBrand text-foreground p-6 md:p-12 selection:bg-mainBrand selection:text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center border-b-4 border-foreground pb-4 mb-16">
        <div className="text-2xl font-heading font-black tracking-tighter uppercase">
          Samy.Dev
        </div>
        <Button
          variant="outline"
          className="font-sans font-bold border-2 border-foreground shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          Available for Work
        </Button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto mt-20 md:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Minimalist, crisp easing
          className="space-y-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black uppercase leading-[0.85] tracking-tight">
            Building <br />
            <span className="text-mainBrand">Digital</span> <br />
            Experiences.
          </h1>

          <p className="text-xl md:text-2xl font-sans max-w-2xl font-medium leading-relaxed pt-4">
            A showcase of sharp edges, heavy contrast, and uncompromising performance.
          </p>

          <div className="flex flex-wrap gap-6 pt-8">
            <Button
              size="lg"
              className="text-lg font-bold border-4 border-foreground shadow-brutal hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all bg-mainBrand text-white hover:bg-mainBrand"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg font-bold border-4 border-foreground shadow-brutal hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all bg-bgBrand"
            >
              Contact Me
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}