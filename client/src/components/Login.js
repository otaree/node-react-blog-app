import React from 'react';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

import * as authActions from '../actions/auth';

export class Login extends React.Component {
    state = {
        email: {
            value: '',
            error: false
        },
        password: {
            value: '',
            error: false
        }
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    emailChangeHandler = e => {
        this.setState({
            email: {
                value: e.target.value,
                error: false
            }
        });
    }

    passwordChangeHandler = e => {
        this.setState({
            password: {
                value: e.target.value,
                error: false
            }
        });
    }

    submitHandler = e => {
        e.preventDefault();

        if (this.validation()) return;

        this.props.login({ email: this.state.email.value, password: this.state.password.value });
    }

    validation = () => {
        let error = false;
        if (!isEmail(this.state.email.value)) {
            error = true;
            this.setState(prevState => {
                return {
                    email: {
                        ...prevState.email,
                        error: true
                    }
                };
            });
        }
        if (this.state.password.value.length < 6) {
            error = true;
            this.setState(prevState => {
                return {
                    password: {
                        ...prevState.password,
                        error: true
                    }
                };
            });
        }
        return error;
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    { this.props.authError.isError && <div>{this.props.authError.value}</div> }
                    <div>
                        <label>Email</label>
                        <input 
                            type="email"
                            value={this.state.email.value}
                            onChange={this.emailChangeHandler}
                        />
                        { this.state.email.error && <div className="auth__error">Invalid Email</div> }
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            type="password"
                            value={this.state.password.value}
                            onChange={this.passwordChangeHandler}
                        />
                        { this.state.password.error && <div className="auth__error">Password too short</div> }                        
                    </div>
                    <div>
                        <input 
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authError: state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(authActions.authLogin(user))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);