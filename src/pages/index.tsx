// src/pages/index.tsx
import React, { useState, useEffect } from "react";
import { User } from "../types/user";
import UserList from "../components/UserList";
import { getUsersFromLocalStorage, saveUsersToLocalStorage } from "../utils/localStorage";

// Helper function to fetch users from the API
const fetchUsers = async () => {
  const res = await fetch("/api/users");
  return res.json();
};

// Helper function to fetch only admins from the API
const fetchAdmins = async () => {
  const res = await fetch("/api/admins");
  return res.json();
};

const AdminPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users and admins from MongoDB
    fetchUsers().then((data) => setUsers(data));
    fetchAdmins().then((data) => setAdmins(data));
  }, []);

  const handleAddUser = async () => {
    if (name.trim() === "") return;

    const newUser: User = {
      id: new Date().getTime(), // Unique ID generation
      name,
      role,
    };

    // Save the new user to MongoDB
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Update local state
    setUsers((prev) => [...prev, newUser]);
    if (role === "admin") {
      setAdmins((prev) => [...prev, newUser]);
    }
    setName("");
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
        />
        <select value={role} onChange={(e) => setRole(e.target.value as "admin" | "user")}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <h2>Admins</h2>
      <UserList users={admins} />

      <h2>Users</h2>
      <UserList users={users} />
    </div>
  );
};

export default AdminPage;
