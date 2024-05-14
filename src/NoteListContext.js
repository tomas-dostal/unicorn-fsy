import React, { createContext, useContext } from "react"


export const NoteListContext = createContext([]);

export function useNoteList() {
    return useContext(NoteListContext);
}