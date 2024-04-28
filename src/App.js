import React, {useState} from 'react';
import NoteListProvider from "./NoteListProvider"; // Assuming you have a Modal component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NoteList from "./NoteList";



function App(props) {
    return (
        <div>
            {/*<Header onCreateNote={() => setShowModal(true)}/>*/}
            <NoteListProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<NoteList />} />
                            {/*<Route*/}
                            {/*    path="noteDetail"*/}
                            {/*    element={*/}
                            {/*        <NoteProvider>*/}
                            {/*            <NoteRoute />*/}
                            {/*        </NoteProvider>*/}
                            {/*    }*/}
                            {/*/>*/}
                            <Route path="*" element={"not found"} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                {/*<Modal*/}
                {/*    show={deleteConfirmation}*/}
                {/*    onHide={() => setDeleteConfirmation(false)}*/}
                {/*    onConfirm={handleDeleteConfirmation}*/}
                {/*>*/}
                {/*    Do you really want to do it?*/}
                {/*</Modal>*/}
            </NoteListProvider>
        </div>
    );
}

export default App;
