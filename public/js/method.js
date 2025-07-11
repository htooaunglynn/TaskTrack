function setCookie(id, email, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(id)}=${encodeURIComponent(email)}; expires=${expires}; path=/`;
}

function deleteCookie(id) {
    document.cookie = id + '=; Max-Age=0; path=/';
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/users/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.status === 204) location.reload();
                else alert('Failed to delete user');
            });
    }
}

function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
    document.querySelector('title').innerText = "Regsiter";
}

function showLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
    document.querySelector('title').innerText = "Login";
}

// function addTodoToDOM(todo) {
//     const todoList = document.getElementById('todoList');
//     const article = document.createElement('article');
//     article.className = "border-2 flex justify-between cursor-pointer hover:bg-stone-100 px-3 py-4 mb-4";
//     article.dataset.id = todo.id;

//     article.innerHTML = `
//         <div class="flex items-center justify-center">
//             <input class="w-4 h-4 mr-3 border-stone-950 border-8 rounded-none" type="checkbox" ${todo.completed ? 'checked' : ''}>
//             <label>${todo.text}</label>
//         </div>
//         <div class="text-red-500 hover:underline cursor-pointer delete-btn">Delete</div>
//     `;

//     // Append above the stats
//     const stats = document.querySelector('#todoList > .border-b-2');
//     todoList.insertBefore(article, stats);

//     // Handle checkbox toggle
//     const checkbox = article.querySelector('input[type="checkbox"]');
//     checkbox.addEventListener('change', () => {
//         fetch(`/todos/${todo.id}/complete`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ completed: checkbox.checked })
//         }).then(() => updateCounts());
//     });

//     // Handle delete
//     article.querySelector('.delete-btn').addEventListener('click', () => {
//         fetch(`/todos/${todo.id}`, { method: 'DELETE' })
//             .then(res => {
//                 if (res.ok) {
//                     article.remove();
//                     updateCounts();
//                 }
//             });
//     });

//     updateCounts();
// }

// function updateCounts() {
//     const allTodos = document.querySelectorAll('#todoList article[data-id]');
//     const completedTodos = document.querySelectorAll("#todoList article[data-id] input[type='checkbox']:checked");

//     const totalTasksEl = document.getElementById('totalTasks');
//     const completedTasksEl = document.getElementById('completedTasks');
//     const remainingTasksEl = document.getElementById('remainingTasks');

//     if (totalTasksEl && completedTasksEl && remainingTasksEl) {
//         totalTasksEl.textContent = allTodos.length;
//         completedTasksEl.textContent = completedTodos.length;
//         remainingTasksEl.textContent = allTodos.length - completedTodos.length;
//     } else {
//         console.warn("One or more task counter elements not found in the DOM.");
//     }
// }

function signOut() {
    deleteCookie('id');
    deleteCookie('email');
    deleteCookie('name');
    window.location.href = '/';
}

function updateTimeAndGreeting() {
    const timeElement = document.getElementById('currentTime');
    const greetingElement = document.getElementById('greeting');

    const now = new Date();

    // Format time as hh:mm AM/PM
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleTimeString([], options);

    // Set greeting based on hour
    const hour = now.getHours();
    let greeting = '';

    if (hour < 12) {
        greeting = 'Good Morning!';
    } else if (hour < 18) {
        greeting = 'Good Afternoon!';
    } else {
        greeting = 'Good Evening!';
    }

    // Update DOM
    timeElement.textContent = timeString;
    greetingElement.textContent = greeting;
}


function updateCounts() {
    const todos = document.querySelectorAll('#todoList article[data-id]');
    const completed = document.querySelectorAll('#todoList input[type="checkbox"]:checked');

    const total = todos.length;
    const complete = completed.length;
    const remaining = total - complete;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = complete;
    document.getElementById('remainingTasks').textContent = remaining;

    const todoList = document.getElementById('todoList');
    const emptyState = document.getElementById('emptyState');

    if (total === 0) {
        todoList.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        todoList.classList.remove('hidden');
        emptyState.classList.add('hidden');
    }
}

function addTodoToDOM(todo) {
    const todoList = document.getElementById('todoList');
    const stats = todoList.querySelector('.border-b-2');

    const article = document.createElement('article');
    article.className = "border-2 flex justify-between cursor-pointer hover:bg-stone-100 px-3 py-4 mb-4";
    article.dataset.id = todo.id;

    article.innerHTML = `
        <div class="flex items-center justify-center">
            <input class="w-4 h-4 mr-3 border-stone-950 border-8 rounded-none" type="checkbox" ${todo.completed ? 'checked' : ''}>
            <label>${todo.text}</label>
        </div>
        <div class="text-red-500 hover:underline cursor-pointer delete-btn">Delete</div>
    `;

    // Insert before stats
    todoList.insertBefore(article, stats);

    // Checkbox toggle
    article.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
        fetch(`/todos/${todo.id}/complete`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: e.target.checked })
        }).then(updateCounts);
    });

    // Delete todo
    article.querySelector('.delete-btn').addEventListener('click', () => {
        fetch(`/todos/${todo.id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    article.remove();
                    updateCounts();
                }
            });
    });

    updateCounts();
}
