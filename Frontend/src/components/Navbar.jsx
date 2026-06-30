import React from "react";
import { Link } from "react-router-dom";
import { UseLogout } from "../hooks/UseLogout";
import { UseAuthContext } from "../hooks/UseAuthContext";

const Navbar = () => {
  const { logout } = UseLogout();

  const { user } = UseAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="navbar">
      <header>
        <div className="container">
          <Link to="/">
            <h1>WorkOutBuddy</h1>
          </Link>
          <nav>
            {user && (
              <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log Out</button>
              </div>
            )}

            {!user && (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
