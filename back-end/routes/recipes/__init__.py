from flask import Blueprint
recipe_bp = Blueprint("recipe_bp", __name__)    

from . import searchRecipes
from . import getRecipe
from . import insertRecipe