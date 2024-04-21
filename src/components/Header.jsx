import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";


const Header = ({ onCreateNote }) => {
    return (
        <header>
            <h1><LuListTodo />&nbsp;Todoator</h1>
            <Button variant="primary" onClick={onCreateNote}>Create Note <FaPlus /></Button>
        </header>
    );
};

export default Header;