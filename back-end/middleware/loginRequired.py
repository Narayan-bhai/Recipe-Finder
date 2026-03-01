from flask import request,jsonify,g
from datetime import datetime,UTC
from functools import wraps
from db.connect import connectDb
from mysql.connector import Error

def login_required(fn):
    @wraps(fn)
    def wrapper(*args,**kwargs):
        sessionID = request.cookies.get("sessionID")
        if not sessionID:
            return jsonify({"message":"Unauthorized/cookie doesn't have sessionID"}),401

        try:
            conn = connectDb()
            cursor = conn.cursor(dictionary = True)
            cursor.execute(
                "SELECT user_id,expires_at FROM user_sessions WHERE session_id = %s ",
                (sessionID,)
            )

            session = cursor.fetchone()
            
            if not session:
                return jsonify({"message":"Unauthorized/session not found"}),401
            
            curDate = datetime.now(UTC)
            expires_at = session["expires_at"].replace(tzinfo=UTC)
            if curDate >= expires_at:
                return jsonify({"message":"Unauthorized/session expired"}),401
            
            g.userID = session["user_id"]
        except Error as e:
            print("Error while login_required",e)
            return jsonify({"message":str(e)}),500
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
        return fn(*args,**kwargs)
    return wrapper

