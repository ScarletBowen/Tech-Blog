document.querySelector('.comment-form form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const blogId = this.querySelector('input[name="blog-id"]').value;
  const commentContent = this.querySelector('.comment-text').value;

  if (!commentContent) {
      alert('Please write a comment before submitting.');
      return;
  }

  try {
    // Send the POST request to create the comment
    const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({
            blog_id: blogId,
            comment_text: commentContent,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        // If successful, redirect the browser to the blog post page
        console.log('comment posted');
        document.location.replace(`/blog/${blogId}`);
    } else {
        alert(response.statusText);
    }
  } catch (err) {
      console.log(err);
  }
});



