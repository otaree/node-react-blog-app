import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Main from './Main';

export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header isAuth={this.props.isAuthenticated} />
                    <Main isAuth={this.props.isAuthenticated} />
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(App);