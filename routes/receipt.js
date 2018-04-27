const express       = require("express"),
      router        = express.Router(),
      passport      = require("passport"),
      User          = require("../models/user"),
      Receipt       = require("../models/receipt"),
      budgetCtrl    = require("../lib/budgetCtrl"),
      middleware    = require("../middleware/index");  


// Create a new receipt   
router.post("/budget/:username", function (req, res, next) {
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newReceipt = {receipt_type: req.body.type, category: req.body.category, description: req.body.description, value: req.body.value, author: author};
    Receipt.create(newReceipt, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/budget/" + req.params.username);
        }
    });
});

// Render Receipt edit page
router.get("/budget/:username/:receipt_id/edit", middleware.checkReceiptOwnership, function (req, res, next) {
    Receipt.findById(req.params.receipt_id, function (err, foundReceipt) {
        if (err) {
            console.log(err);
            res.redirect("/budget/" + req.params.username);
        }
        
        const icons = budgetCtrl.displayCategory();
    
        res.render("receipts/edit", {receipt: foundReceipt, icons: icons});
    });
});

// Receipt update
router.put("/budget/:username/:receipt_id", function (req, res, next) {
    var receipt = {receipt_type: req.body.type, category: req.body.category, description: req.body.description, value: req.body.value};
    Receipt.findByIdAndUpdate(req.params.receipt_id, receipt, {upsert: true, new: true}, function (err, updatedReceipt) {
        console.log(updatedReceipt);
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/budget/" + req.params.username);
        }
    });
});

// Receipt destroy route
router.delete("/budget/:username/:receipt_id", function (req, res, next) {
    Receipt.findByIdAndRemove(req.params.receipt_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/budget/" + req.params.username);
        }
    });
});

module.exports = router;