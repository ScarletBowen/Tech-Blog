const sendFormData = async function(url, formData) {
    const response = await fetch(url , {
      method: 'PUT',
      body: formData
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
  
  const editFormHandler = async function(event){
    event.preventDefault();
  
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const id = event.target.getAttribute('data-id');
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
  
    try {
      await sendFormData(`/api/blog/edit/${id}`, formData);
      document.location.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  
  document.querySelector(".update-btn").addEventListener("click", editFormHandler);
  

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
