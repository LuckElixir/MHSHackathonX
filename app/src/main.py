from flask import Flask, jsonify 
from flask import render_template, url_for, request, redirect
from markupsafe import escape
import os
import queries


app: Flask = Flask(__name__, static_folder=os.path.join("app", "front", "static"), static_url_path="/static", 
                   template_folder=os.path.join("app", "front", "pages"))

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/submit", methods=["POST"])
def takePhone():
    if request.method == "POST":
        data = request.get_json()
        if data["type"] == "email":
            # data["email"] and data["name"] both exist
            queries.connect_db("DUMMY QUERY") #UPDATE IT, WITH NULL FOR THE EMPTY COLUMN

             
        if data["type"] == "sms":
            # data["phone"] and data["name"] both exist
            queries.connect_db("DUMMY QUERY") #UPDATE IT, WITH NULL FOR THE EMPTY COLUMN
    
    return jsonify(response="success")

@app.route("/updateQueue", methods=["POST"])
def updateQueue():
    if request.method == "POST":
        result = queries.connect_db("DUMMY QUERY") #FIX THE CONNECT DB SO IT GIVES A RESULT
        # figure out what makes this tick

    return jsonify("""FILL IT WITH SOMETHING""")



if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True, threaded=False)
