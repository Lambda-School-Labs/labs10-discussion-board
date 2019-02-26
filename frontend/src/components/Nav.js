import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DisplayUser from './DisplayUser.js';
import Auth from './Auth.js';

// Globals
import { NavSearchOptions } from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  background-color: gray;
  color: white;
  height: 50px;
  margin: 0;
  padding: 10px;
  border: 1px solid red;
  justify-content: space-evenly;

  @media (max-width: 750px){
    width: 100%;
    @media (max-width: 450px){
      width: 100%;
    }
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-around;
  width: 55%;
  margin: 0;
  align-items: center;
  border: 1px solid purple;
  .link {
    font-weight: bold;
    text-decoration: none;
    font-size: 2em;
    color: white;
    :hover {
      color: black;
    }
  }
  @media (max-width: 960px){
    font-size: 10px;
    display: flex;
    margin: 0 auto;
    @media (max-width: 450px){
      width: 35%;
      font-size: 8px;
      display: flex;
      flex-direction: column;
    }
  }
`

const DivSearch = styled.div`
  display: flex;
  border: 1px solid red;
  width: 6%;
  align-items: center;
  @media (max-width: 750px){
      width: 15%;
    @media (max-width: 450px){
      width: 20%;
    }
  }

`;

const DivAuth = styled.div`
  display: flex;
  width: 33%;
  border: 1px solid lime;
  height: 100%;

  @media (max-width: 750px){
      width: 25%;
    @media (max-width: 450px){
      width: 40%;
    }
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DivWrapper>
        <DivSearch>
          <button onClick={this.props.toggleSearch}>search</button>
        </DivSearch>
        <Links>
          <Link className='link' to='/home'>
            Home
          </Link>
          <Link className='link' to='/home'>
            Top Discussions
          </Link>
          <Link className='link' to='/categories'>
            Categories
          </Link>
        </Links>
        <DivAuth>
          {(this.props.isLoggedIn) ? (
            <DisplayUser history={this.props.history} />
          ) : (
              <Auth history={this.props.history} />
            )}
        </DivAuth>
      </DivWrapper>
    );
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.users.isLoggedIn
  };
};

export default connect(mapStateToProps, {})(Nav);