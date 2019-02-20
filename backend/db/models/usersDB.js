const db = require('../dbConfig.js');

//Gets all of the users in the db
const getUsers = () => {
  return db('users').select('id', 'username', 'email', 'status');
};

//Gets a user by their id
const findById = id => {
  const getDiscussions = db('discussions').where('user_id', id);
  const getPosts = db('posts').where('user_id', id);
  const getDiscussionFollows = db('discussion_follows as df').select('discussion_id').where('user_id', id);
  const getUser = db('users as u')
    .select('u.id', 'u.email', 'u.username', 'u.status', 'us.avatar')
    .leftOuterJoin('user_settings as us', 'u.id', 'us.user_id')
    .where('u.id', id);
  const promises = [ getDiscussions, getPosts, getUser, getDiscussionFollows ];
    return Promise.all(promises)
    .then(results => {
      let [ getDiscussionsResults, getPostsResults, getUserResults, getDiscussionFollowsResults ] = results;
      getUserResults[0].discussions = getDiscussionsResults;
      getUserResults[0].posts = getPostsResults;
      getUserResults[0].discussionFollows = getDiscussionFollowsResults.map(follows => follows.discussion_id);
      return getUserResults;
    });
};

// gets password for user with given id
const getPassword = id => {
  return db('users').select('password').where({ id }).first();
};

//Gets a user by their username
const findByUsername = username => {
  return db('users as u')
    .select(
      'u.id',
      'u.username',
      'u.password',
      'u.email',
      'u.status',
      'us.avatar',
    )
    .leftOuterJoin('user_settings as us', 'u.id', 'us.user_id')
    .whereRaw('LOWER(username) = ?', username.toLowerCase())
    .first();
};

//Create a new user
const insert = user => {
  return db('users')
    .insert(user)
    .returning(['id', 'username']);
};

//Insert user settings (with new created user)
const addUserSettings = settings => {
  return db('user_settings').insert(settings);
};

//Update user settings
const updateUserSettings = settings => {
  return db('user_settings').update(settings).where('user_id', settings.user_id);
};

//Update avatar
const updateAvatar = (user_id, avatar) => {
  return db('user_settings')
    .where({ user_id })
    .update({ avatar }, ['avatar']); // update the avatar, returning the updated avatar
};

//Update a user
const update = (id, user) => {
  return db('users')
    .where('id', Number(id))
    .update(user);
};

// update password
const updatePassword = (id, password) => {
  return db('users')
    .where({ id })
    .update({ password });
};

// remove a user
const remove = id => {
  return db('users')
    .where('id', Number(id))
    .del();
};

module.exports = {
  getUsers,
  getPassword,
  findById,
  findByUsername,
  insert,
  addUserSettings,
  updateUserSettings,
  update,
  updateAvatar,
  updatePassword,
  remove,
};
