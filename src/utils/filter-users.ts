import { User } from "@/ITypes/Itypes";

// Function to filter users based on the search query
export const filterUsers = (users: User[], query: string): User[] => {
  if (!query) return [...users];
  const lowerQuery = query.toLowerCase();
  return users.filter((user) => user.email.toLowerCase().includes(lowerQuery));
};
