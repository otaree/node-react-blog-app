import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <header>
        <nav>
            <div>Blog</div>
            <ul>
                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/blogs/create" activeClassName="active">Create</NavLink></li>
                <li><NavLink to="/auth/signup" activeClassName="active">Auth</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default Header;
