import { Course } from "@/app/api/courses/route";
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

    if ("error" in course) return <div>course not found</div>;

    const session = await auth();

    return (
        <div>
            {session && session.user && <div>helll,{session.user.name} </div>}
            <div>{JSON.stringify(course)}</div>

            {session && session.user && <AssignmentSubmission course_id={course_id} />}

            {!session && <button className="px-4 py-2 border bg-orange-200 text-black hover:bg-orange-600 cursor-pointer duration-200 active:bg-orange-200">enroll now</button>}
        </div>
    );
}
