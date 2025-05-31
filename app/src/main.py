from flask import Flask 
from flask import render_template, url_for, request, redirect
from markupsafe import escape
import os


app: Flask = Flask(__name__, static_folder=os.path.join("app", "front", "static"), static_url_path="/static", 
                   template_folder=os.path.join("app", "front", "pages"))

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/phonenumber", methods=["POST"])
def takePhone():
    if request.method == "POST":
        data = request.get_json()
        name = data.get('name','')

if __name__ == "__main__":
    app.run(host='10.100.144.213', port=5000, debug=True, threaded=False)
