RESTFUL ROUTES

name    url                                  verb       desc.
==============================================================================================

HOME    /users/:username                     GET        Display user budget home page   

NEW     /users/:username/transactions/new    GET        Displays form to add a new transaction
CREATE  /users/:username/transactions        POST       Add a new transaction to DB
SHOW    /users/:username/transactions/:id    get        Shows info about one transaction    