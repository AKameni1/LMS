'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useRef } from 'react';

interface SearchContextType {
  inputRef: React.RefObject<HTMLInputElement | null>;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      const params = new URLSearchParams(searchParams);
      params.delete('query');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const contextValue = React.useMemo(
    () => ({ inputRef, clearSearch }),
    [inputRef, clearSearch],
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
