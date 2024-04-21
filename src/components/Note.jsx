import React, {useState} from 'react';
import {MdDelete, MdOutlinePersonAddAlt1} from "react-icons/md";
import {BsFillPeopleFill} from "react-icons/bs";
import SharePopup from "./SharePopup";
import note from "./Note";

function Note({title, content, id, user, owner, sharedWith, onDelete, onShare}) {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleUserSelect = (username) => {

        setSelectedUser(username);
        if (!sharedWith.includes(username)) {
            sharedWith.push(username);
            console.log("Note '" + id + "'now shared with " + sharedWith.toString())
        }
        togglePopup();
    };

    console.log( " title " + title);
    console.log( " sharedWith " + sharedWith.toString());
    console.log( " user " + user.toString());
    console.log( " owner " + owner.toString());

    if(!sharedWith.includes(user) && user !== owner)
        return null;
    return (
        <div className="note">
            <h1>{note.title}</h1>
            {sharedWith.includes(user) && <BsFillPeopleFill size={20}/>}
            <p>{content}</p>
            {user === owner && <button onClick={() => onDelete(note.id)}>
                <MdDelete size={20}/>
            </button>}
            {user === owner && (
                <button onClick={togglePopup}><MdOutlinePersonAddAlt1 size={20}/>
                </button>
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