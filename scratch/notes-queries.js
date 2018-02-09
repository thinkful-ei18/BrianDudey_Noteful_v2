'use strict';

const knex = require('../knex');

knex.select(1).then(res => console.log(res));

knex
  .schema
  .createTable('folders', function (table) {
    table.increments();
    table.string('name');
  });

// knex
//   .select('')
//   .from('folders')
//   .then(response => (JSON.stringify(response, null, 4)));