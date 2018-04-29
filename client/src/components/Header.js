import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = (props) => {
    let ul = (
        <ul>
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/auth/signup" activeClassName="active">Auth</NavLink></li>
        </ul>
    );
    if (props.isAuth) {
        ul = (
            <ul>
                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/blogs/create" activeClassName="active">Create</NavLink></li>
                <li><NavLink to="/logout" activeClassName="active">Logout</NavLink></li>
            </ul>
        );
    }
    return (
        <header>
            <nav>
                <div>Blog</div>
                {ul}
            </nav>
        </header>
    );
};

export default Header;
