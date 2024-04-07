import React, {useState} from 'react';
import {IoIosAdd} from "react-icons/io";
import user from "../App"
function CreateArea({onAdd}) {
    const [isExpanded, setExpanded] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: "",
        owner: user,
        user: user,
        sharedWith: []

    });

    function handleChange(e) {
        const {name, value} = e.target;
        setNote((preValue) => {
            return {...preValue, [name]: value};

        })
    }

    function submitButton(event) {
        onAdd(note);
        setExpanded(false);
        setNote({
            title: "",
            content: "",
            user: user,
            owner: user,
            sharedWith: []
        });
        event.preventDefault();
    }

    function handleExpanded() {
        setExpanded(true);
    }

    return (

        <div>
            <form>
                {isExpanded && (<input type="text" placeholder="Title" name="title"
                                       value={note.title} onChange={handleChange}
                >
                </input>)}

                <p>
                    <textarea name="content" placeholder="Take a note"
                              value={note.content} onChange={handleChange}
                              rows={isExpanded ? 3 : 1}
                              onClick={handleExpanded}></textarea>

                </p>
                <button onClick={submitButton}><IoIosAdd size={35}/></button>
            </form>
        </div>
    )
}

export default CreateArea;