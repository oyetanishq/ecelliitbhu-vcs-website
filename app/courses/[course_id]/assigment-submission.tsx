"use client";

import { FormEvent, useState } from "react";

interface AssignmentSubmissionParams {
    course_id: string;
}

export default function AssignmentSubmission({ course_id }: AssignmentSubmissionParams) {
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [submissionLink, setSubmissionLink] = useState("");

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setUploading(true);

        const formData = new FormData(event.currentTarget);
        const assignment_file = formData.get("assignment_file") as File;

        const body = new FormData();
        body.append("course_id", course_id);
        body.append("assignment_file", assignment_file);

        await fetch("/api/assignment", {
            method: "POST",
            body,
        })
            .then(async (res) => {
                return { success: res.status === 201, data: await res.json() };
            })
            .then(({ success, data }) => {
                if (success) {
                    setSubmissionLink(data.url);
                    setError("");
                    window.location.reload();
                } else {
                    setError(data.error);
                    setSubmissionLink("");
                }
            })
            .finally(() => setUploading(false));
    };

    return (
        <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 shadow-lg space-y-4 mt-4 text-white">
            {uploading && <span>Uploading...</span>}
            {error && <span className="text-red-500">Error: {error}</span>}
            {submissionLink && (
                <span className="text-green-400">
                    Submitted:{" "}
                    <a href={submissionLink} className="underline">
                        {submissionLink}
                    </a>
                </span>
            )}

            <form onSubmit={handleForm} className="space-y-4">
                <input
                    type="file"
                    name="assignment_file"
                    required
                    multiple={false}
                    className="w-full text-white file:bg-[#FF8C00] file:text-black file:rounded-full file:px-4 file:py-2 file:cursor-pointer hover:file:bg-[#FFA500] transition-all"
                />
                <button type="submit" className="px-6 py-2 rounded-full bg-[#FF8C00] text-black font-semibold hover:bg-[#FFA500] active:scale-95 transition-all shadow-sm">
                    Upload Assignment
                </button>
            </form>
        </div>
    );
}
