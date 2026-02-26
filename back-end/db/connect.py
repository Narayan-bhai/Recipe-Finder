from mysql.connector import Error,pooling

dbConfig = {
            "host":"localhost",
            "user":"root",
            "password":"mysql@123",
            "database":"DbmsRecipe",
        }
pool = pooling.MySQLConnectionPool(
    pool_name="dbConnectionPool",
    pool_size=10,
    **dbConfig
)

def connectDb():
    return pool.get_connection()