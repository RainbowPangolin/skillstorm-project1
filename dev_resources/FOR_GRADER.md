All the important code is located in /src/main. 

Within main, back end code is in java/com/skillstorm/project1. This is my Spring web server and all core files for it are here. 

Within main, front end code is located in resources/frontend/src. This is my React + Typescript app.

Build scripts for windows are found in the root directory under /scripts. For deployment, the buildandrun.bat script will build the React app into the appropriate directory for Spring to be able to serve it. Visiting the base Spring url (so something like localhost:8080, or wherever it is deployed) will return the React app, allowing you to interact with the app. 

This project references some secret environment variables in application.yml. These variables point to an existing PostgreSQL database. To run the app, it must connect to this database. The relevant SQL file is in /dev_resources (the directory of this file). Import that SQL file into your own PostGreSQL database to run the program on another machine. 

