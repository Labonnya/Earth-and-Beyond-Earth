import sys
import requests
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))


from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Response, status, FastAPI
from typing import List
import models, schema, database, oauth2
from passlib.context import CryptContext

from JWTtoken import verify_token

from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from fastapi.middleware.cors import CORSMiddleware

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


router = APIRouter(
    prefix="/user",
    tags=['User']
    )
app = FastAPI() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with the origins that should be allowed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Password Hashing
pwt_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")

PROJECT_ID = "8e16e1f7-14bd-4a0e-b265-70d4bbf28d84"
PRIVATE_KEY = "115e04ef-eb9d-4231-a26f-e6a8e2ae91ae"


#Create a new user
@router.post('/createUser', response_model=schema.showUserInfo)
def createUserInfo(request: schema.userInfo, db: Session=Depends(database.get_db)):
    hashed_password = pwt_cxt.hash(request.password)
    password_original = request.password;
    
    new_user = models.userInfo(fullName=request.fullName, userName=request.userName,
                           email=request.email, country=request.country,
                           password=hashed_password)

    email_found = db.query(models.userInfo).filter(models.userInfo.email == request.email).first()
    #if email is already taken
    if email_found:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail= "Email is already taken")
    
 
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    response = requests.post('https://api.chatengine.io/users/', 
        data={
             "username": new_user.userName,
    "secret": password_original,
    "email": new_user.email,
    "first_name": new_user.fullName.split()[0],
    "last_name": new_user.fullName.split()[-1],
        },
        headers={ "Private-Key": PRIVATE_KEY }
    )

    return new_user

#Get user by email
@router.get('/{email}/userinformation', response_model=schema.showUserInfo)
def show(email:str, db: Session=Depends(database.get_db), 
         current_user: schema.userInfo=Depends(oauth2.get_current_user)):
    user = db.query(models.userInfo).filter(models.userInfo.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")

    return user

#Show all user
@router.get('/allUser', response_model=List[schema.showUserInfo])
def allUser(db: Session = Depends(database.get_db), current_user:
        schema.userInfo=Depends(oauth2.get_current_user)):
    all_user = db.query(models.userInfo).all()
    return all_user

#Update user info
@router.put('/{email}/updateuser', status_code=status.HTTP_202_ACCEPTED)
def updateUser(email:str, request: schema.updateUserInfo, db:Session = Depends(database.get_db)):
    user = db.query(models.userInfo).filter(models.userInfo.email == email)
    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")

    user.update(request.dict(exclude_unset=True))
    db.commit()
    return 'updated'

#delete a user
@router.delete('/{email}/deleteUser')
def destroy(email:str, db:Session=Depends(database.get_db), current_user: schema.userInfo=Depends(oauth2.get_current_user)):
    user = db.query(models.userInfo).filter(models.userInfo.email==email)
    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
    user.delete(synchronize_session=False)
    plays = db.query(models.user_plays_quiz).filter_by(email=email)
    plays.delete(synchronize_session=False)
    db.commit()
    return 'done'

@router.get('/{email}/username-password')
def get_username_password(email: str,db:Session=Depends(database.get_db),token: str = Depends(oauth2_scheme)):
    # Decode the token
    try:
        decoded_token = jwt.decode(token, "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7", algorithms=["HS256"])
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    # Access the 'sub' claim from the decoded token
    user_sub = decoded_token.get('sub')
    print(email)
    # Example authorization logic: check if the email in the token matches the requested email
    if user_sub != email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient privileges",
        )
    # Example user level retrieval logic: query the user's current level from the database
    user_info = db.query(models.userInfo).filter(models.userInfo.email == email).first()
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User not found",
        )