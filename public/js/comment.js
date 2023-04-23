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
  
    const blogId = form.querySelector('input[name="blog-id"]').value;
    const content = form.querySelector('textarea[name="comment-content"]').value;
  
    if (content) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          blogId,
          content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Fetch comments and display them
      const comments = await fetch(`/api/comment=${blogId}`).then(response => response.json());
      const commentsContainer = form.parentElement.querySelector('.comments');
      commentsContainer.innerHTML = '';
      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<p>${comment.content_text}</p><p class="author">Posted by ${comment.author} on ${comment.createdAt}</p>`;
        commentsContainer.appendChild(commentElement);
      });
    }
  });
});


