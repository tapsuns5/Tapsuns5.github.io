<?php
require 'vendor/autoload.php';

use Dotenv\Dotenv;

// Load environment variables from .env file
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Determine the environment (default to production if not set)
$environment = $_ENV['ENVIRONMENT'] ?? 'production';

// Database configuration
if ($environment === 'development') {
    $servername = $_ENV['DB_HOST'];
    $username = $_ENV['DB_USERNAME'];
    $password = $_ENV['DB_PASSWORD'];
    $dbname = $_ENV['DB_NAME'];
} else {
    $servername = $_ENV['PROD_DB_HOST'];
    $username = $_ENV['PROD_DB_USERNAME'];
    $password = $_ENV['PROD_DB_PASSWORD'];
    $dbname = $_ENV['PROD_DB_NAME'];
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"]; // Get the email from the POST request

    // Prepare and bind the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO email_subscribers (email) VALUES (?)");
    $stmt->bind_param("s", $email);

    // Execute the statement
    if ($stmt->execute()) {
        // Send a confirmation email to the user
        $to = $email;
        $subject = "Subscription Confirmation";
        $message = "Thank you for subscribing to our newsletter!";
        $headers = "From: no-reply@example.com";

        // Check if the email was sent successfully
        if (mail($to, $subject, $message, $headers)) {
            echo "success"; // Return success response
        } else {
            echo "Failed to send email."; // Return failure response
        }
    } else {
        echo "Error: " . $stmt->error; // Return SQL error
    }

    // Close the prepared statement
    $stmt->close();
}

// Close the database connection
$conn->close();
?>
