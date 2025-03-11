import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to My Website</h1>
      <p className="text-lg mb-4">Choose an option to continue:</p>
      <div className="space-x-4">
        <button
          onClick={() => router.push("/admin-login")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Admin Login
        </button>
        <button
          onClick={() => router.push("/user-login")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          User Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
