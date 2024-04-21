import React, {useState} from 'react';
import {MdDelete} from "react-icons/md";
import {MdOutlinePersonAddAlt1} from "react-icons/md";
import {BsFillPeopleFill} from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import SharePopup from "./SharePopup";

function Note({title, content, id, user, owner, sharedWith, onDelete, onEdit, onShare,}) {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleUserSelect = (username) => {

        setSelectedUser(username);
        if (!sharedWith.includes(user)) {
            sharedWith.push(username);
            console.log("Note '" + id + "'now shared with " + sharedWith.toString())
        }
        togglePopup();
    };


    if (!sharedWith.includes(user) && user !== owner)
        return null;
    return (
        <div className="note">
            <h1>{title}</h1>
            {sharedWith.includes(user) && <BsFillPeopleFill size={20}/>}
            <p>{content}</p>
            <button onClick={() => onEdit(id)}><MdOutlineModeEditOutline size={20}/>
            </button>
            <button onClick={() => onDelete(id)}>
                <MdDelete size={20}/>
            </button>
            {user === owner && (
                <button onClick={togglePopup}><MdOutlinePersonAddAlt1 size={20}/></button>
            )}

            {isPopupOpen && (
                <SharePopup
                    users={["user1", "user2", "user3"]}
                    onSelect={handleUserSelect}
                    onClose={togglePopup}
                />
            )}

        </div>
    );
}


export default Note;