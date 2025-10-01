<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $to = "emirhanhalilkarakus@gmail.com"; // Senin e-posta adresin
    $subject = $_POST['subject'] ?: "Yeni Mesaj"; // Konu yoksa default
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $body = "Gönderen: $name\nE-posta: $email\n\nMesaj:\n$message";

    $headers = "From: $email\r\nReply-To: $email\r\n";

    if(mail($to, $subject, $body, $headers)){
        echo "Mesajınız başarıyla gönderildi!";
    } else {
        echo "Mesaj gönderilemedi. Lütfen tekrar deneyin.";
    }
} else {
    echo "Geçersiz istek!";
}
?>
