from flask import request,jsonify,make_response
from db.connect import connectDb
from datetime import datetime,UTC
from routes.auth.security import hashPassword
from routes.auth import auth_bp

@auth_bp.route("/register", methods = ["POST"])
def register():
    data = request.json
    firstName = data.get("firstName")
    lastName = data.get("lastName")
    userName = data.get("userName")
    email = data.get("email")   
    password = data.get("password")

    try:
        conn = connectDb()
        cursor = conn.cursor(dictionary = True)
        password = hashPassword(password)
        createdAt = datetime.now(UTC)
        cursor.execute(
            "INSERT INTO users (first_name,last_name,user_name,email,created_at,password_hash) VALUES (%s,%s,%s,%s,%s,%s);",
            (firstName,lastName,userName,email,createdAt,password)
        )
        conn.commit()
        response= make_response({"message":"Register successful/user created"})
        return response
    except Exception as e:
        print("Error while register",e)
        return jsonify({"message":str(e)}),500
    finally:
        cursor.close()
        conn.close()



