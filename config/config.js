require ('dotenv').config ();

module.exports = {
  port: process.env.PORT,
  database: {
    dbURL: process.env.DBURL,
  },
};
