
const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));



const blogs = [
    {
        id: "1",
        title: "Node Js",
        author: "John Doe",
        content: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
    },
    {
        id: "2",
        title: "Angular",
        author: "May Doe",
        content: "Angular is a platform for building mobile and desktop web applications."
    }
];

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: blogs
    })
})

app.get("/blogs", (req, res) => {
    res.status(200).json({
        success: true,
        data: blogs
    });
});



app.get("/blogs/:id", (req, res) => {

    let blog = blogs.find(b => b.id === req.params.id);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog Not Found"
        });
    }

    res.status(200).json({
        success: true,
        data: blog
    });

});



app.post("/blogs", (req, res) => {

    let { title, content, author } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Title and Content are required"
        });
    }

    let newBlog = {
        id: Date.now().toString(),
        title,
        content,
        author: author || "Anonymous"
    };

    blogs.unshift(newBlog);

    res.status(201).json({
        success: true,
        data: newBlog,
        message: "Blog Added Successfully"
    });

});



app.delete("/blogs/:id", (req, res) => {

    let id = req.params.id;

    let index = blogs.findIndex(blog => blog.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Blog Not Found"
        });
    }

    blogs.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Blog Deleted Successfully"
    });

});



app.patch("/blogs/:id", (req, res) => {

    let id = req.params.id;

    let { title, content } = req.body;

    let index = blogs.findIndex(blog => blog.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Blog Not Found"
        });
    }

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Title and Content are required"
        });
    }

    blogs[index] = {
        ...blogs[index],
        title,
        content,
        updatedAt: new Date().toISOString()
    };

    res.status(200).json({
        success: true,
        message: "Blog Updated Successfully",
        data: blogs[index]
    });

});

app.get("/", (req, res) => {
    res.redirect("/blogs");
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



