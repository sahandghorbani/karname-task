import { User } from "./Itypes";

export interface UserTableProps {
    users: User[];
    currentPage: number;
    usersPerPage: number;
    sortField: string;
    sortDirection: "asc" | "desc";
    handleSort: (field: string) => void;
    setCurrentPage: (page: number) => void;
  }