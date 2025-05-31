import smtplib, ssl
import traceback

def send_email(sender):
    port = 465  # For TLS
    smtp_server = "smtp.gmail.com"
    sender_email = "noreply.skipthequeue@gmail.com"  # Enter your address
    receiver_email = sender  # Enter receiver address
    password = "bmyp tpwf uwdk uufn"
    message = """\
Subject: Hi there

This message is sent from Python."""
    print("BeforeContext")
    context = ssl.create_default_context()
    try:
        print("BeforeWith")
        with smtplib.SMTP_SSL(smtp_server, port) as server:
            print("IntoWith")
            server.login(sender_email, password)
            print("AfterLogin")
            server.sendmail(sender_email, receiver_email, message)
        print("Email sent successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
        print(traceback.format_exc())


