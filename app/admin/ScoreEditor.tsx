"use client";

import { useState } from "react";

type Props = {
    userEmail: string;
    week: number;
    initialScore?: number | null;
};

export default function ScoreEditor({ userEmail, week, initialScore }: Props) {
    const [score, setScore] = useState<number | "">(initialScore ?? "");
    const [saving, setSaving] = useState(false);

    const save = async () => {
        setSaving(true);
        try {
            await fetch(`/api/admin/score`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_email: userEmail, week, score: score === "" ? null : Number(score) }),
            });
            // no explicit refresh; optimistic UI assumes success
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <input type="number" value={score as any} onChange={(e) => setScore(e.target.value === "" ? "" : Number(e.target.value))} className="w-20 input" placeholder="score" />
            <button onClick={save} disabled={saving} className="px-3 py-1 rounded bg-orange-500 text-white">
                {saving ? "Saving..." : "Save"}
            </button>
        </div>
    );
}
