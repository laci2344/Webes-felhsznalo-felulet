function updateLiveClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock-time').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateLiveClock, 1000);
updateLiveClock();
