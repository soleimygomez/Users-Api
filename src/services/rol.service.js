const dbSequelize = require('../db/connection');

     
 //***************************************************** */
 //*** Get All Rol */ 
    const getRolAll = async () => {

        try {
          let rolRow = await dbSequelize.role.findAll({
            attributes: ['idRole','priority','roleName','createdAt','registedBy','updateAt'],
          });
          if (rolRow) {
            return { status: 200, message: "", data: rolRow };
          } else {
            return { status: 500, message: "Error interno del servidor." };
          }
        }  catch (e) {
          console.log("E - 71: ", e);
          return { status: 500, message: "Error interno del servidor." };
        }
      };

module.exports={getRolAll,
}