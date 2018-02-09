'use strict';

const express = require('express');
const knex = require('../knex');
// Create an router instance (aka "mini-app")
const router = express.Router();
const { UNIQUE_VIOLATION } = require('pg-error-constants');

// Get All (and search by query)
/* ========== GET ALL FOLDERS ========== */
router.get('/folders', (req, res, next) => {

  knex
    .select('')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== GET SINGLE FOLDER (BY ID) ========== */
router.get('/folders/:id', (req, res, next) => {

  knex
    .select('id', 'name')
    .where('id', req.params.id)
    .from('folders')
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(next);

});

router.put('/folders/:id', (req, res, next) => {
  const { name } = req.body;

  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const updateItem = { name };

  knex('folders')
    .update(updateItem)
    .where('id', req.params.id)
    .returning(['id', 'name'])
    .then(([result]) => {
      if (result) {
        res.json(result);
      } else {
        next(); // fall-through to 404 handler
      }
    })
    .catch(err => {
      if (err.code === UNIQUE_VIOLATION && err.constraint === 'folders_name_key') {
        err = new Error('Folder name is already taken');
        err.status = 409;
      }
      next(err);
    });
});

// //-------------POST NEW FOLDER----------
// router.post('/folders', (req, res, next) => {
//   const { title, folder_id } = req.body;

//   /***** Never trust users. Validate input *****/
//   if (!req.body.title) {
//     const err = new Error('Missing `title` in request body');
//     err.status = 400;
//     return next(err);
//   }

//   const newItem = {
//     title: title,
//     folder_id: folder_id
//   };
//   let noteId;
//   knex.insert(newItem)
//     .into('folders')
//     .returning('id')
//     .then(([id]) => {
//       noteId = id;
//       return knex.select('folders.id', 'title', 'folder_id',
//         'folders.name as folder_name')
//         .from('folders')
//         .leftJoin('folders', 'folders.folder_id', 'folders.id')
//         .where('folders.id', noteId);
//     })
//     .then(([result]) => {
//       res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });


// ========== DELETE/REMOVE A SINGLE FOLDER ========== 
router.delete('/folders/:id', (req, res, next) => {
  knex.del()
    .where('id', req.params.id)
    .from('folders')
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        next(); // fall-through to 404 handler
      }
    })
    .catch(next);
});

module.exports = router;