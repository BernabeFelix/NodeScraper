// grab the house model we just created
const express = require('express');
const router = express.Router();
const houseCtrl = require('./house/house_controller');

// server routes ===========================================================
// handle things like api calls
// authentication routes
router.route('/houses')
  .delete(houseCtrl.deleteHouses)
  .get(houseCtrl.getHouses)
  .post(houseCtrl.createHouse)
  .patch(houseCtrl.updateHouses);
// frontend routes =========================================================
// route to handle all angular requests
module.exports = router;