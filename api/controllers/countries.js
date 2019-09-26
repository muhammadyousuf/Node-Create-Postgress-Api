const { pool } = require("../config/config");
const tbl_country = require("../Model/Country");

exports.countries_get_all_seq = (req, res, next) => {
  try {
    tbl_country.findAll().then(results => {
      const response = {
        count: results.rowCount,
        countries: results.map(doc => {
          return {
            CountryID: doc.ID,
            CountryName: doc.Name.trim(),
            request: {
              type: "GET",
              url: "http://localhost:5000/country/" + doc.ID
            }
          };
        })
      };
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.countries_create_country_seq = (req, res, next) => {
  const country = {
    ID: req.body.countryID,
    Name: req.body.countryName
  };

  try {
    tbl_country.create(country).then(doc => {
      res.status(201).json({
        message: "Record Successfully Created.",
        createdCountry: {
          countryID: doc.ID,
          countryName: doc.Name,
          request: {
            type: "GET",
            url: "http://localhost:5000/country/" + doc.ID
          }
        }
      });
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error: error
    });
  }
};

exports.countries_get_country_seq = (req, res, next) => {
  const id = req.params.countryId;

  try {
    tbl_country
      .findAll({
        where: {
          ID: id
        }
      })
      .then(results => {
        if (results.length > 0) {
          res.status(200).json({
            countryID: results[0].ID,
            countryName: results[0].Name.trim(),
            request: {
              type: "GET",
              url: "http://localhost:5000/Country"
            }
          });
        } else {
          res.status(404).json({
            message: "No valid entry found for Provided ID"
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.countries_delete_country_seq = (req, res, next) => {
  const id = req.params.countryId;
  try {
    tbl_country
      .destroy({
        where: {
          ID: id
        }
      })
      .then(() => {
        res.status(200).json({
          message: "Country Deleted",
          request: {
            Type: "POST",
            url: "http://localhost:5000/Country",
            data: {
              countryID: "number",
              countryName: "string"
            }
          }
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.countries_update_country_seq = (req, res, next) => {
  const country = {
    ID: req.body.countryID,
    Name: req.body.countryName
  };

  try {
    tbl_country
      .update(
        {
          Name: country.Name
        },
        {
          where: {
            ID: country.ID
          }
        }
      )
      .then(doc => {
        res.status(200).json({
          message: "Country Updated",
          request: {
            type: "GET",
            url: "http://localhost:3000/country/" + country.ID
          }
        });
      });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error: error
    });
  }
};

//By Using Query Method

exports.countries_get_all = (req, res, next) => {
  try {
    pool.query("SELECT * FROM tbl_country", (error, results) => {
      if (error) {
        throw error;
      }
      const response = {
        count: results.rowCount,
        countries: results.rows.map(doc => {
          return {
            CountryID: doc.ID,
            CountryName: doc.Name.trim(),
            request: {
              type: "GET",
              url: "http://localhost:5000/country/" + doc.ID
            }
          };
        })
      };
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.countries_create_country = (req, res, next) => {
  const country = {
    ID: req.body.countryID,
    Name: req.body.countryName
  };

  try {
    pool.query(
      'INSERT INTO tbl_country("ID", "Name")VALUES ($1, $2)',
      [country.ID, country.Name],
      error => {
        if (error) {
          throw error;
        }
        res.status(201).json({
          message: "Record Successfully Created.",
          createdCountry: {
            countryID: country.ID,
            countryName: country.Name,
            request: {
              type: "GET",
              url: "http://localhost:5000/country/" + country.ID
            }
          }
        });
      }
    );
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error: error
    });
  }
};

exports.countries_get_country = (req, res, next) => {
  const id = req.params.countryId;
  console.log(id);
  try {
    pool.query(
      'SELECT * FROM tbl_country where "ID" =$1',
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rowCount > 0) {
          res.status(200).json({
            countryID: results.rows[0].ID,
            countryName: results.rows[0].Name.trim(),
            request: {
              type: "GET",
              url: "http://localhost:5000/Country"
            }
          });
        } else {
          res.status(404).json({
            message: "No valid entry found for Provided ID"
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.countries_delete_country = (req, res, next) => {
  const id = req.params.countryId;
  console.log(id);
  try {
    pool.query(
      'Delete FROM tbl_country where "ID" =$1',
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json({
          message: "Country Deleted",
          request: {
            Type: "POST",
            url: "http://localhost:5000/Country",
            data: {
              countryID: "number",
              countryName: "string"
            }
          }
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};
