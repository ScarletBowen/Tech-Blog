const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value.trim();
  const content = document.querySelector('textarea[name="content"]').value.trim();
  console.log(title, content);

  const response = await fetch ('/dashboard/new', {
      method: 'POST',
      body: JSON.stringify({ 
        title,
        content}),
      headers: {
        'Content-Type': 'application/json'},
      });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
};



document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

