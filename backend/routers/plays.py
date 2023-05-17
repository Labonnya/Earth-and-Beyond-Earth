import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Response, status 
from typing import List
import models, schema, database, oauth2
from passlib.context import CryptContext

router = APIRouter(
    prefix="/plays",
    tags=['UserPlaysQuiz']
    )

#insert in user_plays_quiz by taking user email, quiz id
@router.post('/{email}/{id}/useremailforscore', response_model=schema.userOutput)
def insertInAssociationTable(email: str, id: int, db: Session=Depends(database.get_db)):
    user = db.query(models.userInfo).filter(models.userInfo.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the email_id {id} is not available")
    quizid = db.query(models.quiz).filter(models.quiz.id == id).first()
    if not quizid:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Quiz with the id {id} is not available")

    user.quizez.append(quizid)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

#get from association table user_plays_quiz by taking user email
@router.get('/{email}/getUserquiz', response_model=schema.userOutput)
def getFromAssociationTable(email: str, db: Session=Depends(database.get_db)):
    user = db.query(models.userInfo).filter(models.userInfo.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the email_id {id} is not available")
    return user

#get from association table user_plays_quiz by taking quiz id
@router.get('/{id}/getuser', response_model=schema.quizOutput)
def getFromAssociationTable(id: int, db: Session=Depends(database.get_db)):
    quiz = db.query(models.quiz).filter(models.quiz.id == id).first()
    if not quiz:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Quiz with the id {id} is not available")
    return quiz

#delete from association table user_plays_quiz by taking quiz id, emai_id
@router.delete('/{email}/{id}/deleteuserquiz')
def deleteFromAssociationTable(email: str, id: int, db: Session=Depends(database.get_db)):
    user = db.query(models.userInfo).filter(models.userInfo.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    quizid = db.query(models.quiz).filter(models.quiz.id == id).first()
    if not quizid:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Quiz with the id {id} is not available")

    user.quizez.remove(quizid)
    db.commit()
    return "deleted"

#update in total score
@router.put("/user/{email}/quiz/{quiz_id}/score/{total_score}")
def update_total_score(email: str, quiz_id: int, total_score: int, db: Session = Depends(database.get_db)):
    db.query(models.user_plays_quiz).filter_by(email=email, id=quiz_id).update({"total_score": total_score})
    db.commit()
    return {"message": "Total score updated successfully"} 