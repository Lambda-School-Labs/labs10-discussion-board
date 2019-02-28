import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import {phoneP, tabletP, } from '../globals/globals';

// components
import { PostCount, VoteCount, Deleted } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const HotDiscussionWrapper = styled.div`
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;
  box-shadow: ${props => props.theme.topDiscussionWrapperBxShdw};
  &:hover {
    // background-color: ${props => props.theme.topDiscussionWrapperBgHov};
  }

  .title {
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    color: ${props => props.theme.topDiscussionTitleColor};
    margin-bottom: 15px;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    @media ${tabletP}{
      display: flex;
      align-items: center;
      font-size: 18px;
      @media${phoneP}{
        display: flex;
        font-size: 18px;
      }
    }
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .timestamp{
    color: ${props => props.theme.topDiscussionCatColor};
    @media ${tabletP}{
      margin: 10px;
    }
  }
  .category {
    text-decoration: none;
    color: ${props => props.theme.topDiscussionCatColor};
    a {
      margin-left: 5px;
      margin-top: 5px;
      text-decoration: none;
      font-size: 16px;
      font-style: oblique;
      font-weight: bold;
      color: ${props => props.theme.topDiscussionCatColor};
      cursor: pointer;
      @media ${tabletP}{
        margin: 10px;
        padding: 14px;
        font-size: 14px;
        @media${phoneP}{
          font-size: 14px;
          align-items: center;
          padding: 20px;
        }
      }
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
  .nameanddate {
    text-decoration: none;
    font-size: 14px;
    font-style: italic;
    color: ${props => props.theme.topDiscussionNameDateColor};
    @media ${tabletP}{
      margin: 2px;
      display: flex;
      align-items: center;
      width: 20px;
      padding: 10px;
      font-size: 12px;
    }
    &:hover {
      text-decoration: underline;
      background-color: ${props => props.theme.topDiscussionNameDateColorHov};
      cursor: pointer;
    }
  }
`;

const Vote = styled.div `
display: flex;
margin-right: 10px;
  @media${phoneP}{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
}
`;

const Contenter = styled.div `
padding: 10px;
  @media${phoneP}{
    display: none;
    width: 240px;
  }
}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const HotDiscussion = ({ discussion, handleDiscussionVote }) => {
  const {
    body,
    category_id,
    category_name,
    created_at,
    id,
    post_count,
    title,
    user_id,
    username,
    vote_count,
    user_vote,
  } = discussion;

  const handleVote = type => handleDiscussionVote(id, type);
  return (
    <HotDiscussionWrapper>
      <VoteCount
        handleVote={handleVote}
        vote_count={vote_count}
        user_vote={user_vote}
      />
      <div className='content'>
        <div>
          <Link to={`/discussion/${id}`} className='title'>
            {title}
          </Link>
          &#8201;
          <span className='category'>
            <Link to={`/discussions/category/${category_id}`} className='category'>
              /d/{category_name}
            </Link>
          </span>
        </div>

        <div>
          {
            username ?
            <Link to={`/profile/${user_id}`} className='nameanddate'>
              {username}
            </Link> :
            <Deleted />
          }
          &#8201;
          <span className='timestamp'>
            {' '}
            - {moment(new Date(Number(created_at))).fromNow()}
          </span>
        </div>
        <Contenter>
          <Link to={`/discussion/${id}`} className='category'>{body}</Link>
        </Contenter>
        
      </div>
      <Vote><PostCount post_count={post_count || 0} /></Vote>
    </HotDiscussionWrapper>
  );
};

export default HotDiscussion;
