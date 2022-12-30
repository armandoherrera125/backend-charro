const { Router } = require("express");
const { cajaCreate } = require("../controllers/cajaController");
const router = Router();
 router.post('/', cajaCreate);
module.exports = router;