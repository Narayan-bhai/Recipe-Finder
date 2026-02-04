import mysql.connector
from mysql.connector import Error
def connectDb():
    try:
        con = mysql.connector.connect(
            host = 'localhost',
            user = 'root',
            password = 'mysql@123',
            database = 'DbmsRecipe',
        )
        return con
    except Error as e:
        print("Error while connecting to db ",e)
        return None