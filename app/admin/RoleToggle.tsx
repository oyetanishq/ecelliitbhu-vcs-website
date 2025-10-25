"use client";

import { useState } from "react";

type Props = {
    email: string;
    currentRole: string;
};

export default function RoleToggle({ email, currentRole }: Props) {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(currentRole || "user");

    const toggle = async () => {
        setLoading(true);
        try {
            const newRole = role === "admin" ? "user" : "admin";
            const res = await fetch("/api/admin/role", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "same-origin",
                body: JSON.stringify({ user_email: email, role: newRole }),
            });
            const j = await res.json();
            if (res.ok && j?.ok) {
                setRole(newRole);
                // reload to reflect ordering or other updates
                window.location.reload();
            } else {
                console.error("Failed to update role", j);
                alert("Failed to update role: " + (j?.error || "unknown"));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={toggle} disabled={loading} className="px-2 py-1 rounded border text-sm">
            {loading ? "..." : role === "admin" ? "Demote" : "Promote"}
        </button>
    );
}
