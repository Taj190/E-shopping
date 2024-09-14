const fs = require('fs');
const { ProductCreation, getProduct, productDeletion, ProductUpdation } = require('../model/productModel');
const config = require('../config');
require('dotenv').config();

const ProductSchema = require('../schema/productSchema');
const { default: slugify } = require('slugify');
const categorySchema = require('../schema/categorySchema');
const braintree = require('braintree');
const orderSchema = require('../schema/orderSchema');
// payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
  });



const ProductController = async (req, res)=>{
    const {name,  description, price,category, quantity, shipping } = req.fields
    const {photo } = req.files
  
    switch(true){
        case!name ||!description ||!price ||!category ||!quantity ||!shipping :
            return res.status(400).send({success: false, message: "All fields are required"})
        case photo.size > 1024 * 1024 * 5 :
            return res.status(400).send({success: false, message: "Photo size should not exceed 5MB"})
      
    }
   const ProductDb = await ProductCreation ({...req.fields , 
    photo: {
        data: fs.readFileSync(photo.path),  
        contentType: photo.type,            
      }
   })
   try {
    if(!ProductDb){
        return res.status(500).send({success: false, message: "An error occurred while creating product", error: error.message})
    }
    res.status(201).send({success: true, message: "Product created successfully", data: ProductDb})
   } catch (error) {
    return res.status(500).send({
        success: false,
        message: "An error occurred while creating product",
        error: error.message
    })
   }
}
const ReadProductController = async (req,res)=>{
    const limit  = config.DEFAULT_READ_LIMIT ;
    const page = req.query.page || 1;
    const SKIP = (page-1) *limit
    try {
        if(req.query.limit > limit){
            return res.status(400).send({success: false, message: "Limit should not exceed " + limit})
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "An error occurred while processing pagination",
            error: error.message
        })
    }
    try{
        const productDb = await getProduct({SKIP , limit}) ;
        const totalProducts = await ProductSchema.countDocuments();
        // Get total count of products
        const totalPages = Math.ceil(totalProducts / limit); 
        console.log(totalPages)
        if(!productDb){
            return res.status(404).send({success: false, message: "Product not found"})
        }
        res.status(201).send({success: true,
              message: "Product retrieved successfully",
              data: productDb,
              totalPages,
            })
    }catch{
        res.status(500).send({success: false, message: "An error occurred while retrieving product", error: error.message})
    }
}
const ReadSingleProductController = async (req, res)=>{
   const {slug} = req.params;
   console.log(slug)
   if(!slug) return res.status(404).send({success: false, message: "Product ID is required"})
    try {
        const product = await ProductSchema.findOne({slug:slug})
        
        // .select('-photo')
        .populate('category')
        if(!product) return res.status(404).send({
            success: false,
            message: "Product not found"
        })
        res.status(200).send({success: true, 
            message: "Product retrieved successfully",
             data: product
            })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "An error occurred while retrieving product",

           
        })
    }
}

const getProductPhotoController = async(req,res)=>{
    try{
        const product = await ProductSchema.findById(req.params.p_id);
        if(!product.photo.data){
            return res.status(404).send({success: false, message: "Product photo not found"})
        }
        res.set('Content-Type', product.photo.contentType)
        res.send(product.photo.data)
    }catch{
        res.status(500).send({success: false, 
            message: "An error occurred while retrieving product photo", 
            })
    }
}
const productDeleteController = async (req,res)=>{
    const {id}=req.params ;
    console.log(id)
    if(!id) return res.status(404).send({
        success: false,
        message: "Product ID is required"
    })
    const deleteProduct= await productDeletion(id);
   try {
    if(deleteProduct){
        res.status(200).send({success: true, message: "Product deleted successfully"})
    }
   } catch (error) {
    res.status(404).send({
        success: false, 
        message:'an error occurred while deleting'})
   }
}

const  productUpadteController= async (req, res) => {
    const { name, description, price, quantity, shipping } = req.fields;
    const { photo } = req.files;
    const slug = slugify(name);

    // Validate required fields
    if (!name || !description || !price || !quantity || shipping === undefined) {
        return res.status(400).send({
            success: false,
            message: "All fields are required"
        });
    }

    // Check for photo and validate if present
    if (photo) {
        if (photo.size > 1024 * 1024 * 5) {
            return res.status(400).send({
                success: false,
                message: "Photo size should not exceed 5MB"
            });
        }
    }

    // Prepare product data for update
    const updatedProductData = {
        ...req.fields,
        slug,
    };

    // Add photo data only if a photo was provided
    if (photo) {
        updatedProductData.photo = {
            data: fs.readFileSync(photo.path),
            contentType: photo.type,
        };
    }

    try {
        const ProductDb = await ProductUpdation(updatedProductData, req.params.id);
        if (!ProductDb) {
            return res.status(500).send({
                success: false,
                message: "An error occurred while updating product"
            });
        }
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            data: ProductDb
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "An error occurred while updating product",
            error: error.message
        });
    }
};
const filterProductController = async (req, res) => {
    try {
      const { categories, priceRange } = req.body;
      const limit = config.DEFAULT_READ_LIMIT;
      const page = parseInt(req.query.page) || 1
   
      try {
          if(req.query.limit > limit){
              return res.status(400).send({success: false, message: "Limit should not exceed " + limit})
          }
      } catch (error) {
          return res.status(500).send({
              success: false,
              message: "An error occurred while processing pagination",
              error: error.message
          })
      }
      // Build a query based on selected filters
      let query = {};
      
      if (categories && categories.length > 0) {
        query.category = { $in: categories };
      }
    // if (categories.length > 0) query.category =categories ;
  
      if (priceRange && priceRange.length === 2) {
        query.price = { $gte: priceRange[0], $lte: priceRange[1] };
      }
      
  
      // Fetch products based on the query
      const products = await ProductSchema.find(query)
      .limit(limit)
      .skip((page - 1) * limit);
      const totalProducts = await ProductSchema.countDocuments(query);
      
      // Get total count of products
      const totalPages = Math.ceil(totalProducts / limit); 
      return res.json({
        success: true,
        data: products,
        totalPages,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching filtered products',
        error,
      });
    }
  };
const searchProductController = async (req,res)=>{
      try {
        const {keyword} = req.params ;
        if(!keyword){
            return res.status(400).send({
                success: false,
                message: "Keyword is required"
            })
        }
        const result = await ProductSchema.find({
            $or:[
                {name:{$regex:keyword ,$options:"i"}},
                {description:{$regex:keyword ,$options:"i"}}
            ]
        })
        return res.status(200).send({
            success: true,
            message: "Products retrieved successfully",
            data: result
        })
      } catch (error) {
        
        return res.status(500).send({
            success: false,
            message: "An error occurred while retrieving products",
           
            error: error.message
        })
      }
  }
  const similarProductController = async(req, res)=>{
     const {pid , cid} = req.params ;

     console.log(pid, cid)
     if(!pid || !cid){
         return res.status(400).send({
             success: false,
             message: "Product ID and Category ID are required"
         })
     }
   
     const product = await ProductSchema.find({ _id:{$ne:pid}, category:cid })
        .populate('category')
        
        try {
            if(product){
                res.status(200).send({
                    success: true,
                  data: product
                })
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "An error occurred while retrieving similar products",
                error: error.message
            })
        }
  }

  const ProductCategoryController = async(req, res)=>{
    const {slug} = req.params
    console.log(slug)
    try {
        const category = await categorySchema.find({slug:slug}) ;
        const products = await ProductSchema.find({category}).populate('category')
        
        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "An error occurred while retrieving products",
           
        })
    }
  }
  const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          return res.status(500).send({
            success: false,
            message: "An error occurred while generating Braintree token",
            error: err.message,
          });
        }
  
        // Send only the clientToken in the response
        res.status(200).send({
          success: true,
          clientToken: response.clientToken, // Extract the token
        });
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "An error occurred while generating Braintree token",
        error: error.message,
      });
    }
  };
  
  const braintreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
        
      // Calculate total price from cart
      cart.map((i) => {
        total += i.price;
      });
  
      // Braintree transaction
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        async function (error, result) {
          if (result) {
            try {
              // Save order to the database and await the promise
              const order = await new orderSchema({
                products: cart,
                payment: result,
                buyer: req.user.id, // This should be set by auth middleware
              }).save();
  
             // This will now log the saved order
              res.json({ ok: true, order }); // Send back the order to the client
            } catch (saveError) {
              console.log(saveError);
              res.status(500).send('Error saving the order');
            }
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Payment processing failed');
    }
  };
  

  const getOrderController =  async(req, res)=>{
    
      try {
          const order = await orderSchema.find({buyer:req.user.id})
          .populate('products','-photo')
          .populate('buyer','name')
          
          res.json({
              success: true,
              order
          })
      } catch (error) {
        
         res.status(500).send({
             success: false,
             message: "An error occurred while retrieving order",
             error: error.message
         })
      }
  }
  const getAllOrderController =  async(req, res)=>{
    
    try {
        const order = await orderSchema.find({})
        .populate('products','-photo')
        .populate('buyer','name')
        .sort({ createdAt: -1 });
        
       
        
        res.json({
            success: true,
            order
        })
    } catch (error) {
      
       res.status(500).send({
           success: false,
           message: "An error occurred while retrieving order",
           error: error.message
       })
    }
}
const orderStatusController = async(req, res)=>{
  try {
    const { orderId } = req.params;
    const { status } = req.body;
  
    const orders = await orderSchema.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
   
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
}

module.exports={
    ProductController,
    ReadProductController,
    ReadSingleProductController,
    getProductPhotoController,
    productDeleteController,
    productUpadteController,
    filterProductController,
    searchProductController,
    similarProductController,
    ProductCategoryController,
    braintreeTokenController,
    braintreePaymentController,
    getOrderController,
    getAllOrderController,
    orderStatusController 
    //... add more controllers as needed
 
}