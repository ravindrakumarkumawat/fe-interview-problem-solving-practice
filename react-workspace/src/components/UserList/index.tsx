import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const ITEMS_PER_PAGE = 5;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const debouncedSearch = useDebounce(search, 300);
  
    // Fetch users
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          const data = await res.json();
          setUsers(data);
        } catch (err) {
          setError("Failed to fetch users");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    // Filter users
    const filteredUsers = useMemo(() => {
      return users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }, [users, debouncedSearch]);
  
    // Paginated users
    const paginatedUsers = useMemo(() => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredUsers, page]);
  
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  
    const handleSearch = useCallback((e) => {
      setSearch(e.target.value);
      setPage(1); // reset page
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div>
        <h2>User List</h2>
  
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearch}
        />
  
        {paginatedUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          <ul>
            {paginatedUsers.map((user) => (
              <li key={user.id}>
                <b>{user.name}</b> - {user.email} ({user.company.name})
              </li>
            ))}
          </ul>
        )}
  
        <div>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </button>
  
          <span> Page {page} of {totalPages} </span>
  
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
}

export default UserList