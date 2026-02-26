from flask import Blueprint,request,jsonify,make_response
from security import verifyPassword,createSessionId
from db.connect import connectDb
from datetime import timedelta,datetime,UTC


auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/login", methods = ["POST"])
def login():
    data = request.json
    email = data.get("email")   
    password = data.get("password")

    conn = connectDb()
    cursor = conn.cursor(dictionary = True)

    cursor.execute(
        "SELECT email,password_hash,id FROM users WHERE email =%s;",
        (email,)
    )



    user = cursor.fetchone()

    if not user:
        return jsonify({"error":"Invalid credentials/User not found"}),401
    
    if not verifyPassword(password,user["password_hash"]):
        return jsonify({"error":"Invalid credentials/Incorrect password"}),401
    
    sessionID = createSessionId()

    creation = datetime.now(UTC)
    expires = datetime.now(UTC) + timedelta(days=7) 

    cursor.execute(
        "INSERT INTO user_sessions (session_id,user_id,created_at,expires_at) VALUES (%s,%s,%s,%s);",
        (sessionID,user["id"],creation,expires)
    )

    conn.commit()
    response= make_response({"message":"Login successful/session created"})
    # this is only for dev purpose should be changed on prod
    response.set_cookie(
        "sessionID",
        sessionID,
        httponly=True,
        secure=True,
        samesite="None",
        expires=expires
    )

    print("response",response)
    cursor.close()
    conn.close()

    return response


