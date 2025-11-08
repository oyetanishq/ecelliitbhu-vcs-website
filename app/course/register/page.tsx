"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RegisterFormPage() {
    const [formData, setFormData] = useState({
        full_name: "",
        institution: "",
        current_year: "",
        course: "",
        branch: "",
        phone_number: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("/api/course/register", {
                method: "POST",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, course_id: "vc-course-iit-bhu-2025" }),
            });

            const data = await res.json();
            if (res.ok) {
                // redirect to course page after successful registration
                window.location.href = "/course";
            } else {
                alert("Registration failed: " + (data?.error || "unknown error"));
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred during registration");
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 hero-background">
            <div className="max-w-md w-full bg-card/80 backdrop-blur-md border border-border rounded-lg p-8 shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Course Registration</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name *</label>
                        <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full px-3 py-2 border border-border rounded bg-background" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Institution *</label>
                        <input type="text" name="institution" required value={formData.institution} onChange={handleChange} className="w-full px-3 py-2 border border-border rounded bg-background" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Current Year *</label>
                        <select name="current_year" required value={formData.current_year} onChange={handleChange} className="w-full px-3 py-2 border border-border rounded bg-background">
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="5th Year">5th Year</option>
                            <option value="Postgraduate">Postgraduate</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Course *</label>
                        <input
                            type="text"
                            name="course"
                            required
                            placeholder="e.g. B.Tech, M.Tech, etc."
                            value={formData.course}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-border rounded bg-background"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Branch *</label>
                        <input
                            type="text"
                            name="branch"
                            required
                            placeholder="e.g. Computer Science, Mechanical, etc."
                            value={formData.branch}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-border rounded bg-background"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number *</label>
                        <input
                            type="tel"
                            name="phone_number"
                            required
                            placeholder="+91 1234567890"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-border rounded bg-background"
                        />
                    </div>

                    <Button type="submit" disabled={submitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        {submitting ? "Registering..." : "Complete Registration"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
