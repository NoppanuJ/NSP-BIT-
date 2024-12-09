from fastapi import FastAPI, HTTPException, Query
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from bson.objectid import ObjectId
from main import main
from datetime import date, timedelta
app = FastAPI()

# ตั้งค่า connection string ของ MongoDB Atlas
client = MongoClient("mongodb+srv://NSPDEAP:12345@cluster0.50pfj.mongodb.net/")
db = client["DEAPNSP"]
collection = db["nurses"]
schedule_collection = db["schedule"]

class Nurses(BaseModel):
    name : str
    age : int 
    role : str

class Schedule(BaseModel):
    nurses : list

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ระบุ origin ที่อนุญาต
    allow_credentials=True,
    allow_methods=["*"],  # อนุญาตทุก HTTP method เช่น GET, POST, PUT, DELETE
    allow_headers=["*"],  # อนุญาตทุก header
)


@app.get("/")
async def root():
    return {"message": main(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'])}

# # ตัวอย่างการดึงข้อมูลจาก MongoDB
@app.post("/nurses")
async def create_nurse(nurses: Nurses):
    result = collection.insert_one(nurses.dict())
    return {"_id": str(result.inserted_id)}

@app.get("/nurses")
async def get_nurses():
    nurses = []
    for nurse in collection.find():
        nurses.append({"_id": str(nurse["_id"]), "name": nurse["name"], "age": nurse["age"], "role": nurse["role"]})
    return nurses

@app.get("/launchAll")
async def get_schedule():
    schedules = []
    for schedule in schedule_collection.find():
        schedules.append({"_id": str(schedule["_id"]), "schedule": schedule["schedule"], "exp_time": schedule["exp_time"]})
    return schedules

@app.post("/launch")
async def launch_nurses(request: Schedule):
    # ตรวจสอบว่ารายชื่อพยาบาลไม่ว่างเปล่า
    if not request.nurses:
        return {"error": "Nurses list cannot be empty"}
    print(request.nurses)
    
    schedule = main(request.nurses)
    print(schedule)
    today = date.today() + + timedelta(days=7)
    # เก็บข้อมูลลง MongoDB
    launch_record = {"schedule": schedule, "exp_time" : str(today)}
    result = schedule_collection.insert_one(launch_record)

    return {
        "message": "Launch data successfully saved",
        # "launch_id": str(result.inserted_id),
        "nurses": request.nurses,
        "schedule": schedule
    }