import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Registration({ COURSES }) {
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = location.state?.prefill || {};
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: prefill.course || "",
  });
  const [success, setSuccess] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess(form);
  }

  if (success)
    return (
      <main className="max-w-lg mx-auto p-8 text-center bg-transparent text-white min-h-screen flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-orange-500">
          Registration Successful!
        </h2>
        <p className="text-gray-300 mb-6">
          Thank you, <span className="font-semibold text-orange-400">{success.name}</span>.
          <br />
          A confirmation has been sent to{" "}
          <span className="text-orange-400">{success.email}</span>.
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="px-6 py-2 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-400 transition-colors mx-auto"
        >
          Back to Courses
        </button>
      </main>
    );

  return (
    <main className="max-w-lg mx-auto p-8 bg-transparent text-white min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-500 border-b-2 border-orange-600 pb-2">
        Register Now
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-zinc-900 border border-orange-600 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-zinc-900 border border-orange-600 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-zinc-900 border border-orange-600 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <select
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          className="w-full bg-zinc-900 border border-orange-600 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">Select a course</option>
          {COURSES.map((c) => (
            <option key={c.id} value={c.title} className="bg-transparent">
              {c.title}
            </option>
          ))}
        </select>

        <button className="w-full bg-orange-500 text-black font-semibold py-3 rounded-full hover:bg-orange-400 transition-colors">
          Submit
        </button>
      </form>
    </main>
  );
}
