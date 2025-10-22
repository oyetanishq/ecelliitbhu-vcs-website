import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// GET: which course the user is registered in
export async function GET(req: NextRequest, { params }: { params: Promise<Params> }): Promise<NextResponse> {
    const { id } = await params;

    // id is email in this route; look up registrations
    const { data, error } = await supabase.from("registrations").select("course_id").eq("user_email", id).single();

    if (error && error.code !== "PGRST116") return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ registered_course_id: data?.course_id ?? null });
}
