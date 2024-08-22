// components/tables/UserTable.tsx
import { useRouter } from "next/navigation";
import Pagination from "../shared/Pagination";
import { UserTableProps } from "@/ITypes/component-types";

const UserTable = ({
  users,
  currentPage,
  usersPerPage,
  sortField,
  sortDirection,
  handleSort,
  setCurrentPage,
}: UserTableProps) => {
  const router = useRouter();

  const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  if (users.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white s rounded-lg h-[85vh]">
        <p className="text-lg text-gray-500 text-left">No users found</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto h-[80vh] r">
        <table className="min-w-full bg-gray-50  border-gray-300  rounded-lg">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th
                className="py-3 px-3 sm:px-6 text-right cursor-pointer w-1/3"
                onClick={() => handleSort("username")}
              >
                Username{" "}
                {sortField === "username" && (
                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                className="py-3 px-4 sm:px-6 text-right cursor-pointer w-1/3"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortField === "email" && (
                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                className="py-3 px-4 sm:px-6 text-right cursor-pointer w-1/3"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortField === "name" && (
                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <td className="py-4 px-4 sm:px-6">{user.username}</td>
                <td className="py-4 px-4 sm:px-6">{user.email}</td>
                <td className="py-4 px-4 sm:px-6">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalUsers={users.length}
        usersPerPage={usersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default UserTable;
