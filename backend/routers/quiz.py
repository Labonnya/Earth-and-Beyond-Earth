import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Response, status 
from typing import List
import models, schema, database, oauth2
from passlib.context import CryptContext


router = APIRouter(
    prefix="/quiz",
    tags=['Quiz']
    )

#create a quiz in a level
@router.post('/createQuiz', response_model=schema.quiz)
def createQuiz(request: schema.quiz, db: Session=Depends(database.get_db), current_user: schema.userInfo=Depends(oauth2.get_current_user)):
    new_quiz = models.quiz(heading=request.heading, level=request.level,
                           total_marks=request.total_marks)
    
 
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)
    return new_quiz

#Get question based on id
@router.get('/{id}/getSpecificQuiz', response_model=schema.quiz)
def showSpecificQuiz(id:int, db: Session=Depends(database.get_db), 
         current_user: schema.quiz=Depends(oauth2.get_current_user)):
    question = db.query(models.quiz).filter(models.quiz.id == id).first()
    if not question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Question for round {round}  is not available")

    return question

#Show all quiz
@router.get('/allQuiz', response_model=List[schema.quiz])
def allQuiz(db: Session = Depends(database.get_db), current_user:
        schema.userInfo=Depends(oauth2.get_current_user)):
    all_quiz = db.query(models.quiz).all()
    return all_quiz

#Update questions
@router.put('/{id}/updateQuiz', status_code=status.HTTP_202_ACCEPTED)
def updateQuiz(id:int, request: schema.updateQuiz, db:Session = Depends(database.get_db)):
    question = db.query(models.quiz).filter(models.quiz.id == id)
    if not question.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Quiz with id {id} not found")

    question.update(request.dict(exclude_unset=True))
    db.commit()
    return 'updated'

#delete a quiz
@router.delete('/{id}/deleteQuiz')
def destroy(id, db:Session=Depends(database.get_db), current_user: schema.userInfo=Depends(oauth2.get_current_user)):
    quiz = db.query(models.quiz).filter(models.quiz.id==id)
    if not quiz.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Quiz with id {id} not found")
    quiz.delete(synchronize_session=False)
    mcqs = db.query(models.mcq).filter(models.mcq.quiz_id==id)
    mcqs.delete(synchronize_session=False)
    plays = db.query(models.user_plays_quiz).filter_by(id=id)
    plays.delete(synchronize_session=False)
    db.commit()
    return 'done'