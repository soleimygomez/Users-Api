const { Sequelize }=require('sequelize');
var dotenv = require("dotenv");
dotenv.config();


const sequelize = new Sequelize(
  'avanzodb_pr', 'admin', 'avanzo2019!',
  {
    host: 'avanzopruebas.cdwxx4pbv9v7.us-east-2.rds.amazonaws.com',
    port: 3306,
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 1,
      require: undefined,
      idle: undefined
    },
    
    log: function (str) {
      // do your own logging
      console.log("####################################################################11");
      console.log(str);
      console.log("####################################################################22");

    }
  }
);
var db = {};
try{
    sequelize.authenticate();
    console.log('la conexion  se ha establecido correctamente');
}
catch(error){
    console.error('No se es posible establecer conexion con la base de datos',error);
}
 
db.user = require('../../models/user')(sequelize, Sequelize);
db.role = require('../../models/role')(sequelize, Sequelize);

 


module.exports= db;
