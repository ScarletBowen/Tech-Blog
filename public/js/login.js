// select the login form and add an event listener for submission
const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent the default form submission

  // get the values of the username and password fields
  const username = document.querySelector('#username-input-login').value;
  const password = document.querySelector('#password-login').value;

  // send a request to the server to check the user credentials
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  // if the response is successful, redirect to the homepage
  if (response.ok) {
    document.location.replace('/');
    console.log("user is logged in")
  } else {
    alert('Invalid username or password');
  }
});

// select the signup form and add an event listener for submission
const signupForm = document.querySelector('.signup-form');
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent the default form submission

  // get the values of the username and password fields
  const username = document.querySelector('#username-input-signup').value;
  const password = document.querySelector('#password-signup').value;

  // send an AJAX request to the server to create a new user
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
 
 
  if (response.ok) {
    console.log("user is logged in");
    document.location.replace('/');
  } else {
    alert('Failed to create user');
  }
});
