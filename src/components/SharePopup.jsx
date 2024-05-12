// SharePopup.js

import React, { useState } from "react";

const SharePopup = ({ users, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleInputChange = (note) => {
    setSearchTerm(note.target.value);
    setSelectedUser(null); // Reset selected user when input changes
  };

  const handleUserClick = (username) => {
    setSelectedUser(username);
  };

  const handleOKClick = () => {
    if (selectedUser) {
      onSelect(selectedUser);
      onClose();
    }
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="popup-overlay">
      <div className="popup">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-bar"
        />
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user}
              onClick={() => handleUserClick(user)}
              className={selectedUser === user ? "selected" : ""}
            >
              {user}
            </li>
          ))}
        </ul>
        <button onClick={handleOKClick}>OK</button>
      </div>
    </div>
  );
};

export default SharePopup;
