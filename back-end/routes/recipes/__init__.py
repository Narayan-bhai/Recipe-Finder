from flask import Blueprint
tables_bp = Blueprint("tables_bp", __name__)    

from . import searchRecipes
from . import getRecipe
from . import insertRecipe