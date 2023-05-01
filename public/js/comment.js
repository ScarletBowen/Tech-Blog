// Utility function to check if user is authenticated
async function isAuthenticated() {
  try {
    const response = await fetch('/api/user/check-auth');
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Get all "Add Comment" buttons and attach event listeners
document.querySelectorAll('.add-comment-btn').forEach(function(button) {
  button.addEventListener('click', async function(event) {
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
      alert('Please log in to add a comment.');
      document.location.replace('/login');
      return;
    }
    const blogId = button.getAttribute('data-blog-id');
    const commentForm = document.querySelector(`.comment-form[data-blog-id="${blogId}"]`);
    commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
  });
});

// Get all comment forms and attach event listeners
document.querySelectorAll('.comment-form').forEach(function(form) {
  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
      alert('Please log in to add a comment.');
      document.location.replace('/login');
      return;
    }

    // Add a check for the user before submitting the comment
    const response = await fetch('/api/user/check-auth');
    if (!response.ok) {
      alert('Please log in to add a comment.');
      document.location.replace('/login');
      return;
    }

    const blog_id= form.querySelector('input[name="blog-id"]').value;
    const comment_text = form.querySelector('textarea[name="comment-content"]').value;
    if (comment_text) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          blog_id,
          comment_text,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.reload();

        // Clear the comment textarea
        form.querySelector('textarea[name="comment-content"]').value = '';
      } else {
        alert('Error adding comment. Please try again.');
      }
    }
  });
});


