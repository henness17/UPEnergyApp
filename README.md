# UP Energy App

###Collaborators
* Christian Schweizer
* Koby Craig
* Liam Cassidy
* Matt Garcia
* Regan Townsend
* Ryan Henness

Application Structure
=================

> Structure and purpose of our Node application components

    .
    ├── public              # Files client must have access to (css, images, js, etc.)
    ├── routes              # Determines how an application responds to a client request
    │   ├── passport.js         # Connects to Passport, which enables Facebook authentication
    │   ├── pg.js               # Connects to our PostgreSQL server hosted by Heroku.com
    │   └── routes.js           # General application routes, such as the index 
    │   └── calculators         # Holds the mechanical calculations, and functions
    │       └── transportation.js   # Holds the transportation calculations, and functions
    ├── views               # Page templates 
    │   └── partials            # Common components that are included in more than one view, such as a header            
    ├── app.json            # Application information   
    ├── index.js            # Initializes application      
    ├── package.json        # Defines Node packages needed by application
    ├── Procfile            # Defines command run by the server on startup
    └── README.md           


DEV NOTES:
- Implement Promises for db calls
- Create node package for db functions
