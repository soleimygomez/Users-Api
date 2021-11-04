const express = require('express');
const userRoutes=require('./user.routes');

//definicion de Rutas
function routerApi(app){
    const router=express.Router();
    app.use('/api/v1',router);
    router.use('/user',userRoutes);
    // router.user('/rol',rolRoutes);
}


module.exports =routerApi;
