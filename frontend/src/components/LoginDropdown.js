import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import auth0 from 'auth0-js';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  background-color: black;
  color: white;
`;

const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class LoginDropdown extends Component {
  auth0 = new auth0.WebAuth({
    // need to create auth0 account and apply settings...
    // https://www.youtube.com/watch?v=QsMK3d3LxYQ
    domain: 'domain.auth0.com',
    clientID: 'random string provided by auth0 account',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'domain.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  //---------------- Form Methods --------------
  handleInputChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  submitHandler = ev => {
    ev.preventDefault();
    // login(); // uncomment after you get it working
    // After Login
    this.setState({
      username: '',
      password: ''
    });
  };

  login = () => {
    // this.auth0.authorize()
  };

  render() {
    return (
      <FormLogin>
        <input
          onChange={this.handleInputChange}
          placeholder='Username'
          value={this.state.username}
          name='username'
          autoComplete='off'
        />
        <input
          onChange={this.handleInputChange}
          placeholder='Password'
          value={this.state.password}
          name='password'
          autoComplete='off'
        />
        <button type='submit' onClick={ev => this.submitHandler(ev)}>
          Login
        </button>
      </FormLogin>
    );
  }
}

// LoginDropdown.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    loggingInLoadingMessage: state.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  {}
)(LoginDropdown);