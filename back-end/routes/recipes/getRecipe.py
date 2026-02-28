from flask import jsonify,request
from db.connect import connectDb
from mysql.connector import Error
from routes.recipes import tables_bp

@tables_bp.route("/getRecipe/<int:recipe_id>")
def getRecipe(recipe_id):

    try:
        conn = connectDb()
        cursor = conn.cursor()

        cursor.execute("SELECT name, instructions FROM recipe WHERE id = %s", (recipe_id,))
        recipe_row = cursor.fetchone()

        if not recipe_row:
            return jsonify({"message": "Recipe not found with given id"}), 404
        
        recipe_name = recipe_row[0]
        instructions = recipe_row[1].split("|") if recipe_row[1] else []

        cursor.execute(
            """
            SELECT i.name, ri.quantity, ri.unit, ri.size, ri.notes
            FROM recipe_ingredient ri
            JOIN ingredient i ON ri.ingredient_id = i.id
            WHERE ri.recipe_id = %s""", 
            (recipe_id,)
        )
        ingredients_rows = cursor.fetchall()
        
        ingredients = [
            {
                "name": row[0],
                "quantity": row[1],
                "unit": row[2],
                "size": row[3],
                "notes": row[4]
            }
            for row in ingredients_rows
        ]
        
        return jsonify({
            "recipe": {
                "name": recipe_name,
                "instructions": instructions,
                "ingredients": ingredients
            }
        })
    except Error as e:
        print("Error while getting recipes",e)
        return jsonify({"message":str(e)}),500
    finally:
        cursor.close()
        conn.close()

