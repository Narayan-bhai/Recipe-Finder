from flask import Flask,Blueprint
from routes.tables import tables_bp
app = Flask(__name__)
app.register_blueprint(tables_bp)


if __name__ == "__main__":
    print("Starting app...")
    app.run(debug=True)