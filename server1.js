

const http = require('http');
const PORT = 3000;

const blogs = [
    {
        id : 1,
        title : "Node Js",
        author : "John Doe",
        content : "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
    },
    {
        id : 2,
        title : "Angular",
        author : "May Doe",
        content : "Angular is a platform for building mobile and desktop web applications."
    }
]

// const server = http.createServer((req, res) => {
//     if(req.method == "GET" && req.url === "/blogs") {
//         res.writeHead(200, {
//             "Content-type" : "application/json"
//         })

//         res.end(JSON.stringify(blogs));
//     }
// })

const server = http.createServer((req, res) => {
    if(req.method == "GET" && req.url.startsWith('/blogs/')){
        let id = req.url.split('/')[2];
        // req.readableEnded(id);
        const blog = blogs.find(b => b.id == id);
        if(blog){
            res.writeHead(200, {
                "Content-type" : "application/json"
            })
            res.end(JSON.stringify(blog));
        
            
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
