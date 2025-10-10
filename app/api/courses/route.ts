import { COURSES, type Course } from "@/data/courses";

export async function GET(): Promise<Course[]> {
    return Response.json(COURSES) as never as Course[];
}
