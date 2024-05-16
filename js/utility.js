// utility.js

const users = JSON.parse(localStorage.getItem('users')) || [];
const choreBank = [
    { name: 'Clearing the table', reward: 1, img: 'img/chores/clearing_the_table.png' },
    { name: 'Unpacking the dishwasher', reward: 2, img: 'img/chores/unpacking_the_dishwasher.png' },
    { name: 'Unpacking the groceries', reward: 2, img: 'img/chores/unpacking_the_groceries.png' },
    { name: 'Feeding the dog', reward: 1.5, img: 'img/chores/feeding_the_dog.png' },
    { name: 'Helping with dinner', reward: 2.5, img: 'img/chores/helping_with_dinner.png' },
    { name: 'Making the bed', reward: 1, img: 'img/chores/making_the_bed.png' },
    { name: 'Taking out the trash', reward: 1.5, img: 'img/chores/taking_out_the_trash.png' },
    { name: 'Putting toys away', reward: 1, img: 'img/chores/putting_toys_away.png' }
];
let selectedAvatar = '';
let selectedColor = '';
let currentUser = null;

// Utility functions

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function navigateTo(page) {
    window.location.href = page;
}

function goBack() {
    window.location.href = 'index.html';
}

function shadeColor(color, percent) {
    if (!color) return "#ffffff"; // Return white if color is undefined

    let f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = (f >> 8) & 0x00FF,
        B = f & 0x0000FF;
    return (
        "#" +
        (
            0x1000000 +
            (Math.round((t - R) * p) + R) * 0x10000 +
            (Math.round((t - G) * p) + G) * 0x100 +
            (Math.round((t - B) * p) + B)
        )
        .toString(16)
        .slice(1)
    );
}
