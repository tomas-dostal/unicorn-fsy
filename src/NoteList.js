import { useContext, useState } from "react";

import Button from "react-bootstrap/esm/Button.js";

import NoteForm from "./NoteForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline} from "@mdi/js";
import { NoteListContext } from "./NoteListContext"; // Import NoteListContext
import NoteCard from "./NoteCard";

function NoteList() {
    const { noteList = [] } = useContext(NoteListContext); // Access noteList from NoteListContext
    const [showNoteForm, setShowNoteForm] = useState(false);

    console.log(noteList);

    const filteredNoteList = noteList.filter(
        (note) => true //new Date(event.date) > new Date()
    );

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <Button variant="success" onClick={() => setShowNoteForm(true)}> {/* Set showNoteForm to true */}
                    <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> New note
                </Button>
            </div>
            {!!showNoteForm && <NoteForm note={showNoteForm} setShowNoteForm={setShowNoteForm} />} {/* Render NoteForm if showNoteForm is true */}
            {filteredNoteList.map((note) => {
                return (
                    <NoteCard
                        key={note.id}
                        note={note}
                        setShowNoteForm={setShowNoteForm}
                    />
                );
            })}
        </Container>
    );
}

export default NoteList;
