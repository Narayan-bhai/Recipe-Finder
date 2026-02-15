from flask import Flask
from routes.tableBluePrint import tables_bp
from routes.insertInto import *
from routes.getRecipes import *
from flask_cors import CORS
app = Flask(__name__)
app.register_blueprint(tables_bp)

CORS(app)
if __name__ == "__main__":
    print("Starting app...")
    app.run(debug=True)