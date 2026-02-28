from flask import Blueprint
tables_bp = Blueprint("tables_bp", __name__)    

from . import getRecipes
from . import insertRecipe