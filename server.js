const express = require('express');
const app = express();
const path = require("path");
let nunjucks = require('nunjucks');
const { getAllRecipes, getRecipeDetail, getComments, addComment } 
= require('./models/recipe_mode.js');
nunjucks.configure(["views"],     
{autoscape:false, express: app}
);

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.set("view engine", "njk");
app.use(express.static(__dirname+"/public"));


//Import functions
app.get('/', async (req, res)=>{
    let recipes = await getAllRecipes();
    res.render("index.njk", {"data":recipes})
});

app.get("/recipes/:recipe_id", async (req, res)=>{
    let data = await getRecipeDetail(req.params.recipe_id);
    let comments = await getComments(req.params.recipe_id);

            res.render("recipe.njk"
            ,{
                "data": data, "comments": comments
            })
        
        
    
});

app.get("/recipes/:recipe_id/comments", async (req, res)=>{
    await getComments(req.params.recipe_id).then(comments=>{
        res.send(comments)
    })
});

app.post("/recipes/:recipe_id/comments", (req, res)=>{
    console.log(req.body);
    let comment = {
        author: req.body.author,
        comment: req.body.comment
    };
    console.log(comment);

    addComment(req.params.recipe_id, comment).then(metadata=>{
        res.send(metadata);
    })
});

app.use((req, res)=> {
    res.status(404).send('<p>error~</p>')
});

app.listen(PORT, ()=>{
    console.log("Server listening on port ", PORT);
});
