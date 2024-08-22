import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
