/*jshint node: true*/
"use strict";
var config = {};
var dbOptions = {};
try {
	config = require("./config.local");
	dbOptions = config.dbOptions;
} catch (err) {
	console.warn("Could not find local config, using standard settings");
}
 
console.log(dbOptions);
if(dbOptions.length === 0) {
dbOptions = {
  dburl: 'localhost',
  dbuser: 'root',
  dbpassword: 'test'
};
}

exports.dbOptions = dbOptions;