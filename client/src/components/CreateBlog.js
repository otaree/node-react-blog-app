import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import * as actions from '../actions/blog';
import "./CreateBlog.css";

export class CreateBlog extends React.Component {
    onSubmit = (blogData) => {
        this.props.createBlog(blogData);
        this.props.history.push('/');
    }
    render() {
        return (
            <section className="CreateBlog">
                <h2>Create Blog</h2>
                <Form onSubmit={this.onSubmit} />
            </section>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        createBlog: (blog) => dispatch(actions.createBlog(blog))
    }
}

export default connect(null, mapDispatchToProps)(CreateBlog);