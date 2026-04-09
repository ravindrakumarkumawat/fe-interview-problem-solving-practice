import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import Skeleton from "../Skeleton";

/**
 *  ✅ Debounce
 *  ✅ Caching
 *  ✅ AbortController (cancel previous requests)
 *  ✅ Timeout handling
 *  ✅ Race condition safety
 *  ✅ Keyboard navigation
 *  ✅ Skeleton loader
 *  ✅ Smooth UX (no flicker)
 */

export default function Typeahead() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showDropdown, setShowDropdown] = useState(false);
  
    const cache = useRef({});
    const abortRef = useRef(null);
  
    const debouncedQuery = useDebounce(query, 300);
  
    useEffect(() => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }
  
      // ✅ Check cache first
      if (cache.current[debouncedQuery]) {
        setResults(cache.current[debouncedQuery]);
        return;
      }
  
      // ✅ Abort previous request
      if (abortRef.current) {
        abortRef.current.abort();
      }
  
      const controller = new AbortController();
      abortRef.current = controller;
  
      const timeoutId = setTimeout(() => {
        controller.abort(); // cancel if too slow
      }, 5000);
  
      const fetchData = async () => {
        try {
          setLoading(true);
  
          const res = await fetch(
            `https://dummyjson.com/users/search?q=${debouncedQuery}`,
            { signal: controller.signal }
          );
  
          const data = await res.json();
  
          // ✅ Cache results
          cache.current[debouncedQuery] = data.users;
  
          // ✅ Update results
          setResults(data.users);
  
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("Request cancelled");
          } else {
            console.error("API error:", err);
          }
        } finally {
          clearTimeout(timeoutId);
          setLoading(false);
        }
      };
  
      fetchData();
  
      return () => {
        controller.abort();
        clearTimeout(timeoutId);
      };
    }, [debouncedQuery]);
  
    /***********************
     * 🔹 Keyboard Navigation
     ************************/
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) =>
          Math.min(prev + 1, results.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) =>
          Math.max(prev - 1, 0)
        );
      } else if (e.key === "Enter") {
        if (activeIndex >= 0) {
          setQuery(results[activeIndex].firstName);
          setShowDropdown(false);
        }
      } else if (e.key === "Escape") {
        setShowDropdown(false);
      }
    };
  
    return (
      <div style={{ width: "300px", margin: "50px auto" }}>
        <input
          type="text"
          value={query}
          placeholder="Search users..."
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          style={{ width: "100%", padding: "8px" }}
        />
  
        {showDropdown && (
          <div
            style={{
              border: "1px solid #ccc",
              marginTop: "4px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {/* ✅ Skeleton */}
            {loading && <Skeleton />}
  
            {/* ✅ No results */}
            {!loading && results.length === 0 && (
              <p style={{ padding: "8px" }}>No results</p>
            )}
  
            {/* ✅ Results */}
            {!loading &&
              results.map((user, index) => (
                <div
                  key={user.id}
                  style={{
                    padding: "8px",
                    background:
                      index === activeIndex ? "#eee" : "white",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setQuery(user.firstName);
                    setShowDropdown(false);
                  }}
                >
                  <b>{user.firstName} {user.lastName}</b>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {user.email}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }