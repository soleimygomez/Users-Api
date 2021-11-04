// const express = require('express');
const userRoutes=require('./user');

//definicion de Rutas
// function routerApi(app){
//     const router=express.Router();
//     app.use('/API/v1',router);
//     router.use('/user',userRoutes);
// }
function routerApi(app) {
    app.use('/API/v1/users', userRoutes);
    // app.use('/users', usersRouter);
    // app.use('/categories', categoriesRouter);
  }

module.exports =routerApi;