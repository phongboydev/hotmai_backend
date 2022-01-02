const { Category } = require("../models");
const { userRouter } = require("../routers/user.router");
const {
    getList,
    getDetail,
    create,
    update,
    deleteById,
    getListByCondition,
    updateAmountAccount
} = require("../services/category.service");
// All Category
const allCategory = async(req, res) => {
    try {
        const categoryList = await Category.findAll();
        if(categoryList)
        {
            res.status(200).json({
                isSuccess: true,
                data: categoryList
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

// Detail Category
const detailCategory = async(req, res) => {
    const  id  = req.params.id;
    try {
        const detailCategory = await Category.findOne({
            where : {
                id : id
            }
        });
        if(detailCategory)
        {
            res.status(200).json({
                isSuccess: true,
                data: detailCategory
              });
        } else {
            res.status(500).json({
                isSuccess: false,
                data: detailCategory
              });
        }
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            data: detailCategory
          });
    }
}

// Create Category
const createCategory = async(req, res) => {
    const category = req.body;
    try {
        const newCategory = await Category.create(category);
        if(newCategory)
        {
            res.status(201).json({
                isSuccess: true,
                data: newCategory
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

// Update Category
const updateCategory = async(req, res) => {
    const  id_category  = req.params.id;
    const  {name,image}  = req.body;
    try {
        const updateCategory = await Category.update({
            name : name,
            image : image
        },
        {
            where : {
                id : id_category
            }
        });
        if(updateCategory){
            res.status(200).json({
              isSuccess: true,
              data:  updateCategory
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

// Delete Category
const deleteCategory = async(req, res) => {
    const id_category = req.params.id;
    console.log(id_category);
    try {
        const deleteCategory = await Category.destroy({
            where : {
                id : id_category
            }
        });
        if(deleteCategory){
            res.status(200).json({
              isSuccess: true,
              data:  deleteCategory
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

// getList Category
const getListByConditions = async(req, res) => {
    try {
        const listCondition = await getListByCondition();
//         const updateAccountEmail= await updateAmountAccount();
        res.status(200).send({
            "status": "success",
            "categories":listCondition
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    allCategory,
    detailCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getListByConditions
};