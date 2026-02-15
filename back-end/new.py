from flask import Flask
from routes.tables import tables_bp
from flask_cors import CORS
from routes.insertInto import *
app = Flask(__name__)
app.register_blueprint(tables_bp)

CORS(app)
if __name__ == "__main__":
    print("Starting app...")
    app.run(debug=True)