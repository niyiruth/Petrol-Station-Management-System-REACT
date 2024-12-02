import React, { useState, useEffect } from "react";
import "../styles/users-page.scss";
import { API_URL, logout } from "../utils/constants";
import useAuthRedirect from "../utils/useAuthRedirect";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: { name: string }[];
  phoneNumber: string;
  dateOfBirth: string;
}

const UsersPage: React.FC = () => {
  useAuthRedirect(true);

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [size] = useState<number>(10);
  const [sortField, setSortField] = useState<string>("firstName");
  const [sortDir, setSortDir] = useState<string>("asc");
  const [messageError, setMessageError] = useState<string | null>(null);
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setMessageError(null);
      try {
        const response = await fetch(
          `${API_URL}/users?page=${currentPage}&size=${size}&sort=${sortField}&dir=${sortDir}&search=${search}`
        );
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        setMessageError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search, currentPage, size, sortField, sortDir]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSort = (field: string) => {
    setSortField(field);
    setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="users-page">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://pbs.twimg.com/profile_images/1788231088302653440/5xKfAdI8_200x200.jpg"
              width="40"
              height="40"
              alt="rpl"
            />
            RWANDA PREMIER LEAGUE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/logout" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="languageDropdown"
                data-bs-toggle="dropdown"
              >
                English
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="?lang=en">
                    English
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="?lang=rw">
                    Kinyarwanda
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="?lang=fr">
                    Français
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <h1>Registered Players</h1>

        {messageError && (
          <div className="alert alert-danger">{messageError}</div>
        )}
        {messageSuccess && (
          <div className="alert alert-success">{messageSuccess}</div>
        )}

        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-container">
            <form method="get" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                />
                <button className="btn" type="submit">
                  Search
                </button>
              </div>
            </form>

            <table className="table">
              <thead>
                <tr>
                  <th>
                    <a href="#" onClick={() => handleSort("firstName")}>
                      First Name
                    </a>
                  </th>
                  <th>
                    <a href="#" onClick={() => handleSort("lastName")}>
                      Last Name
                    </a>
                  </th>
                  <th>
                    <a href="#" onClick={() => handleSort("email")}>
                      Email
                    </a>
                  </th>
                  <th>
                    <a href="#" onClick={() => handleSort("roles[0].name")}>
                      Role
                    </a>
                  </th>
                  <th>
                    <a href="#" onClick={() => handleSort("phoneNumber")}>
                      Phone Number
                    </a>
                  </th>
                  <th>
                    <a href="#" onClick={() => handleSort("dateOfBirth")}>
                      Date of Birth
                    </a>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.roles[0].name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                    <td>
                      <a
                        href={`/users/edit/${user.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </a>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          const sure = confirm(
                            "Are you sure you want to delete this user?"
                          );
                          if (sure) {
                            fetch(`${API_URL}/users/${user.id}`, {
                              method: "DELETE",
                            })
                              .then((response) => {
                                if (response.ok) {
                                  setMessageSuccess(
                                    "User deleted successfully"
                                  );
                                  setUsers((prevUsers) =>
                                    prevUsers.filter((u) => u.id !== user.id)
                                  );
                                } else {
                                  setMessageError("Failed to delete user");
                                }
                              })
                              .catch(() => {
                                setMessageError("Failed to delete user");
                              });
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </a>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${i === currentPage ? "active" : ""}`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePageChange(i)}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages - 1 ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
