import { useState, useEffect } from "react";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";
import ViewUsers from "./components/ViewUsers";

const STORAGE_KEY = "vite_crud_users";

export default function App() {
  //  LocalStorage
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  });

  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // CREATE
  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now() }]);
    setShowModal(false);
  };

  // DELETE
  const deleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // UPDATE
  const updateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditUser(null);
    setShowModal(false);
  };

  // Search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "min-vh-100"}>
      <div className="container py-4">

        <div className="d-flex justify-content-between mb-3">
          <h3>User Dashboard</h3>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="card p-3 mb-3">
          <div className="d-flex justify-content-between mb-2">
            <input
              className="form-control w-50"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setEditUser(null);
                setShowModal(true);
              }}
            >
              + Add User
            </button>
          </div>

          <ViewUsers
            users={currentUsers}
            onEdit={(u) => {
              setEditUser(u);
              setShowModal(true);
            }}
            onDelete={deleteUser}
          />

          {/* Pagination */}
          <div className="mt-3 text-center">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm mx-1 ${
                  currentPage === i + 1
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/*  Modal */}
        {showModal && (
          <div className="modal show d-block" style={{ background: "#00000080" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>{editUser ? "Update User" : "Add User"}</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  {editUser ? (
                    <UpdateUser editUser={editUser} updateUser={updateUser} />
                  ) : (
                    <AddUser addUser={addUser} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
