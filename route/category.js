const express = require('express');
const { requireLogin, isAdmin } = require('../middleware/authMiddleware');
const {categoryController, updateCategoryController, getCategoryController, getSingleCategoryController, deleteCategoryController} = require('../controller/categoryController');
const categoryRouter = express.Router();

categoryRouter.post('/create-category', requireLogin,isAdmin , categoryController)
categoryRouter.put('/update-category/:id', requireLogin,isAdmin , updateCategoryController)
categoryRouter.get('/get-all-category',  getCategoryController)
categoryRouter.get('/get-single-category/:slug',  getSingleCategoryController)
categoryRouter.delete('/delete-category/:id', requireLogin,isAdmin , deleteCategoryController)

module.exports = categoryRouter;
