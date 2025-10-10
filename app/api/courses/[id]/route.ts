import { COURSES } from "@/data/courses";

export interface Course {
    id: string;
    title: string;
    duration: string;
    price: string;
    short: string;
    details: string;
}

interface Params {
    id: string;
}

export async function GET(_request: Request, { params }: { params: Promise<Params> }): Promise<Response> {
    const { id } = await params;
    const course = COURSES.find((course) => course.id === id);

    if (!course) return Response.json({ error: "Course not found" }, { status: 404 });

    return Response.json(course, { status: 200 });
}
