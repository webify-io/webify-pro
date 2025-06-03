<?php
// Sanitize form inputs
$name = filter_var($_POST['name'], FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$message = filter_var($_POST['message'], FILTER_SANITIZE_SPECIAL_CHARS); //Prevents XSS attacks by escaping special characters but keeps HTML entities intact

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

// Read signature HTML file
$signature = file_get_contents(__DIR__ . '/signature.html');

/* $signature = file_get_contents(__DIR__ . '/views/signature.html'); // If inside HTML folder */
/* $signature = file_get_contents('signature.html'); */

// Send the main email
if (mail($recipient, $subject, $message, $mailheader)) {
    // Send a confirmation email to the user
    $user_subject = "Thank you for contacting us!";
    $user_message = "
        <html>
        <body>
            <p>Dear $name,</p>
            <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
            <p>Best regards,<br>The Webify Team</p>
            $signature
        </body>
        </html>
    ";
    
    //Define the MIME (Multipurpose Internet Mail Extensions) version:
    //Included Content-Type, ensures the email content is interpreted correctly as HTML, rather than plain text:
    $user_mailheader = "MIME-Version: 1.0\r\n";
    $user_mailheader .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $user_mailheader .= "From: Webify Support <info@webify.org.za>\r\n";

    mail($email, $user_subject, $user_message, $user_mailheader);

    // Redirect to success page
    header("Location: /views/success.html");

    exit();

} else {
    // Get error details (last occurred error)
    $errorDetails = error_get_last();
    
    // Format detailed log entry
    $logMessage = "[" . date("Y-m-d H:i:s") . "] ERROR: Mail failed to send from: $name <$email>\n";
    $logMessage .= "Error Type: " . ($errorDetails['type'] ?? 'Unknown') . "\n";
    $logMessage .= "Error Message: " . ($errorDetails['message'] ?? 'No message') . "\n";
    $logMessage .= "File: " . ($errorDetails['file'] ?? 'Unknown file') . "\n";
    $logMessage .= "Line: " . ($errorDetails['line'] ?? 'Unknown line') . "\n";
    $logMessage .= "-----------------------------\n";

    // Log error to file
    error_log($logMessage, 3, 'errors.log');

    // Redirect to error page
    header("Location: /error.html");
exit();
}

?>