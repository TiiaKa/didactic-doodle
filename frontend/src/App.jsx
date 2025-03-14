import CreateUser from "./components/CreateUser.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import ReadDeleteUsers from "./components/ReadDeleteUsers.jsx";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#FAF3E0" }}>
      <h1 className="text-center mb-4 text-dark fw-bold">User Management</h1>
      <div className="w-75">
        <div className="card p-4 shadow-sm mb-4 bg-white border-0 rounded-3" style={{ borderLeft: "5px solid rgb(234, 73, 127)" }}>
          <h2 className="text-center text-primary">Create User</h2>
          <CreateUser onUserAdded={() => setRefresh(prev => prev + 1)} buttonClass="custom-btn pink-1 w-100 mt-3" />
        </div>
        <div className="card p-4 shadow-sm mb-4 bg-white border-0 rounded-3" style={{ borderLeft: "5px solid rgb(196, 93, 127)" }}>
          <h2 className="text-center text-danger">Users List</h2>
          <ReadDeleteUsers refresh={refresh} buttonClass="custom-btn pink-2 w-100 mt-2" />
        </div>
        <div className="card p-4 shadow-sm bg-white border-0 rounded-3" style={{ borderLeft: "5px solid #F48FB1" }}>
          <h2 className="text-center text-warning">Update User</h2>
          <UpdateUser onUserUpdated={() => setRefresh(prev => prev + 1)} buttonClass="custom-btn pink-3 w-100 mt-3" />
        </div>
      </div>
    </div>
  );
}

export default App;