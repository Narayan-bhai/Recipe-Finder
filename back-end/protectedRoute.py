from middleware.loginRequired import login_required
from flask import g,jsonify,request
from auth import auth_bp
from db.connect import connectDb

@auth_bp.route("/me")
@login_required
def me():
    return jsonify({"userID":g.userID})

@auth_bp.route("/logout")
@login_required
def logout():
    sessionID = request.cookies.get("sessionID")
    conn = connectDb()
    cursor = conn.cursor()

    cursor.execute(
        "DELTE FROM user_sessions WHERE session_id = %s",
        (sessionID,)
    )

    conn.commit()
    response = jsonify({"message":"Logged out"})
    response.delete_cookie("session_id")
    cursor.close()
    conn.close()
    
    return response