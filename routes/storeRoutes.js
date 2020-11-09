const express = require("express");
const router = express.Router();
const storeControllers = require("../controllers/storeControllers");

router.get("/", storeControllers.getStores);
router.post("/", storeControllers.createStore);

module.exports = router;
