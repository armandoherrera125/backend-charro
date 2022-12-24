const { Router } = require("express");
const { ordersGet, orderCreate } = require("../controllers/ordersController");
const router = Router();
router.get( '/', ordersGet );
 router.post('/', orderCreate);
// router.put('/:id', productEdit);
// router.delete('/:id', productDelete);
module.exports = router;