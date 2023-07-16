// Fetch user information from the server
fetch('http://localhost:3000/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(user => {
  // Replace the placeholders with user information
  document.getElementById('username').textContent = user.name;
//   document.getElementById('phoner').textContent = user.phone;
})
.catch(error => {
  console.log('Error fetching user information:', error);
});








// Function to switch between different sections (Products, Cart, Orders)
function switchSection(sectionId) {
  // Hide all sections
  const sections = document.getElementsByClassName("section");
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  selectedSection.style.display = "block";

  // Highlight the selected button
  const buttons = document.getElementsByClassName("nav-button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  const selectedButton = document.getElementById(sectionId + "Btn");
  selectedButton.classList.add("active");
}

// Event listeners for navigation buttons
document.getElementById("productsBtn").addEventListener("click", function() {
  switchSection("products");
});

document.getElementById("cartBtn").addEventListener("click", function() {
  switchSection("cart");
});

document.getElementById("ordersBtn").addEventListener("click", function() {
  switchSection("orders");
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    // Remove the token from the session storage
    //sessionStorage.removeItem("token");
    
    // Redirect to login page
    window.location.href = "login.html";
});
