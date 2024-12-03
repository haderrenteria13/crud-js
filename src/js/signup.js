const signupform = document.getElementById('signupform');
signupform.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const IsUserExist = Users.find(user => user.email === email);
    if (IsUserExist) { 
        return alert('El usuario ya existe');
    }
    
    Users.push({ name: name, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(Users));
    alert('Usuario creado correctamente!');

    console.log(Users);
});