fetch('/users')
    .then(res => res.json())
    .then(users => {
        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = '';

        users.forEach(user => {
            if (user.email != 'admin@gmail.com') {
                document.getElementById('noUser').style.display = 'none';
                document.getElementById('existUser').style.display = 'block';

                const tr = document.createElement('tr');

                tr.innerHTML = `
                <td class="text-center py-5">${user.id}</td>
                <td class="text-center py-5">${user.name}</td>
                <td class="text-center py-5">${user.email}</td>
                <td class="text-center py-5">${new Date(user.created_at).toLocaleDateString()}</td>
                <td class="text-center py-5">
                    <button class="text-red-500 hover:underline" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
                tbody.appendChild(tr);
            }
        });
    })
    .catch(err => console.log(err));

document.getElementById('search').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('#userTableBody tr');

    rows.forEach(row => {
        const name = row.children[1]?.innerText.toLowerCase() || '';
        const email = row.children[2]?.innerText.toLowerCase() || '';

        const match = name.includes(searchTerm) || email.includes(searchTerm);
        row.style.display = match ? '' : 'none';
    });
});
