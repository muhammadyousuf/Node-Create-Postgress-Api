const express = require("express");
const router = express.Router();
const CountriesController = require("../controllers/countries");

router.get("/", CountriesController.countries_get_all);

router.post("/", CountriesController.countries_create_country);

router.get("/:countryId", CountriesController.countries_get_country);

router.delete("/:countryId", CountriesController.countries_delete_country);

module.exports = router;
