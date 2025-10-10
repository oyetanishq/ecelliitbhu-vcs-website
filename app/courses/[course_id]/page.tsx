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
    const reqCourse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/` + course_id);
    const course = (await reqCourse.json()) as Course | { error: string };

    if ("error" in course) return <div className="text-center text-red-400 mt-20 text-lg">course not found</div>;

    const session = await auth();

    const reqSubmission = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/assignment?course_id=${course_id}&user_email=${session?.user?.email ?? ""}`);
    const submission = (await reqSubmission.json()) as { error: string; data: null; message: null } | { message: string; data: any; error: null };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-lg text-white mt-28">
            {session && session.user && <div className="text-lg text-gray-300">Hello, {session.user.name}</div>}

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[#FF8C00]">{course.title}</h2>
                <p className="text-gray-300">{course.details}</p>
                <p className="text-gray-400">
                    {course.duration} • {course.price}
                </p>
            </div>

            {submission.data && (
                <div className="bg-zinc-900/80 backdrop-blur-md p-6 flex flex-col rounded-2xl border border-zinc-800 shadow-lg space-y-4 mt-4 text-white">
                    <span>submission already done</span>
                    <a
                        href={submission.data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 rounded-full bg-[#FF8C00] text-black font-semibold hover:bg-[#FFA500] active:scale-95 transition-all shadow-sm w-fit"
                    >
                        download file
                    </a>
                </div>
            )}

            {session && session.user && !("data" in submission) && <AssignmentSubmission course_id={course_id} />}

            {!session && <button className="px-6 py-2 rounded-full bg-[#FF8C00] text-black font-semibold hover:bg-[#FFA500] active:scale-95 transition-all shadow-sm">Enroll Now</button>}
        </div>
    );
}
