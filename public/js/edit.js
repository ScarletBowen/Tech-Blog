const editFormHandler = async function(event) {
    event.preventDefault();

    
    const title = document.getElementById('blog-title');
    const content = document.getElementById('blog-body');
    const blogId = document.getElementById('blog-id')

    fetch("/api/post/" + blogId.value, {
        method: "put", 
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

document.querySelector("#edit-blog-form").addEventListener("submit", editFormHandler);