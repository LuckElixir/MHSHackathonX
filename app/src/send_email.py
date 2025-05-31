import smtplib, ssl
import traceback
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv(".env")

def send_email(sender, subject, messageText):
    port = 465  # For TLS
    smtp_server = "smtp.gmail.com"
    sender_email = "noreply.skipthequeue@gmail.com"  # Enter your address
    receiver_email = sender  # Enter receiver address
    password = os.environ["SMTP_PASSWORD"]
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = receiver_email
    message.attach(MIMEText(messageText, "plain"))
    context = ssl.create_default_context()
    try:
        with smtplib.SMTP_SSL(smtp_server, port) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        print(f"Email sent successfully to {sender}!")
    except Exception as e:
        print(f"An error occurred: {e}")
        print(traceback.format_exc())


