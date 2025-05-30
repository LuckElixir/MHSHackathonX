from flask import Flask 
from markupsafe import escape
import os


app: Flask = Flask(__name__, static_folder=os.path.join("app", "front", "static"), template_folder=os.path.join("app", "front", "static"))



if __name__ == "__main__":
    app.run()
