
import { Course } from "@/data/courses";
import Link from "next/link";

export default async function Courses() {
  const res = await fetch("http://localhost:3000/api/courses");
  const courses = (await res.json()) as Course[];

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-10 bg-transparent text-white min-h-screen pt-28">
      <h2 className="text-3xl font-bold text-[#FF8C00] border-b border-[#FF8C00] pb-2">Courses</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {courses.map((c) => (
          <div
            key={c.id}
            id={c.id}
            className="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/80 backdrop-blur-md hover:border-[#FF8C00]/70 hover:shadow-lg hover:shadow-[#FF8C00]/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#FF8C00] group-hover:text-[#FFA500]">{c.title}</h3>
            <p className="text-gray-300 mb-4">{c.details}</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              {c.duration} • {c.price}
              <Link
                href={"/courses/" + c.id}
                className="px-4 py-1.5 bg-[#FF8C00] text-black font-semibold rounded-full hover:bg-[#FFA500] transition-all"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
