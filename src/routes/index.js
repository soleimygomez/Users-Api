const express = require('express');
const userRoutes=require('./user');

//definicion de Rutas
function routerApi(app){
    const router=express.Router();
    app.use('/API/v1',router);
    router.use('/user',userRoutes);
}


module.exports =routerApi;