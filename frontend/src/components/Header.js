import React from 'react';
import styled from 'styled-components';
import { Nav } from '../components/index.js';

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 72px;
  width: 100%;
  @media(max-width: 768px){
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (max-width: 450px){
    }
  }
`;

const Navi = styled.div`
  @media (max-width: 768px){
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    margin-bottom: 1em;
    @media (max-width: 450px){
      width: 100%;
    }
  }
`

const Header = ({ history, isAuthenticated, toggleSearch }) => {
  return (
    <StyledHeader>
      <Navi>
        <Nav history={history} isAuthenticated={isAuthenticated} toggleSearch={toggleSearch} />
      </Navi>
    </StyledHeader >
  );
};

export default Header;