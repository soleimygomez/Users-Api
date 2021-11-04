const pool = require('../db/connection');
const dbSequelize = require('../db/connection');

//constants
const todayDate = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }).replace(/\P.+/, '').replace(/\A.+/, '');
   
    
   const getUserAll = async () => {

    try {
      let userRow = await dbSequelize.user.findAll({
        attributes: ['idUser'],
      });
      if (userRow) {
        return { status: 200, message: "", data: userRow };
      } else {
        return { status: 500, message: "Error interno del servidor." };
      }
    }  catch (e) {
      console.log("E - 71: ", e);
      return { status: 500, message: "Error interno del servidor." };
    }
  };

  const createUser = async (body) => {
    
  //NewUser
  const {  idUser,email,name, lastName,
    status,isConfirmed,registeredBy,Role_idRole,
    Client_idClient,Company_idCompany,Administrator_idAdministrator,
    updatedAt
  }=body;
  
  const newUser ={  idUser,email,name, lastName,
    status,isConfirmed,registeredBy,Role_idRole,
    Client_idClient,Company_idCompany,Administrator_idAdministrator,
    updatedAt
  }
  newUser.createdAt = todayDate;

  try {
    await pool.query('START TRANSACTION');
    const userQuery = await pool.query('INSERT INTO User SET ?', [newUser]);
    //Insert in user
    await pool.query('COMMIT');

    console.log("User insertado ",userQuery);
   
    return { status: 200, message: "El usuario ha sido registrado exitosamente." };
   
  }
  catch (e) {
    console.log("E", e);
    await pool.query('ROLLBACK');
    return { status: 500, message: "Error interno del servidor. Por favor, intente más tarde." };
  }
};
  
const updateUser = async (body)=>{
  //NewUser
  const {  idUser,email,name, lastName,
    status,isConfirmed,registeredBy,Role_idRole,
    Client_idClient,Company_idCompany,Administrator_idAdministrator,
    updatedAt
  }=body;
  try{
  await pool.query('START TRANSACTION');

  const userQuery = await pool.query('UPDATE User SET ? where idUser = ?', [body.idUser]);
  return { status: 200, message: "El usuario ha sido actualizado exitosamente." };

  }
  catch (e) {
    console.log(e);
    await pool.query('ROLLBACK');

    return { status: 500, message: "Error interno del servidor. Por favor, intente más tarde." };

  }
};

const deleteUser= async(userId)=>{

  try {
    const userQuery = await pool.query('UPDATE User SET isDeleted = ? where idUser = ?', [userId]);
    return { status: 200, message: { message: "El usuario ha sido eliminado exitosamente." } };
  } catch (e) {
    console.log(e);
    return { status: 500, message: "Error interno del servidor." };
  }
};
  
  module.exports={
     getUserAll,createUser,updateUser,deleteUser
  }