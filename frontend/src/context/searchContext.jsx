
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {

  const [isSearchOpen, setIsSearchOpen] = useState(false);

const openSearch = () => {
  console.log("OPEN SEARCH CLICKED");
  setIsSearchOpen(true);
};

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  // Ctrl + K / Cmd + K shortcut
  useEffect(() => {

    const handleShortcut = (e) => {

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {

        e.preventDefault();

        setIsSearchOpen(true);

      }

    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };

  }, []);

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        openSearch,
        closeSearch,
        toggleSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}


// // ==========================================================
// // src/context/SearchContext.jsx
// // ----------------------------------------------------------
// // Global Search Context
// //
// // Provides search functionality throughout the application.
// //
// // Uses:
// // - useSearch()
// // - React Context API
// //
// // Future:
// // Can be connected to backend search endpoints.
// // ==========================================================

// import {
//   createContext,
//   useContext,
// } from "react";

// import useSearch from "../hooks/useSearch";

// /* ==========================================================
//    CREATE CONTEXT
// ========================================================== */

// const SearchContext = createContext(null);

// /* ==========================================================
//    PROVIDER
// ========================================================== */

// export function SearchProvider({
//   children,
// }) {
//   const search = useSearch();

//   return (
//     <SearchContext.Provider value={search}>
//       {children}
//     </SearchContext.Provider>
//   );
// }

// /* ==========================================================
//    CUSTOM HOOK
// ========================================================== */

// export function useSearchContext() {
//   const context =
//     useContext(SearchContext);

//   if (!context) {
//     throw new Error(
//       "useSearchContext must be used inside a SearchProvider."
//     );
//   }

//   return context;
// }

// export default SearchContext;
