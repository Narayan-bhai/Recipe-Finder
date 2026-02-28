from routes.recipes import recipe_bp
from routes.auth import auth_bp

def register_blueprints(app):
    app.register_blueprint(recipe_bp)
    app.register_blueprint(auth_bp)

