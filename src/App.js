import './components/Header'
import Header from './components/Header';
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import {useState} from "react";

const users = ["user0", "user1", "user2"];
const user = users[0];
const defaultState  = [
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
        owner: user[1],
    },
    {
        title: 'Sharing functionalty',
        content: 'Redo sharing options so a popup will appear, showi…t all of the users the note is being shared with\n',
        sharedWith: [],
        owner: user
    },
    {
        title: 'Masonry view',
        content: 'This is a note which is shared with me so I can not further share it nor delete it. Use Masonry view for listing notes',
        sharedWith: [user],
        owner: users[2]
    }]

function App(props) {
    const [notes, setNotes] = useState(defaultState)

    function addNote(newNote) {

        if (newNote.content.length !== 0) {

            console.log(newNote.content.size);
            setNotes(prevValue => {
                return [...prevValue, newNote];
            });
        }
    }
    function deleteNote(id){
        setNotes(prevState => {
            return [...prevState.filter((note,index) => index !== id)]
        } )
    }

    function shareNote(id, userId){
        setNotes(prevState => {
            prevState.at(id).sharedWith.push(userId);
            return [...prevState]
        } )
    }
    return (
        <div>
            <Header></Header>
            <CreateArea onAdd={addNote}/>
            {notes.map((note, index) => (
                <Note
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content}
                    user={user}
                    owner={user}
                    sharedWith={[]}
                    onDelete={deleteNote}
                    onShare={shareNote}
                />
            ))}
        </div>
    );
}

export default App;
