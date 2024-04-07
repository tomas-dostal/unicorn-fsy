import './components/Header'
import Header from './components/Header';
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import {useState} from "react";

const users = ["user1", "user2", "user3"];
const user = users[0];

function App(props) {
    const [notes, setNotes] = useState([])

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
