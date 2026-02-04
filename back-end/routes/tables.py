from flask import jsonify,Blueprint
from db.connect import connectDb
from mysql.connector import Error

tables_bp = Blueprint("tables_bp", __name__)
@tables_bp.route("/getTables")
def getTables():
    con = connectDb()
    if con is None:
        return []
    try:
        cursor = con.cursor()
        cursor.execute("SHOW TABLES;")
        tables = cursor.fetchall()
        return jsonify({"tables":[t[0] for t in tables]}),200
    
    except Error as e:
        print("Error while getting tables ",e)
        return []
    finally:
        cursor.close()
        con.close()

