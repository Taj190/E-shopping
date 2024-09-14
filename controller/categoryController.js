const {createCategory, updateCategory, deleteCategory} = require("../model/categoryModel");
const categorySchema = require("../schema/categorySchema");

const categoryController = async (req, res)=>{
    const {name} = req.body 

    if(!name){
        return res.status(400).json({
            success: false,
            message: "Name is required"
        })
    }
    const categoryDb = await createCategory({name});
    try {
        if(categoryDb){
            res.status(201).send({
                success: true,
                message: "Category created successfully",
                data: categoryDb
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "An error occurred while creating category"
        })
        
    }
}
const updateCategoryController = async (req,res)=>{
    const {id} = req.params;
    const {name} = req.body
    
    if(!name){
        return res.status(400).json({
            success: false,
            message: "Name is required"
        })
    }
    const updateCategoryDb = await updateCategory({name,id}) ;
    try {
        if (!updateCategoryDb) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            data: updateCategoryDb
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating category",
            error: error.message // Include error message for debugging
        });
    }
}
const getCategoryController = async (req,res)=>{
    try {
        const categoryDb = await categorySchema.find({})
        res.status(200).send({
            success: true,
            message: "Categories retrieved successfully",
            data: categoryDb
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "An error occurred while retrieving categories",
            error: error.message // Include error message for debugging
        })
    }
}
const getSingleCategoryController = async (req , res)=>{
    const {slug} = req.params;
    if(!slug) return res.status(404).send({
        success: false,
        message: "Category ID is required"
    })
    try {
        const category = await categorySchema.findOne({slug:slug});
        if(!category) return res.status(404).send({
            success: false,
            message: "Category not found"
        })
        res.status(200).send({
            success: true,
            message: "Category retrieved successfully",
            data: category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "An error occurred while retrieving category",
            error: error.message // Include error message for debugging
        })
    }
}
const deleteCategoryController = async (req,res)=>{
    const {id}=req.params
    if(!id) return res.status(404).send({
        success: false,
        message: "Category ID is required"
    })
    try {
        const category = await deleteCategory(id);
        if(!category) return res.status(404).send({
            success: false,
            message: "Category not found"
        })
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            data: category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "An error occurred while deleting category",
            error: error.message // Include error message for debugging
        })
        
    }
}


module.exports = {
    categoryController,
    updateCategoryController,
    getCategoryController,
    getSingleCategoryController,
    deleteCategoryController,
 
}