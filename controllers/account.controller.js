const { Account, Category } = require("../models");

// All account
const allAccount = async(req, res) => {
    try {
        const accountList = await Account.findAll({
            include: [
                {
                  model: Category,
                  as: "categoryType"
                }
            ]
        });
        if(accountList)
        {
            res.status(200).json({
                isSuccess: true,
                data: accountList
              });
        } else {
            res.status(500).json({
                isSuccess: false,
                data: null
              });
        }
       
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            data: null
          });
    }
}

// Detail account
const detailAccount = async (req, res) => {
    console.log(req.params.id);
    let detailAccount =null;
    const  id = req.params.id;
    try {
         detailAccount = await Account.findOne({
            where : {
                id : id
            }
        });
        if(detailAccount)
        {
            res.status(200).json({
                isSuccess: true,
                data: detailAccount
              });
        } else {
            res.status(500).json({
                isSuccess: false,
                data: detailAccount
              });
        }
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            data: detailAccount
          });
    }
}

// Create account
const createAccount = async(req, res) => {
    const {name, price,amount,country,description,category_id } = req.body;
    try {
        const newAccount = await Account.create({
            name : name,
            price : price,
            amount : amount,
            country : country,
            description : description,
            category_id : category_id,
        });
        if(newAccount)
        {
            res.status(201).json({
                isSuccess: true,
                data: newAccount
              });
        } else {
            res.status(500).json({
                isSuccess: false,
                data: null
              });
        }
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            data: null
          });
    }
}

// Update account
const updateAccount = async(req, res) => {
    const  id  = req.params.id;
    const {name, price,amount,country,description,category_id } = req.body;
    try {
        const updateAccount = await Account.update({
            name : name,
            price : price,
            amount : amount,
            country : country,
            description : description,
            category_id : category_id,
        },
        {
            where : {
                id : id
            }
        });
        if(updateAccount){
            res.status(200).json({
              isSuccess: true,
              data:  updateAccount
            });
           }
           else{
            res.status(500).json({
              isSuccess: false,
              data:  null
            });
           }
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            data:  null
          });
    }
}

// Delete account
const deleteAccount = async(req, res) => {
    const id = req.params.id;
    try {
        const deleteAccount = await Account.destroy({
            where : {
                id : id
            }
        });
        if(deleteAccount){
            res.status(200).json({
              isSuccess: true,
              data:  deleteAccount
            });
           }
           else{
            res.status(500).json({
                isSuccess: false,
                data:  null
              });
           }
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            data:  null
          });
    }
}


module.exports = {
    allAccount,
    detailAccount,
    createAccount,
    updateAccount,
    deleteAccount,
};