import { COURSES, type Course } from "@/data/courses";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<Course[]>> {
    return NextResponse.json(COURSES);
}
