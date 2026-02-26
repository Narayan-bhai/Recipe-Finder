from uuid import uuid4
import bcrypt 
def createSessionId():
    return uuid4().hex


def hashPassword(password: str):
    return bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt()
    ).decode()

def verifyPassword(password , hashPassword):
    return bcrypt.checkpw(
        password.encode(),
        hashPassword.encode()
    )

