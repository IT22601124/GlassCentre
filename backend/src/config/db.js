const admin = require('./config'); 

const db = admin.firestore();

module.exports = db;