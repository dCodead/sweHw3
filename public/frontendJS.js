
async function showComments(recipe_id){
    fetch(`/recipes/${recipe_id}/comments`).then(res=> res.json()).then(res=>{
        let commentsOutput = document.getElementById("comments");
        let commentsForm = document.createElement("div");
        for(let comment of res){
            commentsForm.innerHTML += 
            `
            <div class="comment">
            <p>${ comment.comment }</p>
            <p>- ${ comment.author }</p>
            </div>
            `;         }
        commentsOutput.innerHTML=commentsForm.innerHTML;
    });

}

async function seeComments(recipe_id){
    const commentsContainer = document.getElementById("comments_container");
    commentsContainer.style.display = "block";
    await showComments(recipe_id);
}
async function sendComment(recipe_id){
    console.log(document.forms["comments_form"])
    console.log(document.forms['comments_form']['comment_author'].value)
    console.log(document.forms['comments_form']['comment_txt'].value)

    let comment = document.forms['comments_form']['comment_txt'].value;
    let author = document.forms['comments_form']['comment_author'].value;
    let data =  {
        comment: comment,
        author: author 
    };

    console.log(JSON.stringify(data));
    fetch(`/recipes/${recipe_id}/comments`
        , {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(data)
    }).then(()=>{
        console.log("reached here");
        showComments(recipe_id);
    });

};

const commentsBtn = document.getElementById("see_comments");
commentsBtn.onclick = async function(){
    await seeComments(parseInt(window.location.href.split("/").pop()))
};

const commentsSubmitBtn = document.getElementById("comment_submit_btn");
commentsSubmitBtn.onclick = async function(){
    await sendComment(parseInt(window.location.href.split("/").pop()))
};

