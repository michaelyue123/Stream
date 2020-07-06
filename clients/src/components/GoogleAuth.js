import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
    // fetch data via google api
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1042406736460-8lvld6c9dsaq98r6t94kd5or7pcitb2m.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // helper method
    onSignInClick = () => {
        this.auth.signIn();  
    };

    // helper method
    onSignOutClick = () => {
        this.auth.signOut();
    };

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui blue google button">
                    <i className="google icon" /> 
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui blue google button">
                    <i className="google icon" /> 
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);