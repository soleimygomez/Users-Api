const express = require('express');
const userRoutes=require('./user.router');

//definicion de Rutas
function routerApi(app){
    const router=express.Router();
    app.use('/api/v1',router);
    router.use('/users',userRoutes);
    // router.user('/rol',rolRoutes);
}


module.exports =routerApi;
