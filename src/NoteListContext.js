import React, { createContext, useContext } from "react";

// Default value for the context

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


export const NoteListContext = createContext(mockedData);

export function useNoteList() {
    return useContext(NoteListContext);
}