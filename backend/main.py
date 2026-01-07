from fastapi import FastAPI
from dbconnect import get_connection
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

@app.get("/contact")
def get_contacts():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM contact")
    contacts = cursor.fetchall()
    return contacts
