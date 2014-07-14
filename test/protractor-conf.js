exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],


/*
capabilities: {
  'browserName': 'phantomjs',
  'phantom.binary.path': 'sommer-2014/node_modules/phantomjs/bin'
},
*/


  capabilities: {
    'browserName': 'chrome'
  },


  baseUrl: 'http://localhost:3000/public/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 40000
  }

};

//npm run protractor

