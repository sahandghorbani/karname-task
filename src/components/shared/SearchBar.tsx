import React, { useState } from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchQuery = useDebounce(inputValue, 500);

  // Update the parent component's statte when the debounced value changes
  React.useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  return (
    <input
      type="text"
      placeholder="Search by  email"
      className="mb-4 p-2 border rounded w-full"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)} 
    />
  );
};

export default SearchBar;
