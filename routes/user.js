const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_conrtoller');
const mUserController = new userController();

router.post('/', mUserController.register);
router.post('/login', mUserController.signIn);
router.get('/:email', mUserController.retrieveOne);

router.put('/:email', mUserController.update);
router.delete('/:email', mUserController.delete);

module.exports = router;
