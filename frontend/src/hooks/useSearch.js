// ==========================================================
// src/hooks/useSearch.js
// ----------------------------------------------------------
// Search Hook
//
// Centralizes:
// - Search Query
// - Search Results
// - Loading State
// - Recent Searches
// - Debounced Search
//
// Future:
// Connects to backend search API.
//
// Current:
// Works with local searchData.
// ==========================================================

import { useEffect, useState } from "react";

import searchData from "../data/searchData";

import {
  searchStorage,
} from "../services/storage";

import {
  debounce,
} from "../utils/helpers";

export default function useSearch() {
  /* ======================================================
      STATES
  ====================================================== */

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [recentSearches, setRecentSearches] =
    useState(searchStorage.get());

  /* ======================================================
      SEARCH
  ====================================================== */

  const performSearch = (keyword) => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const lower = keyword.toLowerCase();

    const filtered = searchData.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(lower) ||
        item.keywords?.some((word) =>
          word
            .toLowerCase()
            .includes(lower)
        )
    );

    setResults(filtered);

    setLoading(false);
  };

  /* ======================================================
      DEBOUNCED SEARCH
  ====================================================== */

  const debouncedSearch = debounce(
    performSearch,
    300
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  /* ======================================================
      SAVE RECENT SEARCH
  ====================================================== */

  const saveRecentSearch = (keyword) => {
    if (!keyword.trim()) return;

    const updated = [
      keyword,
      ...recentSearches.filter(
        (item) =>
          item.toLowerCase() !==
          keyword.toLowerCase()
      ),
    ].slice(0, 8);

    setRecentSearches(updated);

    searchStorage.save(updated);
  };

  /* ======================================================
      CLEAR RECENT SEARCHES
  ====================================================== */

  const clearRecentSearches = () => {
    setRecentSearches([]);

    searchStorage.clear();
  };

  /* ======================================================
      CLEAR RESULTS
  ====================================================== */

  const clearResults = () => {
    setResults([]);
  };

  /* ======================================================
      RESET SEARCH
  ====================================================== */

  const resetSearch = () => {
    setQuery("");

    setResults([]);

    setLoading(false);
  };

  /* ======================================================
      RETURN
  ====================================================== */

  return {
    query,

    setQuery,

    results,

    loading,

    recentSearches,

    performSearch,

    saveRecentSearch,

    clearRecentSearches,

    clearResults,

    resetSearch,
  };
}



// import useSearch from "../hooks/useSearch";
// const {
//   query,
//   setQuery,
//   results,
//   loading,
// } = useSearch();


// <input
//   value={query}
//   onChange={(e) =>
//     setQuery(e.target.value)
//   }
// />

// {
//   results.map((item) => (
//     <SearchCard
//       key={item.id}
//       item={item}
//     />
//   ));
// }


// {
//   recentSearches.map((search) => (
//     <button key={search}>
//       {search}
//     </button>
//   ));
// }

// saveRecentSearch(query);


// // Current
// const filtered = searchData.filter(...);

// // Future
// const filtered = await searchApi(query);