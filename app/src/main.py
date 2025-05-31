from sqlite3 import IntegrityError

from flask import Flask, jsonify
from flask import render_template, url_for, request, redirect
from flask import session
from markupsafe import escape
import os
import queries
import send_sms, send_email

app: Flask = Flask(__name__, static_folder="../front/static/", static_url_path="/static", 
                   template_folder="../front/pages/")
app.secret_key = "prettySecret"

@app.route("/")
def home():
    return render_template("home.html")


@app.route("/submit", methods=["POST"])
async def takePhone():
    if request.method == "POST":
        try:
            data = request.get_json()
            if data and "type" in data:
                if data["type"] == "email":
                    email = data["email"]
                    name = data["name"]
                    preferred_response = 1
                    # Assuming 1 means email
                    query = f"INSERT INTO user_information (Name, Preferred_Contact, Phone, Email) VALUES ('{name}', {preferred_response},  NULL, '{email}');"
                    await queries.connect_db(query)
                    send_email.send_email(email)
                    return jsonify(response="success", message="Email data processed")
                elif data["type"] == "sms":
                    phone = data["phone"]
                    name = data["name"]
                    preferred_response = 2
                    # Assuming 2 means sms
                    query = f"INSERT INTO user_information (Name, Preferred_Contact, Phone, Email) VALUES ('{name}', {preferred_response}, '{phone}', NULL);"
                    await queries.connect_db(query)
                    send_sms.send_sms(phone)
                    return jsonify(response="success", message="SMS data processed")
                else:
                    return jsonify(response="error", message="Invalid 'type' in request"), 400
            else:
                return jsonify(response="error", message="Missing 'type' in request data"), 400
        except IntegrityError:
            return jsonify(response="error", message=f"Number/email already in the queue!"), 401
        except Exception as e:
            return jsonify(response="error", message=f"Error processing request: {str(e)}"), 500
    else:
        return jsonify(response="error", message="Only POST requests are allowed"), 405


@app.route("/queue", methods=["GET", "POST"])
def updateQueue():
    if request.method == "POST":
        pass      
    else:
        pass

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        if not data["email"] == "admin@gmail.com" or not data["password"] == "adminSkipQueue":
           return jsonify(response="error", message="Invalid administration information"), 401 
        session["login"] = True
        return jsonify(response="success")
    else:
        return render_template("adminLogin.html")
        

if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True, threaded=False)
