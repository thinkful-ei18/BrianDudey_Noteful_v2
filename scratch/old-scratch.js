// const searchTerm = 'cat';

// Get all the notes
// knex
//   .select('')
//   .from('notes')
//   .where('title', 'like', `%${searchTerm}%`)
//   .then(results => console.log(JSON.stringify(results, null, 4)));



// Get a specific note
// let noteId = 1001;
// knex
//   .select('')
//   .from('notes')
  // .where({
  //   id: `${noteId}`
  // })
  // .then(results => console.log(JSON.stringify(results, null, 4)));

//PUT/Update Single Note
// const updateObj = {
//   title: 'Sir Scratch-A-Lot',
//   content: 'The best new M-Cat around'
// };

// knex
//   .select('')
//   .from('notes')
//   .where({
//     id: `${noteId}`
//   })
//   .update({
//     title: `${updateObj.title}`,
//     content: `${updateObj.content}`
//   })
//   .returning(['id', 'title', 'content'])
//   .then(results => console.log(JSON.stringify(results, null, 4)));

//POST/Create New Note
// const newItem = {
//   title: 'Say What?',
//   content: 'What to say when you aren\'t sure what\'s being said'
// };

// knex('notes')
//   .insert({
//     title: `${newItem.title}`,
//     content: `${newItem.content}`
//   })
//   .returning(['id', 'title', 'content'])
//   .then(results => console.log(JSON.stringify(results, null, 4)));

//DELETE/DELETE a Note
// const noteId = 1001;

// knex('notes')
//   .where ({
//     id: `${noteId}`
//   })
//   .del()
//   .then(results => console.log(JSON.stringify(results, null, 4)));