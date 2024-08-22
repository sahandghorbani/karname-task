"use client";
import { useParams } from "next/navigation";
import { useGetUserByIdQuery } from "@/store/apis/userApi";
import Loading from "../shared/Loading";
import ErrorMessage from "../shared/Error";
import Link from "next/link";

const UserInfo: React.FC<{ label: string; value: string | JSX.Element }> = ({
  label,
  value,
}) => (
  <p className="text-lg mb-3 text-gray-800">
    <strong className="text-gray-600 font-medium">{label}:</strong> {value}
  </p>
);

const User = () => {
  const { id } = useParams();
  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  const details = [
    { label: "Email", value: user?.email },
    { label: "Username", value: user?.username },
    { label: "Phone", value: user?.phone },
    { label: "Website", value: user?.website },
    {
      label: "Address",
      value: `${user?.address.street}, ${user?.address.city}, ${user?.address.zipcode}`,
    },
    { label: "Company", value: user?.company.name },
  ];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Error loading user data!" />;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg text-left border border-gray-200">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">
        {user?.name}'s Details
      </h1>
      {details.map(({ label, value }) => (
        <UserInfo key={label} label={label} value={value} />
      ))}
      <Link
        href="/"
        className="mt-6 inline-block bg-blue-600 text-white px-5 py-2 rounded shadow-sm hover:bg-blue-700 transition duration-300"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default User;
