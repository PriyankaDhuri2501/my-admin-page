import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UserPage = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user-login");
      return;
    }

    fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={() => { localStorage.removeItem("token"); router.push("/user-login"); }}>
        Logout
      </button>
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  );
};

export default UserPage;
