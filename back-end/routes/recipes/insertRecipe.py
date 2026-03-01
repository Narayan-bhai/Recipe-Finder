from flask import jsonify,request
from db.connect import connectDb
from mysql.connector import Error
from routes.recipes import recipe_bp
from middleware import login_required

@recipe_bp.route("/insertRecipe",methods=["POST"])
@login_required
def insertRecipe():
    sessionId = request.cookies.get("sessionID")
    data = request.get_json()
    print(data)
    recipeName = data.get("recipeName") or "Unkown"
    recipeInstructions = data.get("instructions") or "Unkown"
    recipeIngredients = data.get("ingredients",[]) 

    try:
        conn = connectDb()   
        cursor = conn.cursor()
        cursor.execute(
            """SELECT u.id 
            FROM user_sessions u_s 
            INNER JOIN users u 
            ON u.id = u_s.user_id 
            WHERE u_s.session_id = %s 
            LIMIT 1;""",
            (f"{sessionId}",)
        )
        userID = cursor.fetchone()[0]

        # inserting into recipe and ing before 
        # recipe_ing due to foreign key constraint
        cursor.execute(
            """ 
            INSERT INTO recipe 
            (user_id,name,instructions) VALUES
            (%s,%s,%s);
            """,
            (userID,f"{recipeName}",f"{recipeInstructions}")
        )
        recipe_id = cursor.lastrowid
        print("recipe ing ",recipeIngredients)
        for ing in recipeIngredients:
            print("looop ",ing)
            quantity = ing["quantity"] or None
            unit = ing["unit"] or None
            size = ing["size"] or None
            ingredient = ing["name"] or None
            notes= ing["notes"] or None
            
            # checking if ing exist in master table
            cursor.execute(
                """
                SELECT id 
                FROM ingredient 
                WHERE name = %s
                LIMIT 1;
                """,
                (ingredient,)
            )
            ing_fetch = cursor.fetchone()
            if ing_fetch:
                ing_id = ing_fetch[0]
            else:
                cursor.execute(
                    """
                    INSERT INTO ingredients
                    (name) VALUES
                    (%s);
                    """,
                    (ingredient,)
                )
                ing_id = cursor.lastrowid
            
            cursor.execute(
                """
                INSERT INTO recipe_ingredient
                (recipe_id,ingredient_id,quantity,unit,size,notes) VALUES
                (%s,%s,%s,%s,%s,%s)
                """,
                (recipe_id,ing_id,quantity,unit,size,notes,)
            )

        conn.commit()
        return jsonify({"message":"Recipe inserted"})
    except Error as e:
        print("Error while inserting recipes ",e)
        return jsonify({"message":str(e)}),500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

