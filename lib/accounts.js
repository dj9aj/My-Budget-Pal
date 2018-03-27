const express                   = require("express"),
      mongoose                  = require("mongoose"),
      passportLocalMongoose     = require("passport-local-mongoose"),
      User                      = require("../models/user");


// User.findOne({username: "andrea"}, fuction (req, res, next) {
//     if(err)
// });      

// var fetchData = function(req, res, next) {
//     User.findOne({username: req.params.username}, function (err, result) {
//         if (err) {
//             console.log(err)
//         }
//         console.log(result);
//         console.log(result.username + " is great!");

//     });
// }





exports.fetchData = function (currentUser) {
    User.findOne({username: currentUser}, function (err, result) {
        if (err) {
            console.log(err);
        }
        
        return result;
    }); 
}