"use client";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SearchContextType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {},
});

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("search")?.trim() || ""
  );

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
