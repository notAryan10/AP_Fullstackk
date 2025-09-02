import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ fullname: "", phoneno: "", email: "" });

  const API_URL = "http://localhost:3000/contacts";

  const loadContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.log( err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ fullname: "", phoneno: "", email: "" })
      loadContacts()
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Contacts List</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="Full Name" style={{padding: 10, margin: 10}} value={form.fullname} onChange={(e) => setForm({ ...form, fullname: e.target.value })} required />
        <input type="text" placeholder="Phone Number" style={{padding: 10, margin: 10}} value={form.phoneno} onChange={(e) => setForm({ ...form, phoneno: e.target.value })} required />
        <input type="email" placeholder="Email" style={{padding: 10, margin: 10}} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <button type="submit" style={{padding: 10, margin: 10}}>Add Contact</button>
      </form>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.fullname}</td>
              <td>{c.phoneno}</td>
              <td>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
