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

PROJECT_ID = "aa67eab9-95be-4d97-936f-f7e35fe4aa28"
PRIVATE_KEY = "649eff59-ccd4-4184-b879-07c7af1e84b4"

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