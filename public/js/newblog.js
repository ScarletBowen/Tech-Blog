const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value.trim();
  const body = document.querySelector('textarea[name="blog-content"]').value.trim();

  const token = localStorage.getItem('token');
  await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,

      },
    });
    document.location.replace("/dashboard");
  };

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('blog-id')) {
    const id = event.target.getElementById('blog-id');

    const response = await fetch(`/api/blog/${blog-id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('#delete-btn')
  .addEventListener('click', delButtonHandler);
