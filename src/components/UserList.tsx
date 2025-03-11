import React from "react";
import { User } from "../types/user";

interface UserListProps {
  users: User[] | null | undefined;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  if (!Array.isArray(users)) {
    return <p>No users available.</p>;
  }

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
