const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send("All films"));

module.exports = router;