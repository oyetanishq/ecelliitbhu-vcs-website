import { Course } from "@/app/api/courses/route";
import { auth } from "@/auth";

interface PageParams {
    course_id: string;
}

interface PageProps {
    params: PageParams;
}

const getCourse = async (course_id: string): Promise<Course | null> => {
    const req = await fetch("http://localhost:3000/api/courses");
    const res = (await req.json()) as Course[];

    return res.find((c) => c.id === course_id) || null;
};

export default async function ParticularCourse({ params }: PageProps) {
    const session = await auth();
    const course = await getCourse(params.course_id);

    if (!course) return <div>course not found</div>;

    return (
        <div>
            {session && session.user && <div>helll,{session.user.name} </div>}
            <div>{JSON.stringify(course)}</div>

            {session && session.user && (
                <div>
                    <form action="/api/assignment" method="POST" encType="multipart/form-data">
                        <input type="text" name="course_id" className="hidden" defaultValue={course.id} />
                        <input type="file" name="assignment_file" required multiple={false} />
                        <button type="submit" className="px-4 py-2 border bg-orange-200 text-black hover:bg-orange-600 cursor-pointer duration-200 active:bg-orange-200">
                            upload assignment
                        </button>
                    </form>
                </div>
            )}

            {!session && <button className="px-4 py-2 border bg-orange-200 text-black hover:bg-orange-600 cursor-pointer duration-200 active:bg-orange-200">enroll now</button>}
        </div>
    );
}
