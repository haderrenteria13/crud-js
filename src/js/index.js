const User = JSON.parse(localStorage.getItem('LoginSuccess')) || false;

if (!User) {
    window.location.href = 'login.html';
}

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    showAlert(`Hasta luego ${User.name}`, 'info');
    localStorage.removeItem('LoginSuccess');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
});

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let editIndex = null;

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    const task = { title, description, dueDate, priority, user: User.email, completed: false };

    if (editIndex !== null) {
        tasks[editIndex] = task;
        editIndex = null;
    } else {
        tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    taskForm.reset();
    const taskModal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    taskModal.hide();
    showAlert('Tarea guardada correctamente!', 'success');
});

document.getElementById('taskModal').addEventListener('hidden.bs.modal', () => {
    editIndex = null;
    taskForm.reset();
});

function renderTasks() {
    taskList.innerHTML = '';
    const userTasks = tasks.filter(task => task.user === User.email);
    userTasks.forEach((task, index) => {
        const taskItem = document.createElement('tr');
        let priorityBadge = '';
        switch (task.priority) {
            case 'alta':
                priorityBadge = '<span class="badge rounded-pill text-bg-danger">Alta</span>';
                break;
            case 'media':
                priorityBadge = '<span class="badge rounded-pill text-bg-warning">Media</span>';
                break;
            case 'baja':
                priorityBadge = '<span class="badge rounded-pill text-bg-success">Baja</span>';
                break;
        }
        taskItem.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.dueDate}</td>
            <td>${priorityBadge}</td>
            <td>${task.completed ? 'Sí' : 'No'}</td>
            <td class="d-flex">
                <button class="btn btn-primary" onclick="editTask(${index})">Editar <i class="bi bi-pencil-fill"></i></button>
                <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><button class="btn" onclick="toggleComplete(${index})">${task.completed ? 'No completada' : 'Completa <i class="bi bi-bookmark-check"></i>'}</button></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><button class="btn" onclick="deleteTask(${index})">Eliminar <i class="bi bi-trash3"></i></button></li>
                    </ul>
                </div>
            </td>
        `;
        taskList.appendChild(taskItem);
    });
    renderSummary();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    showAlert('Estado de la tarea actualizado!', 'info');
}

function renderSummary() {
    const userTasks = tasks.filter(task => task.user === User.email);
    const pendingTasks = userTasks.filter(task => !task.completed).length;
    const completedTasks = userTasks.filter(task => task.completed).length;
    const totalTasks = userTasks.length;

    document.getElementById('totalTasks').innerText = `Total de Tareas: ${totalTasks}`;
    document.getElementById('completedTasks').innerText = `Realizadas: ${completedTasks}`;
    document.getElementById('pendingTasks').innerText = `Pendientes: ${pendingTasks}`;
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('priority').value = task.priority;
    editIndex = index;
    const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
    taskModal.show();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    showAlert('Tarea eliminada correctamente!', 'danger');
}

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

renderTasks();

document.addEventListener('DOMContentLoaded', (event) => {
    const dateContainer = document.getElementById('dateContainer');
    const currentDate = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    dateContainer.textContent = currentDate.toLocaleDateString('es-ES', options);
    
    const nameContainer = document.getElementById('nameContainer');
    nameContainer.textContent = `Bienvenid@, ${User.name}`;
});
