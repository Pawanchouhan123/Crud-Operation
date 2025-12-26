import { useState, useEffect } from "react";

export default function UpdateUser({ editUser, updateUser }) {
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    setForm(editUser);
  }, [editUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="form-control mb-2"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button className="btn btn-warning btn-sm">Update</button>
    </form>
  );
}
