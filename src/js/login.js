const loginform = document.getElementById('loginform');
loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const IsUserExist = Users.find(user => user.email === email && user.password === password);
    if (!IsUserExist) {
        showAlert('Usuario o contraseña incorrectos', 'danger');
        return;
    }   
    
    localStorage.setItem('LoginSuccess', JSON.stringify(IsUserExist));
    window.location.href = 'index.html';
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