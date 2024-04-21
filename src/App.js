import React, {useState} from 'react';
import Header from './components/Header';
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import Modal from "./components/Modal"; // Assuming you have a Modal component

const users = ["user1", "user2", "user3"];
const user = users[0];
const defaultState = [
    {
        title: 'Shopping list ',
        content: 'Potatoes\nFinish this app\n',
        sharedWith: [],
        owner: user,
    },
    {
        title: 'UI of this app',
        content: 'Move add button a bit up\nMore fancy CSS\nPopup window asking if I really want to delete a note',
        sharedWith: [users[1]],
        owner: user,
    },
    {
        title: 'This one should not be visible for user0',
        content: 'super secret',
        sharedWith: [],
        owner: users[1],
    },
    {
        title: 'Sharing functionality',
        content: 'Redo sharing options so a popup will appear, showi…t all of the users the note is being shared with\n',
        sharedWith: [],
        owner: user
    },
    {
        title: 'Masonry view',
        content: 'This is a note which is shared with me so I can not further share it nor delete it. Use Masonry view for listing notes',
        sharedWith: [user],
        owner: users[2]
    }
];

function App(props) {
    const [notes, setNotes] = useState(defaultState)
    const [showModal, setShowModal] = useState(false);
    const [editNote, setEditNote] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false); // New state for delete confirmation

    const addNote = (newNote) => {
        //if (newNote.content.length !== 0) {
        setNotes((prevNotes) => [...prevNotes, newNote]);
        setShowModal(false);

        // }
    };

    const deleteNote = (index) => {
        if (deleteConfirmation) { // Only delete if confirmation is true
            setNotes((prevNotes) => prevNotes.filter((note, idx) => idx !== index));
            setDeleteConfirmation(false); // Reset delete confirmation state
        }
    };

    const openEditModal = (note) => {
        console.log("Opening edit modal");
        const updatedNotes = notes.map((n) => {
            if (n === note) {
                return editNote; // Use the current editNote state to update the note
            }
            return n;
        });
        setNotes(updatedNotes);
        setShowModal(true);
    };

    const handleDeleteConfirmation = (index) => {
        setDeleteConfirmation(true);
        setShowModal(false); // Close the modal after confirmation
        deleteNote(index);
    };

    function shareNote(id, userId) {
        setNotes(prevState => {
            prevState.at(id).sharedWith.push(userId);
            return [...prevState]
        })
    }

    return (
        <div>
            <Header onCreateNote={() => setShowModal(true)}/>
            <NoteForm
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setEditNote(null);
                }}
                onSubmit={(newNote) => {
                    if (editNote) {
                        const updatedNotes = notes.map((note, index) => {
                            if (index === notes.indexOf(editNote)) {
                                return {...editNote, ...newNote};
                            }
                            return note;
                        });
                        setNotes(updatedNotes);
                    } else {
                        addNote(newNote);
                    }
                }}
                note={editNote}
            />
            {notes.map((note, index) => (
                <Note
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content}
                    user={user}
                    owner={user}
                    sharedWith={[]}
                    onDelete={() => setDeleteConfirmation(true)} // Set delete confirmation on delete button click
                    onEdit={() => openEditModal(note)}
                    onShare={shareNote}
                />
            ))}
            <Modal
                show={deleteConfirmation}
                onHide={() => setDeleteConfirmation(false)}
                onConfirm={handleDeleteConfirmation}
            >
                Do you really want to do it?
            </Modal>
        </div>
    );
}

export default App;
