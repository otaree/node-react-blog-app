import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Blog.css";

export const Blog = props => {
    const id = props.match.params.id;
    const blog = props.blogs.find(blog => blog._id === id);

    if (!blog) {
        return (
            <section>
                <div>Sorry, but no blog was found.</div>
            </section>
        );
    }

    return (
        <section className="Blog">
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
            <p>{blog.author}</p>
            <div className="Blog __body">
                {blog.published && <p>Published: {blog.publishedAt}</p>}
            </div>
            <div>
                <button className="btn-edit">
                    <Link to={`/blogs/edit/${id}`}>
                        Edit
                    </Link>
                </button>
            </div>
        </section>
    );
}

const mapStateToProps = state => {
    return {
        blogs: state
    };
};

export default connect(mapStateToProps)(Blog);