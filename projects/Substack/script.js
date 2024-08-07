document.addEventListener('DOMContentLoaded', function () {
    // Handle "No Thanks" button click
    document.querySelector('.no-thanks-button').addEventListener('click', function () {
        window.location.href = 'https://tylerpalmer5.com';  // Replace with your desired URL
    });

    // Handle form submission
    const form = document.querySelector('.subscribe-form');
    const emailInput = document.querySelector('.email-input');
    const errorMessage = document.createElement('p');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');

    // Set initial styles for error message
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none';
    errorMessage.textContent = 'Please enter a valid email address.';
    form.appendChild(errorMessage);

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting

        const email = emailInput.value;

        if (isValidEmail(email)) {
            errorMessage.style.display = 'none';
            showModal();
            // Optionally, clear the email input field
            emailInput.value = '';

            // Submit the form using AJAX
            const xhr = new XMLHttpRequest();
            xhr.open("POST", form.action, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                    // Redirect after success
                    setTimeout(function () {
                        window.location.href = 'https://tylerpalmer5.com'; // Change this to your desired URL
                    }, 2000); // 2-second delay before redirecting
                }
            };
            xhr.send(`email=${encodeURIComponent(email)}`);
        } else {
            errorMessage.style.display = 'block';
        }
    });

    // Close the modal when the user clicks the close button
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close the modal when the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function isValidEmail(email) {
        // Regular expression pattern for validating an email
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Test the email against the pattern
        return emailPattern.test(email);
    }

    function showModal() {
        modal.style.display = 'block';
    }
});
