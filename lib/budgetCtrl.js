const express                   = require("express"),
      mongoose                  = require("mongoose"),
      passportLocalMongoose     = require("passport-local-mongoose"),
      User                      = require("../models/user"),
      Receipt                   = require("../models/receipt");
      


const budgetCtrlObj = {

    calculateTotals: (receipts) => {
        let totalInc = 0, totalExp = 0, totalBudget = 0;  
        
        receipts.forEach((receipt) => {
            if(receipt.receipt_type === "inc") {
                totalInc += receipt.value;
            } else {
                totalExp += receipt.value;
            }
        });
        
        totalBudget = totalInc - totalExp;
        
        return {
            totalInc: totalInc,
            totalExp: totalExp,
            totalBudget: totalBudget
        }
    },

    calculatePercentage: (totalInc, totalExp) => {
        let percentage;
    
        if (totalInc > 0) {
            percentage = Math.round((totalExp / totalInc) * 100);
        } else {
            percentage = "---";
        }
        return percentage;   
    },

    displayCategory: () => {

        const icons = {
            transport: "transport.png",
            groceries: "groceries.png",
            eating_out: "eating_out.png",
            bills: "bills.png",
            entertainment: "entertainment.png",
            holidays: "holidays.png",
            shopping: "shopping.png",
            savings: "savings.png",
            expenses: "expenses.png",
            general: "general.png",
            wages: "wages.png",
            refund: "refund.png",
            cashback: "cashback.png",
            gift: "gift.png"
        }
    
        return icons;
    
    }
};


module.exports = budgetCtrlObj;      