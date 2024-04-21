import React from 'react';
import {Form, Button, Modal} from 'react-bootstrap';

const NoteForm = ({show, onHide, onSubmit, note}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{note ? 'Edit Note' : 'Create Note'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="noteTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            defaultValue={note ? note.title : ''}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="noteContent">
                        <Form.Label>Detail</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="content"
                            defaultValue={note ? note.content : ''}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        {note ? 'Update' : 'Create'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NoteForm;
