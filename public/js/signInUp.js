document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (res.ok) {
        const user = await res.json();

        setCookie('id', user.id);
        setCookie('email', user.email);
        setCookie('name', user.name);

        if (email === 'admin@gmail.com' && password === 'admin') {
            window.location.href = '../pages/dashboard.html';
        } else {
            window.location.href = '../pages/todo.html';
        }
    } else {
        const { error } = await res.json();
        alert(error);
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const name = document.getElementById('username').value;
    const email = document.getElementById('registerEmail').value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        return;
    }

    const res = await fetch('register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword })
    });

    if (res.ok) {
        window.location.href = '/';
    } else {
        const { error } = await res.json();
        alert(error);
    }
});
