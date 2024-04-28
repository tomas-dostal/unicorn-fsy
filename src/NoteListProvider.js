import {useContext, useEffect, useState} from "react";
import {ListContext, NoteListContext} from "./NoteListContext.js";


function NoteListProvider({children}) {
    const initialNoteList = useContext(NoteListContext);
    const [eventLoadObject, setEventLoadObject] = useState({
        state: "ready",
        error: null,
        data: initialNoteList,
    });

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        // setEventLoadObject((current) => ({ ...current, state: "pending" }));
        // const response = await fetch("http://localhost:8000/note/list", {
        //     method: "GET",
        // });
        // const responseJson = await response.json();
        // if (response.status < 400) {
        //     setEventLoadObject({ state: "ready", data: responseJson });
        //     return responseJson;
        // } else {
        //     setEventLoadObject((current) => ({
        //         state: "error",
        //         data: current.data,
        //         error: responseJson.error,
        //     }));
        //     throw new Error(JSON.stringify(responseJson, null, 2));
        try {
            setEventLoadObject({ state: "ready", data: initialNoteList });
        } catch (error) {
            setEventLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: error.message,
            }));
        }
    }

    async function handleCreate(dtoIn) {
        // setEventLoadObject((current) => ({ ...current, state: "pending" }));
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
        //     setEventLoadObject((current) => {
        //         current.data.push(responseJson);
        //         current.data.sort((a, b) =>  true); //new Date(a.date) - new Date(b.date));
        //         return { state: "ready", data: current.data };
        //     });
        //     return responseJson;
        // } else {
        //     setEventLoadObject((current) => {
        //         return { state: "error", data: current.data, error: responseJson };
        //     });
        //     throw new Error(JSON.stringify(responseJson, null, 2));
        // }
        const newNote = {
            id: eventLoadObject.data.length + 1,
            title: dtoIn.title,
            content: dtoIn.content,
            sharedWith: [],
            owner: "user1",
        };

        setEventLoadObject((current) => ({
            ...current,
            data: [...current.data, newNote], // Add new note to data array
        }));
    }

    async function handleUpdate(dtoIn) {
        // setEventLoadObject((current) => ({ ...current, state: "pending" }));
        // const response = await fetch("http://localhost:8000/note/update", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(dtoIn),
        // });
        // const responseJson = await response.json();
        //
        // if (response.status < 400) {
        //     setEventLoadObject((current) => {
        //         const eventIndex = current.data.findIndex(
        //             (e) => e.id === responseJson.id
        //         );
        //         current.data[eventIndex] = responseJson;
        //         current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        //         return { state: "ready", data: current.data };
        //     });
        //     return responseJson;
        // } else {
        //     setEventLoadObject((current) => ({
        //         state: "error",
        //         data: current.data,
        //         error: responseJson,
        //     }));
        //     throw new Error(JSON.stringify(responseJson, null, 2));
        // }
        const noteIndex = eventLoadObject.data.findIndex((note) => note.id === dtoIn.id);
        if (noteIndex !== -1) {
            const updatedData = [...eventLoadObject.data];
            updatedData[noteIndex] = { ...updatedData[noteIndex], ...dtoIn };
            setEventLoadObject((current) => ({ ...current, data: updatedData }));
            return updatedData[noteIndex];
        } else {
            throw new Error("Note not found");
        }
    }


    const value = {
        state: eventLoadObject.state,
        eventList: eventLoadObject.data || [],
        handlerMap: {handleCreate, handleUpdate},
    };

    return (
        <NoteListContext.Provider value={value}>
            {children}
        </NoteListContext.Provider>
    );
}

export default NoteListProvider;
