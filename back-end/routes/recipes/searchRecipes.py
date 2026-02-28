from flask import jsonify,request
from db.connect import connectDb
from mysql.connector import Error
from routes.recipes import recipe_bp

@recipe_bp.route("/searchRecipes")
def searchRecipes():

    recipe_name = request.args.get("name", "")

    try:
        conn = connectDb()
        cursor = conn.cursor()

        cursor.execute(
            """SELECT id,name,avg_rating,count_rating FROM recipe WHERE 
            name LIKE %s or 
            name LIKE %s or
            name LIKE %s
            LIMIT 10;
            """, 
            (f"% {recipe_name} %",f"% {recipe_name}%",f"%{recipe_name}% ",)
        )
        recipes = cursor.fetchall()
        return jsonify({"recipes": recipes})
    except Error as e:
        print("Error while getting recipes",e)
        return jsonify({"message":str(e)}),500
    finally:
        cursor.close()
        conn.close()

