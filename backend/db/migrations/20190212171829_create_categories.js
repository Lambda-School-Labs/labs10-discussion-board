exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', function(tbl) {
      // Primary Key 'id'
      tbl.increments();

      //Foreign Key 'users_id'
      tbl
        .integer('user_id')
        .references('id')
        .inTable('users');

      // Other Columns
      tbl
        .string('name')
        .notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('categories');
  };
  