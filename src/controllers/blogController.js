const blogs = [
    {
    id: 1,
    title: "Node.JS",
    body: "Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more",
    author: "Jhon Doe"
  },
  {
    id: 2,
    title: "Angular",
    body: "Angular is a popular, open-source web application framework created and maintained by Google.",
    author: "Vipul Borole"
  },
  {
    id: 3,
    title: "Mongo DB",
    body: "MongoDB is a document database. It stores data in a type of JSON format called BSON. If you are unfamiliar with JSON, check out our JSON tutorial",
    author: "Ishant Jadhav"
  },
  {
    id: 4,
    title: "TypeScript",
    body: "Getting started with TypeScript.",
    author: "Tulsi Kulkarni"
  },
  {
    id: 5,
    title: "Rxjs",
    body: "RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.",
    author: "Supriya Patil"
  },
    {
    id: 5,
    title: "Javascript",
    body: "The Programming Language of the Web JavaScript is easy to learn. This tutorial covers everything from basic JavaScript up to the latest 2026 version.  .",
    author: "Swati Patil"
    }
]

function sendBlog(req,res){
    try{
        res.status(200).json({
            status:true,
            data: blogs
        })
    }
    catch(error){
         res.status(500).json({
            success:false,
            message:`Error Fetch blogs`
        })
    }
  };

function sendBlogByID(req,res){
    try{
        let blogId = req.params.id;
        let blog = blogs.find(p => p.id == blogId)

        if(!blogs){
            return res.status(404).json({
                success:false,
                message:`Blog with Id ${blogId} Not found!`
            })
        }

        res.status(200).json({
            success:true,
            data:post
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:`Error fetch Blogs !!`,
            error:error.message
        })
    }
}

function createBlog(req,res){
    try{
         let {title,body,author}=req.body;
            if(!title || !body){
                return res.status(400).json({
                    success:false,
                    message:'Title & body are required'
                })
            }

            let newBlog = {
                title:title,
                body:body,
                author:author,
                id:Date.now(),
                createdAt:Date.now(),
                updatedAt:null
            }

            blogs.unshift(newBlog)

            res.status(201).json({
                success:true,
                data: newBlog,
                message:`The post with id ${newBlog.id} created successfully`
            })

    }
    catch(error){
         res.status(500).json({
            success:false,
            message:`error while creating blog!!!.`
        })
    }
}

function updateBlog(req,res){
     try{
            const blogId = req.params.id;
             
            const getIndex=posts.findIndex(b=>b.id == blogId)
        
        if(getIndex===-1){
            return res.status(404).json({
                success:false,
                message:`The blog with ID ${blogId} not found..`
            })
        }
        
        let {title,body,author} = req.body;

            if(!title || !body){
                return res.status(400).json({
                    success:false,
                    message:'Title and body are required..'
                })
            }

            let UPDATED_ID = {
                ...blogs[getIndex],
                ...req.body,
                updatedAt : Date.now()

            }

            blogs[getIndex] = UPDATED_POST;
            res.status(200).json({
                success:true,
                data : UPDATED_POST 
            })

    }
    catch(error){
         res.status(500).json({
            success:false,
            message:`error while update blog.`
        })
    }
}

function removeBlog(req,res){
      try{
        let id = number(req.params.id);
        let getIndex = blogs.findIndex(b => b.id == id)

        if(getIndex===-1){
            return res.status(404).json({
                success:false,
                message:`blog with id ${id} not Found.`
            })
        }

        blogs.splice(getIndex,1);

        res.status(200).json({
            success:true,
            data: blogs,
            message:`Blog with id ${id} deleted successfully`
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:`error while deleting message..`
        })
    }
}

module.exports={
    sendBlog,
    sendBlogByID,
    createBlog,
    updateBlog,
    removeBlog

}