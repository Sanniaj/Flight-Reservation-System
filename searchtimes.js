// 24 hour time
const hourSelect = document.getElementById("arrival-hour");
for (let i = 0; i < 24; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i.toString().padStart(2, '0') + ":00";
    hourSelect.appendChild(option);
}

// random number because this is just a prototype
function FlightTime(hour) {
    const minute = Math.floor(Math.random() * 60);
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function showFlightTimes() {
    const hour = parseInt(document.getElementById("arrival-hour").value);
    const date = document.getElementById("arrival-date").value;

    if (!date) {
        alert("Please select a date.");
        return;
    }

    const container = document.getElementById("flight-times");
    container.innerHTML = ""; // clear old results

    for (let i = 0; i < 10; i++) {
        const time = FlightTime(hour);
        const entry = document.createElement("div");
        entry.textContent = `Flight ${i + 1}: ${date} at ${time}`;
        container.appendChild(entry);
    }
}

document.getElementById("arrival-date").addEventListener("keydown", function (e) {
    if (e.key === "Enter") showFlightTimes();
});
document.getElementById("arrival-hour").addEventListener("keydown", function (e) {
    if (e.key === "Enter") showFlightTimes();
});
