"use client";

import { useState } from "react";

type Props = {
    email: string;
};

export default function DeleteUser({ email }: Props) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete user ${email}? This action cannot be undone.`)) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/admin/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "same-origin",
                body: JSON.stringify({ user_email: email }),
            });
            const j = await res.json();
            if (res.ok && j?.ok) {
                alert("User deleted successfully");
                window.location.reload();
            } else {
                alert("Failed to delete user: " + (j?.error || "unknown"));
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while deleting user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleDelete} disabled={loading} className="px-2 py-1 rounded border border-red-500 text-red-500 hover:bg-red-500/20 text-sm disabled:opacity-50">
            {loading ? "..." : "Delete"}
        </button>
    );
}
