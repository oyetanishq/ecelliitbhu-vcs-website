import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server
);

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session || !session.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();

        const file = formData.get("assignment_file") as File;
        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

        const course_id = formData.get("course_id") as string;
        if (!course_id) return NextResponse.json({ error: "Missing course_id" }, { status: 400 });

        // Convert file to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const fileData = new Uint8Array(arrayBuffer);

        // Upload to Supabase storage
        const fileName = `${course_id}/${session.user.email}-${file.name}`;

        const { data, error } = await supabase.storage.from("course-assignment").upload(`uploads/${fileName}`, fileData, { upsert: true });
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        // Generate signed URL (expires in 1 hour)
        const { data: signedData, error: signedError } = await supabase.storage.from("course-assignment").createSignedUrl(`uploads/${fileName}`, 3600); // 3600 = 1 hour
        if (signedError) return NextResponse.json({ error: signedError.message }, { status: 500 });

        return NextResponse.json({ url: signedData.signedUrl }, {status: 201});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
    }
}
