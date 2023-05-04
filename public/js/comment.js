// const Handlebars = require('handlebars');

// Get all "Add Comment" buttons and attach event listeners
document.querySelectorAll('.add-comment-btn').forEach(function(button) {
  const blogId = button.getAttribute('data-blog-id');
  const commentForm = document.querySelector(`.comment-form[data-blog-id="${blogId}"]`);

  button.addEventListener('click', function(event) {
    event.preventDefault();
    commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
  });

  let comments = [];

  // Fetch comments for this blog post and save to comments object
  fetch(`/api/comment?blog_id=${blogId}`)
    .then(response => response.json())
    .then(comments => {
      const commentsObj = {};
      commentsObj[blogId] = comments;
      return commentsObj;
    // })
    // .then(commentsObj => {
    //   const commentsPartial = Handlebars.templates.comments(commentsObj);
    //   const commentsContainer = document.querySelector(`.comments[data-blog-id="${blogId}"]`);
    //   if (commentsContainer) {
    //     commentsContainer.innerHTML = commentsPartial;
    //   }
    // });
});

// Fetch and display comments for all blog posts
fetch('/api/comment')
  .then(response => response.json())
  .then(comments => {
    const commentsObj = {};

    // Group comments by blog post ID
    comments.forEach(comment => {
      const blogId = comment.blog_id;
      if (!commentsObj[blogId]) {
        commentsObj[blogId] = [];
      }
      commentsObj[blogId].push(comment);
    });

    // // Render comments for each blog post
    // const blogIds = Object.keys(commentsObj);
    // blogIds.forEach(blogId => {
    //   const commentsPartial = Handlebars.templates.comments({ comments: commentsObj[blogId] });
    //   const commentsContainer = document.querySelector(`.comments[data-blog-id="${blogId}"]`);
    //   if (commentsContainer) {
    //     commentsContainer.innerHTML = commentsPartial;
    //   }
    // });
  });

// Get all comment forms and attach event listeners
document.querySelectorAll('.comment-form').forEach(function(form) {
  form.addEventListener('submit', async function(event) {
    event.preventDefault();

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
        // Fetch comments for this blog post and update comments object
        fetch(`/api/comment?blog_id=${blog_id}`)
          .then(response => response.json())
          .then(comments => {
            const commentsObj = {};
            commentsObj[blog_id] = comments;
            return commentsObj;
          })
          .then(commentsObj => {
            const commentsPartial = Handlebars.templates.comments(commentsObj);
            const commentsContainer = document.querySelector(`.comments[data-blog-id="${blog_id}"]`);
            if (commentsContainer) {
              commentsContainer.innerHTML = commentsPartial;
            }
          });

        // Clear the comment textarea
        form.querySelector('textarea[name="comment-content"]').value = '';
      } else {
        alert(response.statusText);
      }
    }
  });
});

