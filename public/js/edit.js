document.querySelector('.edit-blog-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    const id = document.querySelector('.update-btn').getAttribute('data-id');
  
    if (title && content) {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update blog post');
      }
    }
  });
  
//   document.querySelector(".update-btn").addEventListener("click", editFormHandler);
  

//     fetch (`/api/blog/edit/${id}`, {
//         method: "PUT", 
//         body: JSON.stringify({
//             title,
//             content
//         }),
//         headers: { "Content-Type": "application/json"}
//     })
//         .then(function() {
//             document.location.replace("/dashboard");
//         })
//         .catch(err => console.log(err))
// }

// document.querySelector(".update-btn").addEventListener("click", editFormHandler);
