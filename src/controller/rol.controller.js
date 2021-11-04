const {
    getRolAll,
    createRole,
    updateRole,
    deleteRole,
    FindByRole
  } = require('./../services/rol.service');
  const { validationResult } = require('express-validator');
  
 //***************************************************** */
 //*** Get */ 
 //****************************************************** */

  const getRoles = async (req, res, next) => {
    //Validate input
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      res.status(422).json({ message: errors.errors[0].msg });
      return;
    }
    try {
      const result = await getRolAll();
      if (result.status === 200) {
        res.status(result.status).json(result.data);
      } else {
        res.status(result.status).json(result.message);
      }
      next();
    } catch (e) {
      res
        .status(500)
        .json('No es posible obtener la información en este momento.');
    }
  };
  
  
const getRoleById = async (req, res,next) => {

    const {id}=req.params;
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      res.status(422).json({ message: errors.errors[0].msg });
      return;
    }
    try {
      const result = await FindByRol(id);
      res.status(result.status).json(result);
      res.json().data;
    } catch (e) {
      res
        .status(500)
        .json({ message: 'No es posible realizar el registro en este momento.' });
    }
  };

  //***************************************************** */
 //*** Post*/ 
 //***************************************************** */

const createNewRole = async (req, res, next) => {
    //variables
    const {idRole,priority,roleName,createdAt,registeredBy,updatedAt
    } = req.body;
  
    // validating
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      //res.status(422).json({ message: errors.errors[0].msg });
      res.status(422).json({ message: errors.errors[0].msg });
      return;
    }
    
    try {
      const result = await createRole(req.body);
      res.status(result.status).json(result);
    } catch (e) {
      res
        .status(500)
        .json({ message: 'No es posible realizar el registro en este momento.' });
    }
  };

  //***************************************************** */
 //*** Put*/ 
 //***************************************************** */

const updateRole = async (req, res, next) => {
    //Variables
    const {priority,roleName,createdAt,registeredBy,updatedAt
    } = req.body;
  
  
    const { id } = req.params;
    // validating
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //res.status(422).json({ message: errors.errors[0].msg });
      res.status(422).json({ message: errors.errors[0].msg });
      return;
    }
  
    try {
      const result = await updateRole(req.body, id);
      res.status(result.status).json({ message: result.message });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'No es posible realizar el registro en este momento.' });
    }
  };
  
  //***************************************************** */
   //*** Delete*/ 
   //***************************************************** */
  
  const deletRole = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const result = await deleteRole(id);
      if (result.status === 200) {
        res.status(result.status).json(result.message);
      } else {
        res.status(result.status).json(result.message);
      }
      next();
    } catch (e) {
      console.log(e);
      res.status(500).json('No es posible eliminar el usuario en este momento.');
    }
  };
  
  module.exports = {
    getRolAll,
    getRoleById,
    createNewRole,
    updateRole,
    deletRole
  };
  