import Button from "react-bootstrap/esm/Button.js";
import {useNavigate} from "react-router-dom";

import NoteDetail from "./NoteDetail";

import Icon from "@mdi/react";
import {mdiEyeOutline, mdiPencil} from "@mdi/js";

function NoteCard({note, setShowNoteForm}) {
    const navigate = useNavigate();

    return (
        <div className="card note">
            <NoteDetail note={note}/>
            <Button
                onClick={() => navigate("/noteDetail?id=" + note.id)}
                size={"sm"}
            >
                <Icon path={mdiEyeOutline} size={0.7}/>
            </Button>
            <Button onClick={() => setShowNoteForm(note)} size={"sm"}>
                <Icon path={mdiPencil} size={0.7}/>
            </Button>


        </div>
    );
}


export default NoteCard;
