import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="127.0.0.1",
        port=3307,
        user="root",
        password="",
        database="crm",
        charset="utf8mb4",
        collation="utf8mb4_general_ci"
    )