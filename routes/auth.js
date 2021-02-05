const express = require('express');
const router = express.Router();

const authMw = require('../middlewares/auth');
const mAuth = new authMw();

router.post('/refresh', mAuth.getRefreshToken);

module.exports = router;
