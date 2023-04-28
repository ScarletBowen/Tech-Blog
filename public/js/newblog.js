const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value.trim();
  const content = document.querySelector('textarea[name="content"]').value.trim();
  console.log(title, content);
if (title && content){
  const response = await fetch ('/api/blog/new', {
      method: 'POST',
      body: JSON.stringify({ 
        title,
        content,
      headers: {
        'Content-Type': 'application/json'},
      })
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
  }
};
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/dashboard/${id}`, {
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
  .addEventListener('click', newFormHandler);

// document
//   .querySelector('.delete-btn')
//   .addEventListener('click', delButtonHandler);
