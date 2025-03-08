'use client';

import { removeKeysFromUrlQuery } from '@/lib/url';
import React, { createContext, useContext, useRef } from 'react';

interface SearchContextType {
  inputRef: React.RefObject<HTMLInputElement | null>;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = '';

      // remove query param
      const newUrl = removeKeysFromUrlQuery({
        params: window.location.search,
        keysToRemove: ['query', 'page', 'filter'],
      });

      // go to library page
      window.location.replace(newUrl);
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
