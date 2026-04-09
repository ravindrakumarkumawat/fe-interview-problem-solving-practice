import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";

// Autocomplete or Typeahead component
export default function Autocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [show, setShow] = useState(false);

  const cache = useRef({});
  const requestId = useRef(0);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    // Cache check
    if (cache.current[debouncedQuery]) {
      setResults(cache.current[debouncedQuery]);
      return;
    }

    const currentRequest = ++requestId.current;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://dummyjson.com/users/search?q=${debouncedQuery}`
        );
        const data = await res.json();

        // Ignore stale response
        if (currentRequest !== requestId.current) return;

        cache.current[debouncedQuery] = data.users;
        setResults(data.users);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        setQuery(results[activeIndex].firstName);
        setShow(false);
      }
    } else if (e.key === "Escape") {
      setShow(false);
    }
  };

  return (
    <div style={{ width: 300 }}>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShow(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search users..."
      />

      {show && (
        <div style={{ border: "1px solid #ccc" }}>
          {loading && <p>Loading...</p>}

          {!loading && results.length === 0 && <p>No results</p>}

          {results.map((user, index) => (
            <div
              key={user.id}
              style={{
                background: index === activeIndex ? "#eee" : "white",
                padding: "5px",
              }}
            >
              {user.firstName} ({user.email})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}