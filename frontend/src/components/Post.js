import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//globals
import {phoneP, phoneL, tabletP} from '../globals/globals.js'

// components
import { EditPostForm, VoteCount, Deleted, Avatar, Quote } from './index.js';

import { handlePostVote } from '../store/actions/index.js';

const PostWrapper = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-evenly;
 border-top: 1px solid black;
 border-bottom: 1px solid black;
 padding-top: 16px;
 padding-bottom: 16px;
 margin: 0 auto;

  @media ${phoneL} {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
    height: 400px
  }
`;

const PostSubWrapper = styled.div`
width: 80%
display: flex;
flex-direction: column;
`;

//make a global for the avatar box Background
const PostedBy = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 180px;
  height: 230px;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  box-shadow: 2px 3px 2px 2px grey;
  background-color: lavender;

  @media ${phoneL} {
    height: 170px;
    width: 294px;
  }

  .username {
    font-weight: bold;
    color: ${props => props.theme.postPostedByUsernameColor};
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const Elip = styled.div `
  display: inline;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  padding: 10px;
  padding-top: 0;

  p{
    margin: 0;
    margin-bottom: 10px;
  }
`;

const VoteAndBody = styled.div `
display: flex;
flex-direction: row;
height: 80%;
`;

const UserActions = styled.div`
display: flex;
flex-direction: row;
left: 0;

  @media ${phoneL}{
    bottom: 0
  }

 h4{
   cursor: pointer;
 }
`

const Post = ({
  post,
  loggedInUserId,
  historyPush,
  showEditPostForm,
  updateEditPostForm,
  handleRemovePost,
  handlePostVote,
  order,
  orderType,
  toggleAddReplyForm,
}) => {

  const {
    body,
    created_at,
    discussion_id,
    id,
    last_edited_at,
    post_votes,
    reply_to,
    user_id,
    username,
    user_vote,
    avatar
  } = post;

  const handleVote = type => handlePostVote(post.id, type, discussion_id, order, orderType);
  const handleEdit = () => updateEditPostForm(id);
  const handleRemove = () => handleRemovePost(loggedInUserId, id, historyPush, discussion_id);
  const userCreatedPost = loggedInUserId === user_id;
  return (
    <PostWrapper>
      <PostSubWrapper>
        { reply_to && <Quote reply_to = { reply_to } /> }
        <VoteAndBody>
          {/* <p>post votes: {post_votes}</p> */}
          <VoteCount 
          handleVote = { handleVote } 
          vote_count = { post_votes }
          user_vote = { user_vote }
          />
          <Elip>
              {last_edited_at && (
                <p>
                  Last edited: {moment(new Date(Number(last_edited_at))).fromNow()}
                </p>
              )}
              {body}
          </Elip>
        </VoteAndBody>
        <UserActions>
          {
            loggedInUserId !== 0 &&
            <h4 onClick = { () => toggleAddReplyForm(id) }><i class="fas fa-reply"></i>{' '} Reply {' '}</h4>
          }
          {userCreatedPost &&
          (showEditPostForm === id ? (
            <EditPostForm
              user_id={user_id}
              post_id={id}
              discussion_id={discussion_id}
              historyPush={historyPush}
              updateEditPostForm={updateEditPostForm}
            />
          ) : (
            <>
              <h4 onClick={handleEdit}>{'| '} Edit {' |'}</h4>            
            </>
          ))}
          {userCreatedPost && <h4 onClick={handleRemove}>{' '}<i class="fas fa-trash-alt"></i>{' '} Remove</h4>}
        </UserActions>
      </PostSubWrapper>
        <PostedBy>
          <Avatar height={'72px'} width={'72px'} src={avatar} />
          {
            username ?
            <Link className='username' to={`/profile/${user_id}`}>
              {username}, 
            </Link> :
            <Deleted />
          }
          <p>Created: {moment(new Date(Number(created_at))).fromNow()}</p>
        </PostedBy>
    </PostWrapper>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.users.user_id,
  avatar: state.users.avatar,
});

export default connect(
  mapStateToProps,
  {handlePostVote}
)(Post);