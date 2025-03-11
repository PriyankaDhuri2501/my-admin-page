import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdminPage = () => {
  const [admins, setAdmins] = useState<{ _id: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin-login");
      return;
    }

    fetch("/api/admins", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          router.push("/user");
        } else {
          setAdmins(data);
        }
      });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => { localStorage.removeItem("token"); router.push("/admin-login"); }}>
        Logout
      </button>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>{admin.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
