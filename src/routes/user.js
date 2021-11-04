const express = require('express');
//const multer = require('multer');

//Controllers
const {
  getUsers,
  createNewUser,
  getUserById,
  deleteUserById,
 
  updateUsersById,
} = require('../controller/user.controller');

const router = express.Router();

router.get('/', getUsers);

router.post('/create', createNewUser);

router.get('/:id', getUserById);

router.delete('/:id', deleteUserById);

router.put('/update/:id', updateUsersById);

module.exports= router;
