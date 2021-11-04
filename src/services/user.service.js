const pool = require('../db/connection');
const dbSequelize = require('../db/connection');

//constants
const todayDate = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }).replace(/\P.+/, '').replace(/\A.+/, '');

    //__________________________________________________________________________//
    //All User
   const getUserAll = async () => {

    try {
      let userRow = await dbSequelize.user.findAll({
        attributes: ['idUser', 'email', 'name', 'lastName','status','isConfirmed',
        'createdAt','registeredBy','Role_idRole','Client_idClient','Company_idCompany',
        'Administrator_idAdministrator', 'updatedAt',],
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


  //__________________________________________________________________________//
  //Create  USer
  const createUser = async (body) => {

  //NewUser
  const {  idUser,email,name, lastName,
    status,isConfirmed, createdAt,registeredBy,Role_idRole,
    Client_idClient,Company_idCompany,Administrator_idAdministrator,
    updatedAt
  }=body;


  const existeUser = await dbSequelize.user.findOne({
    where: {
        name: body.name,
        lastName: body.lastName,
    }});

    if (existeUser) {
      return { status: 500, message: 'Ya existe ese usuario ' }
      };

  try {
    let newUser= await dbSequelize.user.create({
    idUser,email,name, lastName,
    status,isConfirmed, createdAt:todayDate,registeredBy,Role_idRole,
    Client_idClient,Company_idCompany,Administrator_idAdministrator,
    updatedAt
    })
    if(newUser){
      console.log("User insertado ",newUser);

    return { status: 200, message: "El usuario ha sido registrado exitosamente." };

    }

  }
  catch (e) {
    console.log("E", e);

    return { status: 500, message: "Error interno del servidor. Por favor, intente más tarde." };
  }
};

  //__________________________________________________________________________//
  //Update User
const updateUser = async (body,id)=>{
  //NewUser
  const { email,name, lastName,
    status,isConfirmed, createdAt,registeredBy,Role_idRole,
    Client_idClient,Company_idCompany,Administrator_idAdministrator,
    updatedAt
  }=body;



  try{
    const user = await dbSequelize.user.findOne({
    attributes:[ 'idUser','email','name', 'lastName',
      'status','isConfirmed', 'createdAt','registeredBy','Role_idRole',
      'Client_idClient','Company_idCompany','Administrator_idAdministrator',
      'updatedAt'],
      where:{
         idUser:id
      }
   });
   if(user){

          await user.update({
            email,name, lastName,
            status,isConfirmed,registeredBy,Role_idRole,
            Client_idClient,Company_idCompany,Administrator_idAdministrator,
            updatedAt
          })

        return { status: 200, message: "El usuario ha sido Actualizado exitosamente." ,user};

    }
     else {
      return { status: 500, message: "No es posible Encontrar Ese Usuario." };
      }

  }

    catch (e) {
      console.log(e);
      return { status: 500, message: "Error interno del servidor." };
    }
};
//__________________________________________________________________________//
  //Delete User
const deleteUser= async(id)=>{

  try {
    const userDelete = await dbSequelize.user.destroy({where:{
       idUser:id
    }});
    return { status: 200, message: "El usuario ha sido Eliminado exitosamente." ,userDelete};

  } catch (e) {
    console.log(e);
    return { status: 500, message: "Error interno del servidor." };
  }
};

  //__________________________________________________________________________//
  //Busscar User
const FindByUser = async (id)=>{

  try{
    const user = await dbSequelize.user.findOne({
    attributes:[ 'idUser','email','name', 'lastName',
      'status','isConfirmed', 'createdAt','registeredBy','Role_idRole',
      'Client_idClient','Company_idCompany','Administrator_idAdministrator',
      'updatedAt'],
      where:{
         idUser:id
      }
   });
   if(user){
         return { status: 200, message: "El usuario ha Encontrado exitosamente." ,user};
    }
     else {
      return { status: 500, message: "No es posible Encontrar Ese Usuario." };
      }

  }
   catch (e) {
      console.log(e);
      return { status: 500, message: "Error interno del servidor." };
    }
};

  module.exports={
     getUserAll,createUser,updateUser,deleteUser,FindByUser
  }
