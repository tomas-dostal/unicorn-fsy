// NoteForm.js

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const NoteForm = ({ show, onHide, onSubmit, note }) => {
    const [formData, setFormData] = useState({ title: '', content: '' });

    useEffect(() => {
        if (note) {
            setFormData({ title: note.title, content: note.content });
        } else {
            setFormData({ title: '', content: '' });
        }
    }, [note]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <Modal show={show} onHide={onHide}  className="dark-modal">
            <Modal.Header closeButton>
                <Modal.Title>{note ? 'Edit Note' : 'Create Note'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {note ? 'Save Changes' : 'Create'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NoteForm;
