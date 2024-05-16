// Chore-related functions
let choreBank = [
    { name: 'Clearing the table', reward: 1, img: 'img/chores/clearing_the_table.png' },
    { name: 'Unpacking the dishwasher', reward: 2, img: 'img/chores/unpacking_the_dishwasher.png' },
    { name: 'Unpacking the groceries', reward: 2, img: 'img/chores/unpacking_the_groceries.png' },
    { name: 'Feeding the dog', reward: 1.5, img: 'img/chores/feeding_the_dog.png' },
    { name: 'Helping with dinner', reward: 2.5, img: 'img/chores/helping_with_dinner.png' },
    { name: 'Making the bed', reward: 1, img: 'img/chores/making_the_bed.png' },
    { name: 'Taking out the trash', reward: 1.5, img: 'img/chores/taking_out_the_trash.png' },
    { name: 'Putting toys away', reward: 1, img: 'img/chores/putting_toys_away.png' }
];

function updateChoreReward(index, reward) {
    choreBank[index].reward = parseFloat(reward);
    saveChoreBank();
}

function saveChoreBank() {
    localStorage.setItem('choreBank', JSON.stringify(choreBank));
}

function loadChoreBank() {
    const storedChoreBank = localStorage.getItem('choreBank');
    if (storedChoreBank) {
        choreBank = JSON.parse(storedChoreBank);
    }
    const choreList = document.getElementById('chore-list');
    if (!choreList) {
        console.error("chore-list element not found.");
        return;
    }
    choreList.innerHTML = '';
    choreBank.forEach((chore, index) => {
        const div = document.createElement('div');
        div.className = 'chore';
        div.innerHTML = `
            <img src="${chore.img}" alt="${chore.name}">
            <span>${chore.name}</span>
            <input type="number" value="${chore.reward}" min="0" step="0.01" onchange="updateChoreReward(${index}, this.value)">
        `;
        choreList.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('chores.html')) {
        loadChoreBank();
    }
});



function loadChoreOptions() {
    const choreButtons = document.getElementById('chore-buttons');
    if (!choreButtons) {
        console.error("chore-buttons element not found.");
        return;
    }
    console.log("Loading chore options..."); // Debug log
    choreButtons.innerHTML = '';
    choreBank.forEach((chore, index) => {
        const button = document.createElement('button');
        button.className = 'chore-button';
        button.innerHTML = `<img src="${chore.img}" alt="${chore.name}"><br>${chore.name} - $${chore.reward.toFixed(2)}`;
        button.onclick = () => addSelectedChore(index);
        choreButtons.appendChild(button);
    });
}

function addSelectedChore(choreIndex) {
    console.log("Adding selected chore:", choreIndex); // Debug log
    const selectedChore = choreBank[choreIndex];
    const timestamp = new Date().toISOString();
    currentUser.chores.push({ chore: selectedChore.name, reward: selectedChore.reward, timestamp });
    currentUser.savings += selectedChore.reward;
    currentUser.savingsHistory.push({ date: timestamp, amount: currentUser.savings });
    saveUsers();
    renderChores();
    renderSavings();
}

function renderChores() {
    const choreList = document.getElementById('chores');
    if (!choreList) {
        console.error("chores element not found.");
        return;
    }
    choreList.innerHTML = '';
    const choreCounts = {};
    currentUser.chores.forEach(choreItem => {
        if (!choreCounts[choreItem.chore]) {
            choreCounts[choreItem.chore] = 0;
        }
        choreCounts[choreItem.chore]++;
    });
    for (const chore in choreCounts) {
        const div = document.createElement('div');
        div.className = 'chore';
        div.innerHTML = `<span>${chore}</span><span>${choreCounts[chore]} times</span>`;
        choreList.appendChild(div);
    }
}

let savingsChartInstance;

function renderSavings() {
    const savingsTotal = document.getElementById('savings-total');
    if (!savingsTotal) {
        console.error("savings-total element not found.");
        return;
    }
    const totalSavings = currentUser.savings.toFixed(2);
    savingsTotal.textContent = `$${totalSavings}`;

    const ctx = document.getElementById('savingsChart').getContext('2d');
    if (savingsChartInstance) {
        savingsChartInstance.destroy();
    }

    if (!currentUser.savingsHistory) {
        currentUser.savingsHistory = [];
    }

    const labels = currentUser.savingsHistory.map(entry => new Date(entry.date).toLocaleDateString());
    const data = currentUser.savingsHistory.map(entry => entry.amount);

    savingsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Savings Over Time',
                data,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true,
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutBounce'
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('user.html')) {
        currentUser = users[localStorage.getItem('currentUserIndex')];
        if (document.getElementById('chores')) {
            renderChores();
        }
        if (document.getElementById('savings-total')) {
            renderSavings();
        }
        if (document.getElementById('chore-buttons')) {
            loadChoreOptions();
        }
    } else if (window.location.pathname.endsWith('chores.html')) {
        loadChoreBank();
    }
});
