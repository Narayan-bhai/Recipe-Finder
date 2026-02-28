from routes.recipes import tables_bp
from routes.auth import auth_bp

def register_blueprints(app):
    app.register_blueprint(tables_bp)
    app.register_blueprint(auth_bp)

