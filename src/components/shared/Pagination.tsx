import React from "react";

interface PaginationProps {
  totalUsers: number;
  usersPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalUsers,
  usersPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePaginating = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex justify-center mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-3 py-1 mx-1 ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePaginating(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
