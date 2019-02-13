const db = require('../dbConfig.js');

//Gets all of the users in the db
const getUsers = () => {
  return db('users');
};

//Gets a user by their id
const findById = (id) => {
  return db('users')
    .where({ id: Number(id) })
    .first(); 
}

//Create a new user
const insert = (user) => {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

//Update a user
function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

module.exports = {
  getUsers,
  findById,
  insert,
  update,
};
