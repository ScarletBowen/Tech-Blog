const editFormHandler = async function(event){
    event.preventDefault();

    const title = document.querySelector('.blog-title').value;
    const content = document.querySelector('.blog-content').value;
    const id = event.target.getAttribute('data-id');

    fetch (`/api/blog/edit/${id}`, {
        method: "PUT", 
        body: JSON.stringify({
            title,
            content
        }),
        headers: { "Content-Type": "application/json"}
    })
        .then(function() {
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err))
}

document.querySelector(".update-btn").addEventListener("click", editFormHandler);
