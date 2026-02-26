from flask import Flask
from routes.tableBluePrint import tables_bp
from auth import auth_bp
from auth import *
from routes.insertInto import *
from routes.getRecipes import *
from protectedRoute import *
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(tables_bp)
app.register_blueprint(auth_bp)
CORS(
    app,
    supports_credentials=True,
    origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500"
        ]
    )
app.config["CORS_SUPPORTS_CREDENTIALS"] = True
if __name__ == "__main__":
    print("Starting app...")
    app.run(debug=True)