const modeToggleBtn = document.getElementById('mode-toggle');
let darkMode = false;

modeToggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    updateMode();
});

function updateMode() {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        modeToggleBtn.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        modeToggleBtn.textContent = 'Dark Mode';
    }
}
