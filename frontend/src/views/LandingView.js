import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  background-color: black;
  color: white;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const LandingView = props => {
  return (
    <DivWrapper>
      {props.loggingInLoadingMessage ? (
        <div>Logging in...</div>
      ) : (
        <div>
          <h1>This is the LandingView Component</h1>
        </div>
      )}
    </DivWrapper>
  );
};

// LandingView.propTypes = {
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
)(LandingView);
