const apiUrl = 'http://localhost:4000';

async function SignUp() {
  const gmail = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  console.log(gmail);
  console.log(password);
  
    // e.prevent.default();
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gmail, password })
    });
    
    // if (!response.ok) {
    //   throw new Error('Signup failed');
    // }

    console.log(response);

    const data = await response.json();
    console.log(data);

    localStorage.setItem('token', data.token);

    // Redirect to the  login route
    
        console.log('Before redirection');
    window.location.assign('http://127.0.0.1:5500/login.html');
    console.log('After redirection');

  } catch (error) {
    console.error('Signup failed:', error);
    // Handle signup failure (e.g., display error message)
  }
}


async function login() {
  const gmail = document.getElementById('loginEmail1').value;
  const password = document.getElementById('loginPassword1').value;

  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gmail, password })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    console.log("ok")

    const data = await response.text();

    console.log("still fine");

    console.log(data);

    // console.log(data);
    // console.log(data["msg"]);

    // const parsed = JSON.parse(data)

    // console.log(parsed);
    // console.log(parsed["msg"]);

    console.log(data == "notfine");

    if(data == "notfine"){
      alert("not allowed Login again")
      
      location.reload()
      window.location.assign("http://127.0.0.1:5500/login.html")
      return;
    }
    else if(data == "success"){
    

    localStorage.setItem('accessToken', data.token);

    // Redirect to the chat application route

    setTimeout(() =>{
      window.location.assign('http://127.0.0.1:5500/index.html');
    } , 30000)
  }
    

  } catch (error) {
    console.error('Login failed:', error);
    console.log("errror");
    // Handle login failure (e.g., display error message)
  }
}
