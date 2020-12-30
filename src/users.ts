export interface User {
  id: number;
  name: string;
  email: string;
}

export let users: User[] = [
  { id: 1, name: "Yamada", email: "yamada@example.com" },
  { id: 2, name: "Tanaka", email: "tanaka@example.com" },
  { id: 3, name: "Suzuki", email: "suzuki@example.com" },
];
