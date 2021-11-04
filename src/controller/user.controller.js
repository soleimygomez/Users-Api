const { sequelize } = require('../db/connection');
const { querys } = require('../services/user.service');
const {
  getUserAll,
  createUser,
  updateUser,
  deleteUser,
  FindByUser
} = require('./../services/user.service');
const { validationResult } = require('express-validator');

const getUsers = async (req, res, next) => {
  //Validate input
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ message: errors.errors[0].msg });
    return;
  }
  try {
    const result = await getUserAll();
    if (result.status === 200) {
      res.status(result.status).json(result.data);
    } else {
      res.status(result.status).json(result.message);
    }
    next();
  } catch (e) {
    res
      .status(500)
      .json('No es posible obtener la información en este momento.');
  }
};

const createNewUser = async (req, res, next) => {
  //variables
  const {
    idUser,
    email,
    name,
    lastName,
    status,
    isConfirmed,
    createdAt,
    registeredBy,
    Role_idRole,
    Client_idClient,
    Company_idCompany,
    Administrator_idAdministrator,
    updatedAt,
  } = req.body;

  // validating
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //res.status(422).json({ message: errors.errors[0].msg });
    res.status(422).json({ message: errors.errors[0].msg });
    return;
  }
  //logic
  // const user={idUser,email, name, lastName,status,isConfirmed,
  //   createdAt,
  //   registeredBy,
  //   Role_idRole,
  //   Client_idClient,
  //   Company_idCompany,
  //   Administrator_idAdministrator,
  //   updatedAt,};

  try {
    const result = await createUser(req.body);
    res.status(result.status).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: 'No es posible realizar el registro en este momento.' });
  }
};

const getUserById = async (req, res,next) => {

  const {id}=req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ message: errors.errors[0].msg });
    return;
  }
  try {
    const result = await FindByUser(id);
    res.status(result.status).json(result);
    res.json().data;
  } catch (e) {
    res
      .status(500)
      .json({ message: 'No es posible realizar el registro en este momento.' });
  }
};

const deletUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteUser(id);
    if (result.status === 200) {
      res.status(result.status).json(result.message);
    } else {
      res.status(result.status).json(result.message);
    }
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json('No es posible eliminar el usuario en este momento.');
  }
};

const updateUsers = async (req, res, next) => {
  //Variables
  const {
    email,
    name,
    lastName,
    status,
    isConfirmed,
    createdAt,
    registeredBy,
    Role_idRole,
    Client_idClient,
    Company_idCompany,
    Administrator_idAdministrator,
    updatedAt,
  } = req.body;

  const { id } = req.params;
  // validating
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //res.status(422).json({ message: errors.errors[0].msg });
    res.status(422).json({ message: errors.errors[0].msg });
    return;
  }

  try {
    const result = await updateUser(req.body, id);
    res.status(result.status).json({ message: result.message });
  } catch (e) {
    res
      .status(500)
      .json({ message: 'No es posible realizar el registro en este momento.' });
  }
};

module.exports = {
  getUsers,
  createNewUser,
  getUserById,
  deletUser,
  updateUsers,
};
