"use client";
import { useRouter } from "next/navigation";

interface QueryParams {
  [key: string]: string | number;
}

const useQueryParams = () => {
  const router = useRouter();
  return (params: QueryParams) => {
    const searchParams = new URLSearchParams(window.location.search);
    for (const key in params) {
      const value = params[key];
      if (value) {
        searchParams.set(key, value as string);
      } else {
        searchParams.delete(key);
      }
    }

    const newSearch = searchParams.toString();
    const newURL = `${window.location.pathname}${newSearch ? `?${newSearch}` : ""}`;
    router.push(newURL, { scroll: false });
  };
};

export default useQueryParams;
