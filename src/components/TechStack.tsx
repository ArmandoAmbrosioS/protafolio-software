"use client"

export default function TechStack() {
  const technologies = [
    "Next.js", "React", "TypeScript", "Python", "Django",
    "FastAPI", "Docker", "Laravel", "PHP", "PostgreSQL",
    "AWS", "C#.NET", "Java", "GitHub", "Bootstrap", "Postman", "Node.js"
  ];

  const row = [...technologies, ...technologies];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-[#010101] overflow-hidden flex flex-col justify-center border-y border-zinc-200 dark:border-zinc-900 transition-colors duration-500 relative">

      <div className="relative w-full flex whitespace-nowrap overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-left">
          {row.map((tech, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-zinc-200 dark:text-zinc-800 transition-colors duration-500">
                {tech}
              </span>
              <span className="text-cyan-500 mx-8 text-4xl">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full flex whitespace-nowrap overflow-hidden mt-6">
        <div className="flex whitespace-nowrap animate-marquee-right">
          {[...row].reverse().map((tech, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-transparent [-webkit-text-stroke:1px_#d4d4d8] dark:[-webkit-text-stroke:1px_#52525b] transition-colors duration-500">
                {tech}
              </span>
              <span className="text-purple-500 mx-8 text-4xl">+</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-0 w-32 md:w-64 h-full bg-gradient-to-r from-zinc-50 dark:from-[#010101] to-transparent z-10 pointer-events-none transition-colors duration-500" />
      <div className="absolute right-0 top-0 w-32 md:w-64 h-full bg-gradient-to-l from-zinc-50 dark:from-[#010101] to-transparent z-10 pointer-events-none transition-colors duration-500" />
    </section>
  );
}
