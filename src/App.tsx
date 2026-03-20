import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen bg-bgBrand text-foreground p-8 selection:bg-mainBrand selection:text-white">
      {/* Brutalist Header */}
      <header className="flex justify-between items-end border-b-8 border-foreground pb-6 mb-20">
        <h1 className="text-4xl font-heading font-black uppercase leading-none tracking-tighter">
          Samy<span className="text-mainBrand">.</span>Dev
        </h1>
        <nav className="space-x-8 font-sans font-bold uppercase text-sm hidden md:block">
          <a href="#" className="hover:text-mainBrand underline decoration-4 underline-offset-4">Work</a>
          <a href="#" className="hover:text-mainBrand underline decoration-4 underline-offset-4">Process</a>
          <a href="#" className="hover:text-mainBrand underline decoration-4 underline-offset-4">Contact</a>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="max-w-6xl">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-7xl md:text-9xl font-heading font-black uppercase leading-[0.8] mb-10">
            Design <br /> Without <br /> <span className="italic text-mainBrand">Apology.</span>
          </h2>

          <p className="font-sans text-xl md:text-2xl max-w-xl font-bold mb-12 leading-tight">
            A MERN stack developer building interfaces that demand attention through heavy borders and sharp typography.
          </p>

          <div className="flex gap-4">
            <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-none border-4 border-foreground shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              LET'S TALK
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}