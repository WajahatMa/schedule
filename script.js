document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            // Example credentials
            var correctUsername = "atif";
            var correctPassword = "cow";

            if (username === correctUsername && password === correctPassword) {
                localStorage.setItem("loggedIn", "true"); // Store login state
                window.location.href = "calendar.html"; // Redirect to Calendar
            } else {
                document.getElementById("error-message").innerText = "Invalid username or password.";
            }
        });
    }

    // Ensure only logged-in users can access the calendar page
    if (window.location.pathname.includes("calendar.html")) {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "index.html"; // Redirect to login page if not authenticated
        } else {
            displayCalendar(); // Show calendar if logged in
        }
    }
});

// Function to display the 2025 calendar
function displayCalendar() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let calendarHTML = "<h2>2025 Calendar</h2>";
    for (let i = 0; i < 12; i++) {
        calendarHTML += `<h3 class="${i === currentMonth ? "current-month" : ""}">${months[i]} 2025</h3>`;
        calendarHTML += generateMonthTable(i, 2025);
    }

    document.getElementById("calendar").innerHTML = calendarHTML;
}

// Function to generate a month table
function generateMonthTable(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let table = "<table><tr>";
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let day of daysOfWeek) {
        table += `<th>${day}</th>`;
    }
    table += "</tr><tr>";

    let dayCounter = 1;
    for (let i = 0; i < 6; i++) { // Max 6 weeks
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                table += "<td></td>"; // Empty cells before the first day
            } else if (dayCounter <= daysInMonth) {
                table += `<td>${dayCounter}</td>`;
                dayCounter++;
            } else {
                table += "<td></td>";
            }
        }
        table += "</tr>";
        if (dayCounter > daysInMonth) break;
    }

    return table + "</table>";
}

// Logout functionality
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn"); // Clear login state
            window.location.href = "index.html"; // Redirect to login page
        });
    }
});
