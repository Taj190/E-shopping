const { default: slugify } = require("slugify");
const categorySchema = require("../schema/categorySchema")

const createCategory = ({name})=>{
    return new Promise(async (resolve , reject)=>{
        try {
            const existingCategory = await categorySchema.findOne({name : name}) ;
            if(existingCategory){
                return reject(new Error("Category already exists"))
            }
            const newCategory = await new categorySchema({name , slug : slugify(name)}).save() ;
            resolve({
                success: true,
                message: "Category created successfully",
                category: newCategory
            })
        } catch (error) {
            reject(error)
            
        }
    })
}
const updateCategory = ({name , id})=>{
    return new Promise(async (resolve, reject)=>{
        try {
            const updatedCategory = await categorySchema.findByIdAndUpdate(id, {name : name, slug : slugify(name)}, {new : true}) ;
            if(!updatedCategory){
                return reject(new Error("Category not found"))
            }
            resolve({
                success: true,
                message: "Category updated successfully",
                category: updatedCategory
            })
        } catch (error) {
            reject(error)
            
        }
    })
}
const deleteCategory = async (id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            const deletedCategory = await categorySchema.findByIdAndDelete(id) ;
            if(!deletedCategory){
                return reject(new Error("Category not found"))
            }
            resolve({
                success: true,
                message: "Category deleted successfully",
                category: deletedCategory
            })
        } catch (error) {
            reject(error)
            
        }
    })
}
module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
 
}