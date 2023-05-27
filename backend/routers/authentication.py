import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import schema, models, database, hashing, JWTtoken
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status 
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import requests
from fastapi.middleware.cors import CORSMiddleware
#from repository import user


router = APIRouter(
    prefix = "/login",
    tags = ['Authentication']
    )

app = FastAPI() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with the origins that should be allowed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROJECT_ID = "91f4b983-71c1-4c75-82ee-b40437b9e2b9"
PRIVATE_KEY = "4b299311-0cda-44fd-9554-a3c0c2cf5706"

@router.post('/')
def login(request:OAuth2PasswordRequestForm = Depends(), 
          db: Session=Depends(database.get_db)):
    user = db.query(models.userInfo).filter(models.userInfo.email == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")

    if not hashing.Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid password Credentials")
    
    response = requests.get('https://api.chatengine.io/users/me/',
        headers={
            "Project-ID": PROJECT_ID,
            "User-Name": user.userName,
            "User-Secret": request.password
        }
    )

    access_token = JWTtoken.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "username": user.userName}