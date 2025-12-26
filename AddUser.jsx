import { useState } from "react";

export default function AddUser({ addUser }) {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("All fields required");
    addUser(form);
    setForm({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button className="btn btn-success btn-sm">Save</button>
    </form>
  );
}
