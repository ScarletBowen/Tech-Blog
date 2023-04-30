const editFormHandler = async function(event){
    event.preventDefault();

    const title = document.getElementById('blog-title');
    const content = document.getElementById('blog-body');
    const id = event.target.getAttribute('data-id');

    fetch (`/edit/${id}`, {
        method: "PUT", 
        body: JSON.stringify({
            title: title.value,
            content: content.value
        }),
        headers: { "Content-Type": "application/json"}
    })
        .then(function() {
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err))
}

document.querySelector(".edit-btn").addEventListener("click", editFormHandler);