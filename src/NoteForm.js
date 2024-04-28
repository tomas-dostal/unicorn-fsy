import { useContext, useState } from "react";
import { NoteListContext } from "./NoteListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function NoteForm({ setShowNoteForm, note }) {
    const { state, handlerMap } = useContext(NoteListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";

    return (
        <Modal show={true} onHide={() => setShowNoteForm(false)}>
            <Form
                onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    var formData = Object.fromEntries(new FormData(e.target));
                    console.log(formData);
                    try {
                        if (note.id) {
                            formData.id = note.id;
                            await handlerMap.handleUpdate(formData);
                        } else {
                            await handlerMap.handleCreate(formData);
                        }

                        setShowNoteForm(false);
                    } catch (e) {
                        console.error(e);
                        setShowAlert(e.message);
                    }
                }}
            >
                <Modal.Header>
                    <Modal.Title>{`${
                        note.id ? "Create" : "Edit"
                    } note`}</Modal.Title>
                    <CloseButton onClick={() => setShowNoteForm(false)} />
                </Modal.Header>
                <Modal.Body style={{ position: "relative" }}>
                    <Alert
                        show={!!showAlert}
                        variant="danger"
                        dismissible
                        onClose={() => setShowAlert(null)}
                    >
                        <Alert.Heading>Unable to create note</Alert.Heading>
                        <pre>{showAlert}</pre>
                    </Alert>

                    {isPending ? (
                        <div style={pendingStyle()}>
                            <Icon path={mdiLoading} size={2} spin />
                        </div>
                    ) : null}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            required
                            defaultValue={note.title}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicE">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            defaultValue={note.content}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowNoteForm(false)}
                        disabled={isPending}
                    >
                        Close
                    </Button>
                    <Button type="submit" variant="primary" disabled={isPending}>
                        {note.id ? "Edit" : "Create"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

function pendingStyle() {
    return {
        position: "absolute",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        opacity: "0.5",
    };
}

export default NoteForm;
