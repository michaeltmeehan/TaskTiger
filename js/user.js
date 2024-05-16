// User-related functions

function addUser() {
    const userNameInput = document.getElementById('userNameInput');
    const name = userNameInput.value.trim();

    if (name && selectedAvatar && selectedColor) {
        users.push({
            name,
            avatar: selectedAvatar,
            color: selectedColor,
            chores: [],
            savings: 0,
            savingsHistory: []
        });
        console.log('User added:', users); // Debug log
        userNameInput.value = '';
        selectedAvatar = '';
        selectedColor = '';
        saveUsers();
        window.location.href = 'index.html';
    } else {
        alert('Please fill out all fields.');
    }
}

function deleteUser(index) {
    if (confirm(`Are you sure you want to delete ${users[index].name}?`)) {
        users.splice(index, 1); // Remove the user from the array
        saveUsers(); // Save the updated array to localStorage
        loadUsers(); // Reload the user list
    }
}

function deleteCurrentUser() {
    if (confirm(`Are you sure you want to delete ${currentUser.name}?`)) {
        const index = users.findIndex(user => user.name === currentUser.name);
        if (index !== -1) {
            users.splice(index, 1); // Remove the user from the array
            saveUsers(); // Save the updated array to localStorage
            window.location.href = 'index.html'; // Redirect to dashboard
        }
    }
}

function selectUser(index) {
    currentUser = users[index];
    localStorage.setItem('currentUserIndex', index);
    window.location.href = 'user.html';
}

function editProfile() {
    window.location.href = 'avatar.html'; // Redirect to the edit profile page
}

function saveEditedUser() {
    const userNameInput = document.getElementById('userNameInput');
    currentUser.name = userNameInput.value.trim();
    currentUser.avatar = selectedAvatar;
    currentUser.color = selectedColor;

    saveUsers();

    // Redirect to the specific user profile page
    window.location.href = 'user.html';
}

function loadUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    console.log('Loaded users:', users); // Debug log
    users.forEach((user, index) => {
        createUserButton(user, index, userList);
    });
}

function createUserButton(user, index, userList) {
    if (!user.color) {
        user.color = "#ffffff"; // Default color if not set
    }
    const div = document.createElement('div');
    div.className = 'user';
    div.innerHTML = `
        <button onclick="selectUser(${index})" style="--color: ${user.color}; --hover-color: ${shadeColor(user.color, -20)};">
            <img src="img/avatars/${user.avatar}" alt="Avatar">
            <span style="color: black;">${user.name} - $${user.savings.toFixed(2)}</span>
        </button>`;
    userList.appendChild(div);
}


function selectAvatar(avatar) {
    selectedAvatar = avatar;
    const avatarElements = document.querySelectorAll('.avatars img');
    avatarElements.forEach(element => {
        if (element.src.includes(avatar)) {
            element.classList.add('selected');
        } else {
            element.classList.remove('selected');
        }
    });
}

function selectColor(color) {
    selectedColor = color;
    const colorElements = document.querySelectorAll('.color-box');
    colorElements.forEach(element => {
        if (element.style.backgroundColor === color) {
            element.classList.add('selected');
        } else {
            element.classList.remove('selected');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUserIndex = localStorage.getItem('currentUserIndex');
    if (currentUserIndex !== null) {
        currentUser = users[currentUserIndex];
    }

    if (window.location.pathname.endsWith('user.html')) {
        if (currentUser) {
            const usernameElement = document.getElementById('username');
            if (usernameElement) {
                usernameElement.innerText = currentUser.name;
            } else {
                console.error("username element not found.");
            }
            if (document.getElementById('avatar-display')) {
                loadAvatar();
            }
            if (document.getElementById('chores')) {
                renderChores();
            }
            if (document.getElementById('savings-total')) {
                renderSavings();
            }
            if (document.getElementById('chore-buttons')) {
                loadChoreOptions();
            }
        } else {
            console.error("currentUser is not set.");
        }
    } else if (window.location.pathname.endsWith('index.html')) {
        loadUsers();
    } else if (window.location.pathname.endsWith('newuser.html')) {
        selectedAvatar = '';
        selectedColor = '';
    } else if (window.location.pathname.endsWith('avatar.html')) {
        if (currentUser) {
            if (document.getElementById('avatar-display')) {
                loadAvatar();
            }
        } else {
            console.error("current user not set.");
        }
    } else if (window.location.pathname.endsWith('chores.html')) {
        loadChoreBank();
    }
});

function loadAvatar() {
    const avatarDisplay = document.getElementById('avatar-display');
    if (!avatarDisplay) {
        console.error("avatar-display element not found.");
        return;
    }
    avatarDisplay.innerHTML = `<img src="img/avatars/${currentUser.avatar}" alt="Avatar">`;
    const usernameElement = document.getElementById('username');
    if (usernameElement) {
        usernameElement.innerText = currentUser.name;
    } else {
        console.error("username element not found.");
    }
    document.body.style.backgroundColor = currentUser.color;
}
