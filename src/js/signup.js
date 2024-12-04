const signupform = document.getElementById('signupform');
signupform.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const IsUserExist = Users.find(user => user.email === email);
    if (IsUserExist) { 
        showAlert('El usuario ya existe', 'danger');
        return;
    }
    
    Users.push({ name: name, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(Users));
    showAlert('Usuario creado correctamente!', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});

function showAlert(message, type) {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertPlaceholder.append(wrapper);
}