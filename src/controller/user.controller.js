const { getConnection, Sequelize } = require('../db/connection');
const { querys } = require('../services/user.service');

const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAll);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const createNewUser = async (req, res) => {
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
  if (
    email == null ||
    name == null ||
    lastName == null ||
    Role_idRole == 0 ||
    Client_idClient == 0 ||
    Company_idCompany == 0 ||
    Administrator_idAdministrator == 0
  ) {
    return res.status(400).json({ msg: 'Bad Request. Please fill all fields' });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input('idUser', Sequelize.Int, idUser)
      .input('email', Sequelize.Text, email)
      .input('name', Sequelize.Text, name)
      .input('lastName', Sequelize.Text, lastName)
      .input('status', Sequelize.Int, status)
      .input('isConfirmed', Sequelize.Int, isConfirmed)
      .input('createdAt', Sequelize.Date, createdAt)
      .input('registeredBy', Sequelize.Int, registeredBy)
      .input('Role_idRole', Sequelize.Int, Role_idRole)
      .input('Client_idClient', Sequelize.Int, Client_idClient)
      .input('Company_idCompany', Sequelize.Int, Company_idCompany)
      .input('Administrator_idAdministrator', Sequelize.Int, Administrator_idAdministrator)
      .input('updatedAt', Sequelize.Date, updatedAt)

      .query(querys.addNewUser);

    res.json({
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
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('idUser', req.params.idUser)
      .query(querys.getUserById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('idUser', req.params.idUser)
      .query(querys.deleteUser);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getTotalUsers = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request().query(querys.getTotalUsers);
  console.log(result);
  res.json(result.recordset[0]['']);
};

const updateUsersById = async (req, res) => {
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
  // validating
  if (
    email == null ||
    name == null ||
    lastName == null ||
    Role_idRole == 0 ||
    Client_idClient == 0 ||
    Company_idCompany == 0 ||
    Administrator_idAdministrator == 0
  ) {
    return res.status(400).json({ msg: 'Bad Request. Please fill all fields' });
  }

  try {
    const pool = await getConnection();
    await pool

      .request()
      .input('idUser', Sequelize.Int, idUser)
      .input('email',Sequelize.Text, email)
      .input('name',Sequelize.Text, name)
      .input('lastName', Sequelize.Text, lastName)
      .input('status', Sequelize.Int, status)
      .input('isConfirmed', Sequelize.Int, isConfirmed)
      .input('createdAt', Sequelize.Date, createdAt)
      .input('registeredBy',Sequelize.Int, registeredBy)
      .input('Role_idRole',Sequelize.Int, Role_idRole)
      .input('Client_idClient', Sequelize.Int, Client_idClient)
      .input('Company_idCompany', Sequelize.Int, Company_idCompany)
      .input('Administrator_idAdministrator', Sequelize.Int, Administrator_idAdministrator)
      .input('updatedAt', Sequelize.Date, updatedAt)

      .query(querys.updateUserById);
    res.json({
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
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.export = getUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  getTotalUsers,
  updateUsersById;
