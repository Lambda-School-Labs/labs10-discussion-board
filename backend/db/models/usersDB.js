const db = require('../dbConfig.js');

//Gets all of the users in the db
const getUsers = () => {
  return db('users').select('id', 'username', 'email', 'status');
};

//Gets a user by their id
const findById = id => {
  const getDiscussions = db('discussions').where('user_id', id);
  const getPosts = db('posts').where('user_id', id);
  const getDiscussionFollows = db('discussion_follows as df')
    .select('df.discussion_id', 'd.body')
    .join('discussions as d', 'd.id', 'df.discussion_id')
    .where('df.user_id', id);
  const getCategoryFollows = db('category_follows as cf')
    .select('cf.category_id', 'c.name')
    .join('categories as c', 'c.id', 'cf.category_id')
    .where('cf.user_id', id);
  const getNotifications = db('user_notifications as un')
    .select(
      'un.id',
      'un.category_id',
      'c.name as category_name',
      'un.discussion_id',
      'd.body as discussion_body',
      'un.post_id',
      'p.body as post_body',
      'un.created_at',
    )
    .leftOuterJoin('categories as c', 'c.id', 'un.category_id')
    .leftOuterJoin('discussions as d', 'd.id', 'un.discussion_id')
    .leftOuterJoin('posts as p', 'p.id', 'un.post_id')
    .where('un.user_id', id)
    .orderBy('un.created_at', 'desc');
  const getUser = db('users as u')
    .select(
      'u.id',
      'u.email',
      'u.username',
      'u.status',
      'us.avatar',
      'us.signature',
      'us.user_type',
      'u.password',
      'u.email_confirm',
      'u.uuid',
      'u.last_login',
    )
    .leftOuterJoin('user_settings as us', 'u.id', 'us.user_id')
    .where('u.id', id);

  const promises = [
    getDiscussions,
    getPosts,
    getUser,
    getDiscussionFollows,
    getCategoryFollows,
    getNotifications,
  ];
  return Promise.all(promises)
    .then(results => {
      let [
        getDiscussionsResults,
        getPostsResults,
        getUserResults,
        getDiscussionFollowsResults,
        getCategoryFollowsResults,
        getNotificationsResults,
      ] = results;
      if (!getUserResults.length) throw `User with ID ${id} does not exist.`;
      getUserResults[0].discussions = getDiscussionsResults;
      getUserResults[0].posts = getPostsResults;
      getUserResults[0].discussionFollows = getDiscussionFollowsResults;
      getUserResults[0].categoryFollows = getCategoryFollowsResults;
      getUserResults[0].notifications = getNotificationsResults;
      return getUserResults;
    });
};

const getUserName = id => {
  return db('users')
    .select('username')
    .where({ id })
    .first();
};

// gets password for user with given id
const getPassword = id => {
  return db('users')
    .select('password')
    .where({ id })
    .first();
};

// get the user type of a user
const getUserType = user_id => {
  return db('user_settings')
    .select('user_type')
    .where({ user_id })
    .first();
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
      'us.avatar'
    )
    .leftOuterJoin('user_settings as us', 'u.id', 'us.user_id')
    .whereRaw('LOWER(username) = ?', username.toLowerCase())
    .first();
};

const findByEmail = email => {
  return db('users as u')
    .select(
      'u.id',
      'u.username',
      'u.password',
      'u.email',
      'u.status',
      'us.avatar'
    )
    .leftOuterJoin('user_settings as us', 'u.id', 'us.user_id')
    .where({ email })
    .first();
};

// search through categories, discussions and posts
const searchAll = (searchText, orderType) => {
  const categoriesQuery = db('categories as c')
    .select('c.id', 'c.name', 'c.user_id', 'u.username', 'c.created_at')
    .leftOuterJoin('users as u', 'u.id', 'c.user_id')
    .whereRaw('LOWER(c.name) LIKE ?', `%${searchText.toLowerCase()}%`);

  const discussionsQuery = db('discussions as d')
    .select(
      'd.id',
      'd.body',
      'd.user_id',
      'u.username',
      'd.created_at',
      'd.category_id',
      'c.name as category_name',
      db.raw('SUM(COALESCE(dv.type, 0)) AS votes'),
    )
    .leftOuterJoin('discussion_votes as dv', 'dv.discussion_id', 'd.id')
    .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .orWhereRaw('LOWER(d.body) LIKE ?', `%${searchText.toLowerCase()}%`)
    .groupBy('d.id', 'u.username', 'c.name');

  const postsQuery = db('posts as p')
    .select(
      'p.id',
      'p.discussion_id',
      'p.created_at',
      'p.body',
      'p.user_id',
      'u.username',
      'd.body as discussion_body',
      'c.id as category_id',
      'c.name as category_name',
      db.raw('SUM(COALESCE(pv.type, 0)) AS votes'),
    )
    .leftOuterJoin('post_votes as pv', 'pv.post_id', 'p.id')
    .leftOuterJoin('users as u', 'u.id', 'p.user_id')
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .whereRaw('LOWER(p.body) LIKE ?', `%${searchText.toLowerCase()}%`)
    .groupBy('p.id', 'u.username', 'c.name', 'c.id', 'd.body');

  const promises = [categoriesQuery, discussionsQuery, postsQuery];
  return Promise.all(promises)
    .then(results => {
      const [categoriesResults, discussionsResults, postsResults] = results;
      const resultArr = [];
      categoriesResults.forEach(cat => resultArr.push({ type: 'categoriy', result: cat }));
      discussionsResults.forEach(dis => resultArr.push({ type: 'discussion', result: dis }));
      postsResults.forEach(post => resultArr.push({ type: 'comment', result: post }));
      resultArr.sort((a, b) => {
        if (orderType === 'desc') return b.result.created_at - a.result.created_at;
        return a.result.created_at - b.result.created_at;
      });
      return resultArr;
    });
};

//Checks if username exists (returns nothing if no, or the user object if yes)
const isUsernameTaken = username => {
  return db('users')
    .select('username')
    .where({ username })
    .first();
};

//Checks if email exists (returns nothing if no, or the user object if yes)
const isEmailTaken = email => {
  return db('users')
    .select('email')
    .where({ email })
    .first();
};

// get user with matching email in db
const getUserByEmail = email => {
  return db('users')
    .select('username', 'email_confirm')
    .where({ email });
};

// get user from given email if it has been confirmed
const getUserFromConfirmedEmail = email => {
  return db('users')
    .select('id', 'username')
    .where({ email })
    .andWhere('email_confirm', 'true')
    .first();
};

//Create a new user
const insert = user => {
  return db('users')
    .insert(user)
    .returning(['id', 'username', 'email']);
};

//Create a new user
const addEmailConfirm = (id, email_confirm) => {
  return db('users').update({ email_confirm }).where({ id });
};

//Insert user settings (with new created user)
const addUserSettings = settings => {
  return db('user_settings').insert(settings);
};

// confirm a user's email
const confirmEmail = email_confirm => {
  return db('users')
    .where({ email_confirm })
    .update('email_confirm', 'true');
};

//Update user settings
const updateUserSettings = settings => {
  return db('user_settings')
    .update(settings)
    .where('user_id', settings.user_id);
};

//Update avatar
const updateAvatar = (user_id, avatar) => {
  return db('user_settings')
    .where({ user_id })
    .update({ avatar }, ['avatar']); // update the avatar, returning the updated avatar
};

//Update signature
const updateSignature = (user_id, signature) => {
  return db('user_settings')
    .where({ user_id })
    .update({ signature }, ['signature']); // update the signature, returning the updated signature
};

// update a user
const update = (id, user) => {
  return db('users')
    .where({ id })
    .update(user)
    .returning(['id', 'username']);
};

// update password
const updatePassword = (id, password) => {
  return db('users')
    .where({ id })
    .update({ password });
};

// udpate e-mail and add an email-confirm token
const updateEmail = (id, email, email_confirm) => {
  return db('users')
    .update({ email, email_confirm })
    .where({ id });
};

const updateLastLogin = id => {
  return db('users')
    .update('last_login', Date.now())
    .where({ id })
    .returning('last_login');
};

// remove a user
const remove = id => {
  return db('users')
    .where({ id })
    .del();
};

module.exports = {
  getUsers,
  getPassword,
  getUserName,
  findById,
  findByUsername,
  findByEmail,
  searchAll,
  isUsernameTaken,
  isEmailTaken,
  getUserByEmail,
  getUserFromConfirmedEmail,
  getUserType,
  insert,
  addEmailConfirm,
  confirmEmail,
  addUserSettings,
  updateUserSettings,
  update,
  updateAvatar,
  updateSignature,
  updatePassword,
  updateEmail,
  updateLastLogin,
  remove
};
