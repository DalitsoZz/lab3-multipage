document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
  
    // Load stored theme preference
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-theme");
    }
  
    themeToggle?.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
    });
  
    // FAQ toggle logic
    document.querySelectorAll(".faq-item .question").forEach(q => {
      q.addEventListener("click", () => {
        const answer = q.nextElementSibling;
        if (answer) {
          // Toggle the display property of the answer
          answer.style.display = answer.style.display === "block" ? "none" : "block";
        }
      });
    });
  
    // Contact form submit handler (optional)
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", e => {
        e.preventDefault();
  
        const name = document.getElementById("nameInput").value.trim();
        const message = document.getElementById("messageInput").value.trim();
  
        if (name === "" || message === "") {
          alert("Please fill out all fields.");
        } else {
          document.getElementById("response").innerText = `Thanks, ${name}. We'll get back to you soon!`;
          contactForm.reset(); // Optional: Reset the form after successful submission
        }
      });
    }
  
    // Load users button click event
    document.getElementById("loadUsersButton")?.addEventListener("click", async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
  
        if (!response.ok) throw new Error("Network response was not ok");
  
        const users = await response.json();
        const usersList = document.getElementById("userList");
        if (!usersList) return;
  
        usersList.innerHTML = "";
        users.forEach(user => {
          const li = document.createElement("li");
          li.textContent = `${user.name} - ${user.email}`;
          usersList.appendChild(li);
        });
      } catch (error) {
        console.error("Failed to load users:", error);
        alert("Failed to load users. Please try again.");
      }
    });

    // Real-time clock functionality
    const clockElement = document.getElementById("clock");
  
    function updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  
    // Initial clock update and set interval to update every second
    updateClock();
    setInterval(updateClock, 1000);

    // Slider functionality for images in services section
    let currentIndex = 0;
    const images = document.querySelectorAll(".slider-image");

    function rotateImages() {
      images.forEach((img, index) => {
        img.style.transition = "opacity 1s ease-in-out"; // Smooth transition
        img.style.opacity = index === currentIndex ? "1" : "0"; // Fade images in and out
      });
      currentIndex = (currentIndex + 1) % images.length;
    }

    setInterval(rotateImages, 5000); // Rotate every 5 seconds
    rotateImages(); // Show the first image initially
});
