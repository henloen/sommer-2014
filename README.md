###The Beauty of Data###

by Lars Nedberg & Henrik Loennechen

####What is it?####
We have two parts of the application, the admin part and the user part.
The user part is basically a fancy, radio button-styled questionnaire.
The answers obtained are saved in a database, and can be viewed in the admin part of the application.
Both parts of the application can be accessed from the main menu that is the first screen that welcomes you when accessing the application.

####Documentation####
A documentation on the concept, the use of the application, the intended users, the technical solutions chosen and more can be obtained by asking Henrik.

####How to set up and run the application#####
1. Clone this repo
2. Download and install [node.js](http://nodejs.org/download/) (version 0.10.29 was used during development).
3. Set up a working [mysql server](http://dev.mysql.com/downloads/windows/installer/5.6.html) and create the two tables it needs by using the sql scripts in the sql folder.
4. Configure your own config.local.js file to define the url you will access the mysql server on. The file should follow this example:

    ```javascript
    /*jshint node: true*/
    "use strict";
    var dbOptions = {
      dburl: 'yourDBurl',
      dbuser: 'yourDBuser',
      dbpassword: 'yourDBpassword'
    }
    exports.dbOptions = dbOptions; 
    ```
    
5. Run *npm start* from the root level of the project. This should install all further dependencies and fire up the application.

6. Access the application at yourip:theportspecified (e.g. localhost:3000).

For more detailed instructions, please consult the documentation.



