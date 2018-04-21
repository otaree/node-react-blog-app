import React from 'react';
import './Form.css';

export default class Form extends React.Component {
    state = {
        title: {
            value: this.props.blog ? this.props.blog.title : "",
            error: false,
        },
        author: {
            value: this.props.blog ? this.props.blog.author : "",
            error: false,
        },
        body: {
            value: this.props.blog ? this.props.blog.body : "",
            error: false,
        },
        published: this.props.blog ? this.props.blog.published : false       
    };

    onTitleChange = e => {
        const value = e.target.value;
        this.setState(prevState => {
            return {
                title: {
                    ...prevState.title,
                    value
                }
            };
        });
    };

    onBodyChange = e => {
        const value = e.target.value;
        this.setState(prevState => {
            return {
                body: {
                    ...prevState.body,
                    value
                }
            };
        });
    };

    onAuthorChange = e => {
        const value = e.target.value;
        this.setState(prevState => {
            return {
                author: {
                    ...prevState.author,
                    value
                }
            };
        });
    };

    onPublishChange = e => {
        const value = e.target.value;
        this.setState(prevState => {
            return {
                    published: value,
                }
            });
    };

    onSubmit = (e) => {
        e.preventDefault();

        let isError = false;

        if (this.state.title.value.trim() === '') {
            isError = true;
            this.setState(prevState => {
                return {
                    title: {
                        ...prevState.title,
                        error: true,
                    }
                }
            });
        }


        if (this.state.body.value.trim() === '') {
            isError = true;
            this.setState(prevState => {
                return {
                    body: {
                        ...prevState.body,
                        error: true,
                    }
                }
            });
        }

        if (this.state.author.value.trim() === '') {
            isError = true;
            this.setState(prevState => {
                return {
                    author: {
                        ...prevState.author,
                        error: true,
                    }
                }
            });
        }

        if (isError) return;
        this.setState(prevState => {
            return {
                title: {
                    ...prevState.title,
                    error: false,
                },
                body: {
                    ...prevState.body,
                    error: false,
                },
                author: {
                    ...prevState.author,
                    error: false,
                },
            };
        });
        this.props.onSubmit({
            title: this.state.title.value,
            body: this.state.body.value,
            author: this.state.author.value,
            published: this.state.published
        });
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form-control">
                    <input 
                        className="form-input"
                        type="text"
                        placeholder="Title"
                        value={this.state.title.value}
                        onChange={this.onTitleChange}
                    />
                    { this.state.title.error && <div>Invalid title</div>}
                </div>
                <div className="form-control">
                    <textarea 
                        className="form-textarea"                    
                        placeholder="Body"
                        value={this.state.body.value}
                        onChange={this.onBodyChange}
                    />
                    { this.state.body.error && <div>Invalid body</div> }
                </div>
                <div className="form-control">
                    <input 
                        className="form-input"                        
                        type="text"
                        placeholder="Author"
                        value={this.state.author.value}
                        onChange={this.onAuthorChange}
                    />
                    { this.state.author.error && <div>Invalid author name</div> }
                </div>
                <div className="form-select">
                    <label>publish</label>
                    <select name="publish">
                        <option value={this.state.published} onChange={this.onPublishChange}>false</option>
                        <option value="true">True</option>
                    </select>
                </div>
                <div className="submit">
                    <button className="btn-submit">Submit</button>
                </div>
            </form>
        );
    }
}