const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value.trim();
  const body = document.querySelector('textarea[name="blog-content"]').value.trim();

  const response = await fetch ('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    document.location.reload();
  };

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('blog-id')) {
    const id = event.target.getElementById('blog-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  };

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }


document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.delete-btn')
  .addEventListener('click', delButtonHandler);
