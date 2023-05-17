import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Response, status 
from typing import List
import models, schema, database, oauth2
from passlib.context import CryptContext

router = APIRouter(
    prefix="/otp",
    tags=['OTP']
    )

#Create OTP
@router.post('/createOTP', response_model=schema.otp)
def createMCQ(request: schema.otp, db: Session=Depends(database.get_db)):
    new_otp = models.otp(userid=request.userid, OTP=request.OTP) 
    db.add(new_otp)
    db.commit()
    db.refresh(new_otp)
    return new_otp

#Get otp based on userid
@router.get('/{userid}/getSpecificOTP', response_model=schema.otp)
def showSpecificOTP(userid:int, db: Session=Depends(database.get_db), 
         current_user: schema.userInfo=Depends(oauth2.get_current_user)):
    otp = db.query(models.otp).filter(models.otp.userid == userid).first()
    if not otp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"OTP for userid {userid} is not available")

    return otp

#Update otp
@router.put('/{userid}/updateOTP', status_code=status.HTTP_202_ACCEPTED)
def updateOTP(userid:int, request: schema.updateOtp, db:Session = Depends(database.get_db)):
    otp = db.query(models.otp).filter(models.otp.userid == userid)
    if not otp.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"user with id {id} not found")

    otp.update(request.dict(exclude_unset=True))
    db.commit()
    return 'updated'

#Delete otp
@router.delete('/{userid}/deleteOTP')
def destroy(userid:int, db:Session=Depends(database.get_db), current_user: schema.userInfo=Depends(oauth2.get_current_user)):
    otp = db.query(models.otp).filter(models.otp.userid==userid)
    if not otp.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"OTP for userid {userid} is not available")
    otp.delete(synchronize_session=False)
    db.commit()
    return 'done'