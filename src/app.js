const express = require("express");
const app = express();
const mongoose = require("mongoose")
const Article = require('../models/articles')
const methodOverride = require('method-override')
const articleRouter = require('../routes/article');

const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/blog", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended : false}));
app.use(methodOverride('_method'));

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({
        createdAt : 'desc'
    })
    res.render("articles/index", {articles : articles});
})

app.use('/articles', articleRouter);

app.listen(port, () => {
    console.log(`connection successful at port no. ${port}`);
})