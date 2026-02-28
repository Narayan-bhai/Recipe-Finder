from flask import Flask
from flask_cors import CORS
from routes import register_blueprints

app = Flask(__name__)
register_blueprints(app)

CORS(app,supports_credentials=True,origins="*")
if __name__ == "__main__":
    print("Starting app...")
    app.run(debug=True)