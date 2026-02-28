from flask import jsonify
from db.connect import connectDb
from mysql.connector import Error
from routes.recipes import tables_bp

@tables_bp.route("/insertRecipe")
def insertInto():
    try:
        conn = connectDb()   
        cursor = conn.cursor()
        return jsonify({"value":"inserted"})
    except Error as e:
        print("Error while getting tables ",e)
        return jsonify({"message":str(e)}),500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

