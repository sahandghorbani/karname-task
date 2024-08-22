"use client";
import { useGetUsersQuery } from "@/store/apis/userApi";
import { useState } from "react";
import SearchBar from "../shared/SearchBar";
import Loading from "../shared/Loading";
import ErrorMessage from "../shared/Error";
import UserTable from "../tables/UserTable";
import { sortUsers } from "@/utils/sort-users";
import { filterUsers } from "@/utils/filter-users";

const UsersList = () => {
  const [sortField, setSortField] = useState<string>("username");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { data, error, isLoading } = useGetUsersQuery({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const usersPerPage = 5;

  // Filter users based on the search query
  const filteredUsers = filterUsers(data || [], searchQuery);

  const sortedUsers = sortUsers(filteredUsers, sortField, sortDirection);

  // Handle sorting when a column header is clicked
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Error loading users!" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow-lg rounded-lg">
      <SearchBar setSearchQuery={setSearchQuery} />
      <UserTable
        users={sortedUsers || []}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UsersList;
