import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Blogs.css';

export const Blogs = (props) => (
    <div className="Blogs __container">
        {
            props.blogs.length > 0 ?
            (
            <ul>
                {
                    props.blogs.map(blog => <li key={blog.id}><Link  to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)
                }
            </ul>
            ) :
            <h3 style={{ textAlign: 'center'}}>No Blog found</h3> 
        }
    </div>
);


const mapStateToProps = state => {
    return {
        blogs: state.blogs.map(blog => {
            return {
                id: blog._id,
                title: blog.title
            }
        })
    };
}

export default connect(mapStateToProps)(Blogs);