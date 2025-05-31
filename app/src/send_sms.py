import smtplib, ssl
import traceback
from dotenv import load_dotenv
import os

load_dotenv(".env")

def send_sms(sender, message):
    CARRIER_MAP = {
    "tmobile": "@tmomail.net",
    "googlefi": "@msg.fi.google.com",
    "at&t": "@txt.att.net",
    "verizon": "@vtext.com",
    #"sprint": "@messaging.sprintpcs.com",
    #"boost": "@smsmyboostmobile.com",
    #"cricket": "@sms.cricketwireless.net",
    #"uscellular": "@email.uscc.net",
}
    port = 465  # For TLS
    smtp_server = "smtp.gmail.com"
    sender_email = "noreply.skipthequeue@gmail.com"  # Enter your address
    receiver_email = sender  # Enter receiver address
    password = os.environ["SMTP_PASSWORD"]
    context = ssl.create_default_context()
    try:
        for value in CARRIER_MAP.values():
            try:
                with smtplib.SMTP_SSL(smtp_server, port) as server:
                    print(message)
                    server.login(sender_email, password)
                    server.sendmail(sender_email, (receiver_email + value), message)
            except Exception as e:
                print(e)
                print(traceback.format_exc())
                continue
        print("Text sent successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
        print(traceback.format_exc())


