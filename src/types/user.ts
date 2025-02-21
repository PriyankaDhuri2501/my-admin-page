// src/types/user.ts
export interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}
