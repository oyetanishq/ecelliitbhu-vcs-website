import { COURSES } from "@/data/courses";

export interface Course {
    id: string;
    title: string;
    duration: string;
    price: string;
    short: string;
    details: string;
}

export async function GET(): Promise<Course[]> {
    return Response.json(COURSES) as never as Course[];
}
