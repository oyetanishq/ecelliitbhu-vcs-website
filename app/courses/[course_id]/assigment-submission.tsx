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
                } else {
                    setError(data.error);
                    setSubmissionLink("");
                }
            })
            .finally(() => setUploading(false));
    };

    return (
        <div>
            {uploading && <span>uploading...</span>}
            {error && <span>error: {error}</span>}
            {submissionLink && <span>submissionLink: {submissionLink}</span>}
            <form onSubmit={handleForm}>
                <input type="file" name="assignment_file" required multiple={false} />
                <button type="submit" className="px-4 py-2 border bg-orange-200 text-black hover:bg-orange-600 cursor-pointer duration-200 active:bg-orange-200">
                    upload assignment
                </button>
            </form>
        </div>
    );
}
