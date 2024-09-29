<?php
// Sanitize form inputs
$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

// Check honeypot fields (bot detection)
if (!empty($_POST['bot-field']) || !empty($_POST['_honey'])) {
    die('Error! Bot detected.');
}

// Validate email format
if (!$email) {
    die('Error! Invalid email address.');
}

$subject = 'From: ' . $name;
$mailheader = "From: " . $name . " <" . $email . ">\r\n";
$recipient = "info@webify.org.za";

// Send the main email
if (mail($recipient, $subject, $message, $mailheader)) {
    // Send a confirmation email to the user
    $user_subject = "Thank you for contacting us!";
    $user_message = "Dear $name,\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nWebify Team";
    $user_mailheader = "From: info@webify.org.za";

    mail($email, $user_subject, $user_message, $user_mailheader);

    // Redirect to success page
    header("Location: /views/success.html");
    exit();
} else {
    // Log error to file and show generic message
    error_log("Mail failed to send from: $name <$email>", 3, 'errors.log');
    die("Error! Message Not Sent.");
}
?>