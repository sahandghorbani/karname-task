// utils/sortUsers.ts

import { User } from "@/ITypes/Itypes";

export const sortUsers = (
  users: User[],
  sortField: string,
  sortDirection: "asc" | "desc"
): User[] => {
  return users.sort((a, b) => {
    if (sortField) {
      const fieldA = a[sortField as keyof User]?.toString().toLowerCase();
      const fieldB = b[sortField as keyof User]?.toString().toLowerCase();
      if (sortDirection === "asc") {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    }
    return 0;
  });
};
