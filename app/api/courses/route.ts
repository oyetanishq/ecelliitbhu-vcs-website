import { COURSES } from "@/data/courses";

export async function GET() {
    return Response.json(COURSES);
}
