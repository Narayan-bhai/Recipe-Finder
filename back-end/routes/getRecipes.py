from flask import jsonify,request
from db.connect import connectDb
from mysql.connector import Error
from routes.tableBluePrint import tables_bp
@tables_bp.route("/getRecipes?")
@tables_bp.route("/getRecipes")
def getRecipes():

    recipe_name = request.args.get("name", "")

    con = connectDb()
    if con is None:
        return {}

    try:
        cursor = con.cursor()

        query = """
        SELECT 
            r.name,
            r.instructions,
            GROUP_CONCAT(
                CONCAT_WS(' ',
                    i.name,
                    NULLIF(LOWER(ri.quantity), 'nan'),
                    NULLIF(LOWER(ri.unit), 'nan'),
                    NULLIF(LOWER(ri.size), 'nan'),
                    NULLIF(LOWER(ri.notes), 'nan')
                )
                SEPARATOR ', '
            ) AS ingredients
        FROM recipe r
        JOIN recipe_ingredient ri ON r.id = ri.recipe_id
        JOIN ingredient i ON ri.ingredient_id = i.id
        WHERE r.name LIKE %s
        GROUP BY r.id, r.name, r.instructions
        LIMIT 100;
        """

        cursor.execute(query, (f"%{recipe_name}%",))

        recipes = cursor.fetchall()

        return jsonify({"recipes": recipes})

    finally:
        cursor.close()
        con.close()

