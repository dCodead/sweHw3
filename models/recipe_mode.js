const db = require('aa-sqlite');
const express = require('express'); 
async function initializeDB(){
    
    await db.open('recipes_store.db3');
};

async function getAllRecipes(){
    await initializeDB();
    sql = 'SELECT * FROM recipes';
    const recipes = await db.all(sql, []);
    db.close();
    return recipes;
};

async function getRecipeDetail(recipe_id){
    await initializeDB();
    sql = 'SELECT * FROM recipes WHERE id = ' 
        + recipe_id;
    const recipe = await db.get(sql, []);

    sql = 'SELECT * FROM method WHERE recipe_id = ' 
        + recipe_id;
    const method = await db.all(sql, []);

    sql = 'SELECT * FROM ingredients WHERE recipe_id = ' 
        + recipe_id;
        const ingredients = await db.all(sql, []);

    db.close();

    var recipeDetails = recipe;
    recipeDetails.method = method;
    recipeDetails.ingredients = ingredients;
    return recipeDetails;
};
async function getComments(recipe_id){
    await initializeDB();
    sql = 'SELECT * FROM comments WHERE recipe_id = ' 
    + recipe_id;
    const comments = await  db.all(sql, []);

    db.close();
    return comments;
};
async function addComment(recipe_id, comment){
    await initializeDB();
    sql = 'INSERT INTO comments(author,comment,recipe_id_ VALUES (?,?,?)';
    var metaData = await db.push(sql, [comment.author
    , comment.comment, recipe_id], (err) => {
        if(err) return console.log(err.message);
    });

    db.close();
    return metaData;
};

module.exports = {
    getAllRecipes, getRecipeDetail, getComments
    , addComment
};