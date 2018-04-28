import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import * as actions from '../actions/blog'; 
import "./EditBlog.css";

export class EditBlog extends React.Component {
    onSubmit = (updateBlogData) => {
        this.props.updateBlog(this.props.id, updateBlogData);
        this.props.history.push('/');
    }

    onClick = () => {
        this.props.deleteBlog(this.props.id);
        this.props.history.push('/');
    }
    render() {
        return (
            <section className="EditBlog">
                    <h2>Edit Blog</h2>
                    <Form blog={this.props.blog} onSubmit={this.onSubmit} />
                    <div className="delete-blog">
                        <button
                            className="btn-delete"
                            onClick={this.onClick}  
                        >
                            Delete Blog
                        </button>
                    </div>
            </section>
        );
    }
}

const mapStateToProps = (state, wrapperProps) => {
    const id = wrapperProps.match.params.id;
    return {
        blog: state.blogs.find(blog => blog._id === id ),
        id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateBlog: (id, blogData) => dispatch(actions.patchBlog(id, blogData)),
        deleteBlog: id => dispatch(actions.deleteBlog(id)) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);