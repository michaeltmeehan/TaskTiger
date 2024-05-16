// Main script file to initialize the app and handle page-specific logic

document.addEventListener('DOMContentLoaded', () => {
    const currentUserIndex = localStorage.getItem('currentUserIndex');
    if (currentUserIndex !== null) {
        currentUser = users[currentUserIndex];
    }

    if (window.location.pathname.endsWith('index.html')) {
        loadUsers();
    } else if (window.location.pathname.endsWith('newuser.html')) {
        selectedAvatar = '';
        selectedColor = '';
    } else if (window.location.pathname.endsWith('avatar.html')) {
        if (currentUser) {
            loadAvatar();
        } else {
            console.error("No current user found.");
        }
    } else if (window.location.pathname.endsWith('user.html')) {
        if (currentUser) {
            document.getElementById('username').innerText = currentUser.name;
            loadAvatar();
            renderChores();
            renderSavings();
            loadChoreOptions(); // Ensure chore options are loaded correctly
        } else {
            console.error("No current user found.");
        }
    } else if (window.location.pathname.endsWith('chores.html')) {
        loadChoreBank();
    }
});
