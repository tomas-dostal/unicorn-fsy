import {useContext, useEffect, useState} from "react";
import {ListContext, NoteListContext} from "./NoteListContext.js";

const users = ["user1", "user2", "user3"];
const user = users[0];
const mockedData = [
    {
        id: 1,
        title: 'Shopping list ',
        content: 'Potatoes\nFinish this app\n',
        sharedWith: [],
        owner: user,
    },
    {
        id: 2,
        title: 'UI of this app',
        content: 'Move add button a bit up\nMore fancy CSS\nPopup window asking if I really want to delete a note',
        sharedWith: [users[1]],
        owner: user,
    },
    {
        id: 3,
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
        id: 4,
        title: 'Masonry view',
        content: 'This is a note which is shared with me so I can not further share it nor delete it. Use Masonry view for listing notes',
        sharedWith: [user],
        owner: users[2]
    }
];

function NoteListProvider({children}) {
    const initialNoteList = useContext(NoteListContext);
    const [noteLoadObject, setNoteLoadObject] = useState({
        state: "ready",
        error: null,
        data: { ...initialNoteList, mockedData}
    });

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        // setNoteLoadObject((current) => ({ ...current, state: "pending" }));
        // const response = await fetch("http://localhost:8000/note/list", {
        //     method: "GET",
        // });
        // const responseJson = await response.json();
        // if (response.status < 400) {
        //     setNoteLoadObject({ state: "ready", data: responseJson });
        //     return responseJson;
        // } else {
        //     setNoteLoadObject((current) => ({
        //         state: "error",
        //         data: current.data,
        //         error: responseJson.error,
        //     }));
        //     throw new Error(JSON.stringify(responseJson, null, 2));
        try {
            setNoteLoadObject({ state: "ready", data: initialNoteList });
        } catch (error) {
            setNoteLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: error.message,
            }));
        }
    }

    async function handleCreate(dtoIn) {
        // setNoteLoadObject((current) => ({ ...current, state: "pending" }));
        // const response = await fetch("http://localhost:8000/note/create", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(dtoIn),
        // });
        // const responseJson = await response.json();
        //
        // if (response.status < 400) {
        //     setNoteLoadObject((current) => {
        //         current.data.push(responseJson);
        //         current.data.sort((a, b) =>  true); //new Date(a.date) - new Date(b.date));
        //         return { state: "ready", data: current.data };
        //     });
        //     return responseJson;
        // } else {
        //     setNoteLoadObject((current) => {
        //         return { state: "error", data: current.data, error: responseJson };
        //     });
        //     throw new Error(JSON.stringify(responseJson, null, 2));
        // }
        const newNote = {
            id: noteLoadObject.data.length + 1,
            title: dtoIn.title,
            content: dtoIn.content,
            sharedWith: [],
            owner: "user1",
        };

        setNoteLoadObject((current) => ({
            ...current,
            data: [...current.data, newNote], // Add new note to data array
        }));
    }

    async function handleUpdate(dtoIn) {
        // setNoteLoadObject((current) => ({ ...current, state: "pending" }));
        // const response = await fetch("http://localhost:8000/note/update", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(dtoIn),
        // });
        // const responseJson = await response.json();
        //
        // if (response.status < 400) {
        //     setNoteLoadObject((current) => {
        //         const noteIndex = current.data.findIndex(
        //             (e) => e.id === responseJson.id
        //         );
        //         current.data[noteIndex] = responseJson;
        //         current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        //         return { state: "ready", data: current.data };
        //     });
        //     return responseJson;
        // } else {
        //     setNoteLoadObject((current) => ({
        //         state: "error",
        //         data: current.data,
        //         error: responseJson,
        //     }));
        //     throw new Error(JSON.stringify(responseJson, null, 2));
        // }
        const noteIndex = noteLoadObject.data.findIndex((note) => note.id === dtoIn.id);
        if (noteIndex !== -1) {
            const updatedData = [...noteLoadObject.data];
            updatedData[noteIndex] = { ...updatedData[noteIndex], ...dtoIn };
            setNoteLoadObject((current) => ({ ...current, data: updatedData }));
            return updatedData[noteIndex];
        } else {
            throw new Error("Note not found");
        }
    }


    const value = {
        state: noteLoadObject.state,
        noteList: noteLoadObject.data || [],
        handlerMap: {handleCreate, handleUpdate},
    };

    return (
        <NoteListContext.Provider value={value}>
            {children}
        </NoteListContext.Provider>
    );
}

export default NoteListProvider;
