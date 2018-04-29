const express       = require("express"),
      router        = express.Router(),
      passport      = require("passport"),
      User          = require("../models/user"),
      Receipt       = require("../models/receipt"),
      budgetCtrl    = require("../lib/budgetCtrl"),
      middleware    = require("../middleware/index");  


// Create a new receipt   
router.post("/budget/:username", (req, res, next) => {
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newReceipt = {receipt_type: req.body.type, category: req.body.category, description: req.body.description, value: req.body.value, author: author};
    Receipt.create(newReceipt, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            req.flash("success", "Receipt Added!");
            res.redirect("/budget/" + req.params.username);
        }
    });
});


// Receipt edit page
router.get("/budget/:username/:receipt_id/edit", middleware.checkReceiptOwnership, (req, res, next) => {
    Receipt.findById(req.params.receipt_id, (err, foundReceipt) => {
        if (err) {
            console.log(err);
            res.redirect("/budget/" + req.params.username);
        }
        
        const icons = budgetCtrl.displayCategory();
    
        res.render("receipts/edit", {receipt: foundReceipt, icons: icons});
    });
});


// Receipt update route
router.put("/budget/:username/:receipt_id", (req, res, next) => {
    var receipt = {receipt_type: req.body.type, category: req.body.category, description: req.body.description, value: req.body.value};
    Receipt.findByIdAndUpdate(req.params.receipt_id, receipt, {upsert: true, new: true}, (err, updatedReceipt) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "Receipt Updated!");
            res.redirect("/budget/" + req.params.username);
        }
    });
});


// Receipt destroy route
router.delete("/budget/:username/:receipt_id", (req, res, next) => {
    Receipt.findByIdAndRemove(req.params.receipt_id, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Receipt Deleted!");
            res.redirect("/budget/" + req.params.username);
        }
    });
});


module.exports = router;