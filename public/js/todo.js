const userId = getCookie('id');
updateTimeAndGreeting();
setInterval(updateTimeAndGreeting, 60000);

document.getElementById('customerName').innerText = getCookie('name');

// Fetch todos for this user
document.addEventListener('DOMContentLoaded', () => {
    fetch(`/todos?user_id=${userId}`)
        .then(res => res.json())
        .then(todos => {
            if (todos.length === 0) {
                document.getElementById('totalTasks').textContent = 0;
                document.getElementById('completedTasks').textContent = 0;
                document.getElementById('remainingTasks').textContent = 0;

                todoList.classList.add('hidden');
                emptyState.classList.remove('hidden');
            }
            todos.forEach(addTodoToDOM);
        });
});

document.getElementById('addTodoBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    const todoInput = document.getElementById('todoInput');
    const text = todoInput.value.trim();
    const userId = getCookie('id');

    if (!text) return;

    const res = await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, text })
    });

    if (res.ok) {
        const newTodo = await res.json();
        addTodoToDOM(newTodo);
        todoInput.value = '';
    }
});
