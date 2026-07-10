const express = require('express')

const {
    sendBlog,
    sendBlogByID,
    createBlog,
    updateBlog,
    removeBlog
} = require('../controllers/blogController')

const routes = express.Router()

routes.get("",sendBlog)
routes.get("",sendBlogByID)
routes.post("/:id",createBlog)
routes.patch("/:id",updateBlog)
routes.delete("/:id",removeBlog)


module.exports = routes;