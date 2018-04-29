import React from 'react';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth';

export class Logout extends React.Component {
    componentDidMount() {
        this.props.logout(this.props.token);
    }
    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <div>Logging out...</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token === null,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (token) => dispatch(authActions.authLogout(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);