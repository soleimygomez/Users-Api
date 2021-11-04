const express = require('express');
//const multer = require('multer');

//Controllers
const {
  getUsers,
  createNewUser,
  getUserById,
  deletUser,
  updateUsers
 
} = require('../controller/user.controller');

const router = express.Router();

router.get('/', getUsers);

router.post('/create', createNewUser);

router.get('/:id', getUserById);

router.delete('/:id', deletUser);

router.put('/update/:id', updateUsers);

module.exports= router;
