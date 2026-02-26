from flask import request,jsonify,g
from datetime import datetime,UTC
from functools import wraps
from db.connect import connectDb

def login_required(fn):
    @wraps(fn)
    def wrapper(*args,**kwargs):
        print(request.cookies)
        sessionID = request.cookies.get("sessionID")
        if not sessionID:
            return jsonify({"error":"Unauthorized/cookie doesn't have sessionID"}),401
        
        conn = connectDb()
        cursor = conn.cursor(dictionary = True)
        cursor.execute(
            "SELECT user_id,expires_at FROM user_sessions WHERE session_id = %s ",
            (sessionID,)
        )

        session = cursor.fetchone()
        
        if not session:
            return jsonify({"error":"Unauthorized/session not found"}),401
        
        curDate = datetime.now(UTC)
        expires_at = session["expires_at"].replace(tzinfo=UTC)
        if curDate >= expires_at:
            return jsonify({"error":"Unauthorized/session expired"}),401
        
        g.userID = session["user_id"]
        cursor.close()
        conn.close()

        return fn(*args,**kwargs)
    return wrapper

