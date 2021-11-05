const express = require('express');
const routerApi=require('./src/routes');

const { logErrors, errorHandler,boomErrorHandler } = require('./middlewares/error.handler');
const app=express();
const port = 3001;

app.use(express.json());
// app.use('/api/v1',router);


app.get('/api/v1',(req,res)=>{
    res.send('Server en Express');
})

 routerApi(app);
 //Middleware

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//en produccion no deben haber console.log
app.listen(port,()=>{
    console.log('puerto : '+port);
})

