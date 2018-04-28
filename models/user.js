const mongoose                  = require("mongoose"),
      passportLocalMongoose     = require("passport-local-mongoose");


      //Schema Setup
const UserSchema = new mongoose.Schema({

    username: String,
    password: String

});


UserSchema.plugin(passportLocalMongoose); // This adds the methods from passport-local-mongoose to the Schema


module.exports = mongoose.model("User", UserSchema); //Exports the Schema model