const { Router } = require('express');
const {
  getUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  getTotalUsers,
  updateUsersById,
} = require('../controller/user.controller');

const router = Router();

router.get('/', getUsers);

router.post('/create', createNewUser);

router.get('/count', getTotalUsers);

router.get('/:id', getUserById);

router.delete('/:id', deleteUserById);

router.put('/update/:id', updateUsersById);

module.exports= router;
