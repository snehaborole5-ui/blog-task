
const express = require('express')

const blogRoutes = require('./routes/blogRoute')

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/api/blogs', blogRoutes)

app.use((req ,res) => {
    res.status(404).json({
        success : false,
        message : `Route not Found!!!!`
    })
})

module.exports = app