import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminPage = () => {
  const [admins, setAdmins] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin-login");
      return;
    }

    fetch("/api/user-role", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setUserRole(data.role);
        if (data.role !== "admin") {
          alert("Access Denied: Only admins can access this page!");
          router.push("/admin-login");
        }
      });

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []));

    fetch("/api/admins")
      .then((res) => res.json())
      .then((data) => setAdmins(Array.isArray(data) ? data : []));
  }, []);

  const handleCreateAccount = async () => {
    if (userRole !== "admin") {
      alert("Access Denied: Only admins can create users or admins!");
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`${role} created successfully!`);
      setName("");
      setEmail("");
      setPassword("");

      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUsers(Array.isArray(data) ? data : []));

      fetch("/api/admins")
        .then((res) => res.json())
        .then((data) => setAdmins(Array.isArray(data) ? data : []));
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => { localStorage.removeItem("token"); router.push("/admin-login"); }}>
        Logout
      </button>

      <h2>Create User/Admin</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value as "user" | "admin")}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleCreateAccount}>Create {role}</button>

      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} ({user.email}) - Role: {user.role}</li>
        ))}
      </ul>

      <h2>All Admins</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>{admin.name} ({admin.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
