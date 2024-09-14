const { default: slugify } = require("slugify")
const ProductSchema = require("../schema/productSchema")


const ProductCreation = (product)=>{
    return new Promise (async(resolve, reject)=>{
        try {
            const newProduct = await new ProductSchema({
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                slug: slugify(product.name),
                shipping: product.shipping,
                photo: product.photo
            }).save()
            resolve({
                success: true,
                message: "Product created successfully",
                data: newProduct
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getProduct = async ({ SKIP, limit }) => {
    try {
      const products = await ProductSchema.find({})
        .select("-photo")
        .limit(limit)
        .sort({ createdAt: 1 })
        .skip(SKIP);
  
      return products; // Return the products array directly
    } catch (error) {
      throw error;
    }
  };
  
const productDeletion = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const deletedProduct = await ProductSchema.findByIdAndDelete({_id:id})
            if(!deletedProduct){
                return reject(new Error("Product not found"))
            }
            resolve({
                success: true,
                message: "Product deleted successfully",
                data: deletedProduct
            })
        } catch (error) {
            reject(error)
        }
    })
}

const ProductUpdation = (product , id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const updatedProduct = await ProductSchema.findByIdAndUpdate(id, product,
                 {new: true})
            if(!updatedProduct){
                return reject(new Error("Product not found"))
            }
            resolve({
                success: true,
                message: "Product updated successfully",
                data: updatedProduct
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    ProductCreation,
    getProduct ,
    productDeletion,
    ProductUpdation
}