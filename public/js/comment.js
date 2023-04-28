// Get all "Add Comment" buttons and attach event listeners
document.querySelectorAll('.add-comment-btn').forEach(function(button) {
  button.addEventListener('click', function(event) {
    const blogId = button.getAttribute('data-blog-id');
    const commentForm = document.querySelector(`.comment-form[data-blog-id="${blogId}"]`);
    commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
  });
});

// Get all comment forms and attach event listeners
document.querySelectorAll('.comment-form').forEach(function(form) {
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const blog_id= form.querySelector('input[name="blog-id"]').value;
    const comment_text = form.querySelector('textarea[name="comment-content"]').value;
    
    console.log("comment_text");

    if (comment_text) {
      const response = await fetch('/api/comment', {
        
        method: 'POST',
        body: JSON.stringify({
          blog_id,
          comment_text,
        }),
        
        headers: {
          'Content-Type': 'application/json'
         
        }

      });
      console.log(response);

      document.location.reload();
    }
  });
});



