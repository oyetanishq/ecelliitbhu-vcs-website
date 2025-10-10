import { type Course } from "@/data/courses";
import { auth } from "@/auth";
import AssignmentSubmission from "./assigment-submission";

interface PageParams {
    course_id: string;
}

interface PageProps {
    params: Promise<PageParams>;
}

export default async function ParticularCourse({ params }: PageProps) {
    const { course_id } = await params;
    const req = await fetch("http://localhost:3000/api/courses/" + course_id);
    const course = (await req.json()) as Course | { error: string };

    if ("error" in course) return <div className="text-center text-red-400 mt-20 text-lg">
        course not found
        </div>;

    const session = await auth();

    return (
        // <div>
        //     {session && session.user && <div>helll,{session.user.name} </div>}
        //     <div>{JSON.stringify(course)}</div>

        //     {session && session.user && <AssignmentSubmission course_id={course_id} />}

        //     {!session && <button className="px-6 py-3 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-400 active:scale-95 transition-all">enroll now</button>}
        // </div>
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-lg text-white mt-28">
      {session && session.user && <div className="text-lg text-gray-300">Hello, {session.user.name}</div>}

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-[#FF8C00]">{course.title}</h2>
        <p className="text-gray-300">{course.details}</p>
        <p className="text-gray-400">{course.duration} • {course.price}</p>
      </div>

      {session && session.user && <AssignmentSubmission course_id={course_id} />}

      {!session && (
        <button className="px-6 py-2 rounded-full bg-[#FF8C00] text-black font-semibold hover:bg-[#FFA500] active:scale-95 transition-all shadow-sm">
          Enroll Now
        </button>
      )}
    </div>
    );
}
