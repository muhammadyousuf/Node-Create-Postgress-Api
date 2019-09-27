const express = require("express");
const router = express.Router();
const CountriesController = require("../controllers/countries");

//router.get("/", CountriesController.countries_get_all);
router.get("/", CountriesController.countries_get_all_seq);

router.post("/", CountriesController.countries_create_country_seq);

router.get("/:countryId", CountriesController.countries_get_country_seq);

router.delete("/:countryId", CountriesController.countries_delete_country_seq);

router.patch("/", CountriesController.countries_update_country_seq);

module.exports = router;
