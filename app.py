import os
from flask import Flask, render_template

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "change-this-before-deployment")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/maamulka")
def maamulka():
    return render_template("admin.html")

@app.route("/health")
def health():
    return {"xaalad": "ok", "magac": "AYDIN CLEANING SERVICES"}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", 5000)), debug=True)
