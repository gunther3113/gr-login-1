# GR Login 1

A sample login application.

The application does not work at the eight hour mark.  This is its current state.

In addition to the large problem of not being functional the following issues would need to
dealt with before this became a production system.

Shortcuts:

For expediency the user object would be returned with their relevant posts so that one
property could be used throughout the system to both render content and manage the logged in / 
logged out state.  In general these are seperate concerns and authentication/authorization,
identity information (like first and last name) and feedback posts are separate concerns and 
should be segregated.

Security: 

Passwords are not salted and hashed just a few times, normally much more is required.
Sensitive information like names and email addresses should be encrypted at rest.
There is basic parameter scrubbing but there probably needs to be more in order to avoid
injection attacks.
Parameters are not checked on the server or the client.

Functionality:

No way to change passwords, reset passwords, find forgotten passwords.
Slack webhook not implemented.

Testing:
This does not have any testing at all other than what create-react generated.  
It would need tests on both the client and server to even be considered for production.


Positives:

The earlier versioin does deploy to Heroku and allows for reading and writing to/from Postgress both
locally and remotely.
It does generate a production build.
It is simple without too many extras, the database / session approach is pretty standard, it uses 
bootstrap which has a lot of decent components to plug in and the client organization structure is pretty
flat with places to grow.  



## Prerequisites
In order to run this project node and yarn both need to have been installed.

Set your database connection information locally in a .env file.  e.g.

DATABASE_URL=postgresql://test:test@localhost:5432/postgres

## Development Timeline

- 1:30 min -  basic node/ react template working and deployed on Heroku
- 3:30 min -  debugging database queries
- 5:15 min - able to read and write to database through the app on Heroku
- 6:30 check point 1
- 8:00 basic apis written, ui underway, still in the process of implementing though.





## Todo 
- sanitize inputs
- commas
- imports
- node tests
- client tests
- client side validation
- server side validation


## References:


Initial template: https://github.com/nburgess/react-express-example
 
https://github.com/timtamimi/node.js-passport.js-template


