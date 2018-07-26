const express = require("express");
const path = require('path');
const router = express.Router();

router.use(express.static(path.join(__dirname, '../build')));
// send index file from build folder on `/`
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = router;
