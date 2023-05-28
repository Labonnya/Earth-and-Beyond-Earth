import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Response, status 
from typing import List
import models, schema, database, oauth2
from passlib.context import CryptContext


router = APIRouter(
    prefix="/mcq",
    tags=['MCQ']
    )

#Create mcq questions
@router.post('/createMCQ', response_model=schema.mcq)
def createMCQ(request: schema.mcq, db: Session=Depends(database.get_db)):
    new_question = models.mcq(question=request.question, option1=request.option1,
                           option2=request.option2, option3=request.option3,
                           option4=request.option4, correct_ans=request.correct_ans,
                           round=request.round, level=request.level, quiz_id=request.quiz_id)
    
 
    db.add(new_question)
    db.commit()
    db.refresh(new_question)
    return new_question


#Get question based on level
@router.get('/{level}/getSpecificMCQ', response_model=List[schema.mcq])
def showSpecificQuestions(level:int, db: Session=Depends(database.get_db)):
    question = db.query(models.mcq).filter(models.mcq.level == level).all()
    print(question)
    if not question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Question for level {level} is not available")

#Show all question
@router.get('/allMCQ', response_model=List[schema.showMcq])
def allQuestions(db: Session = Depends(database.get_db)):
    all_mcq = db.query(models.mcq).all()
    return all_mcq

#Update questions
@router.put('/{id}/updateMCQ', status_code=status.HTTP_202_ACCEPTED)
def updateMcq(id:int, request: schema.updateMcq, db:Session = Depends(database.get_db)):
    question = db.query(models.mcq).filter(models.mcq.id == id)
    if not question.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Question with id {id} not found")

    question.update(request.dict(exclude_unset=True))
    db.commit()
    return 'updated'

#Delete question
@router.delete('/{id}/deleteMCQ')
def destroy(id:int, db:Session=Depends(database.get_db), current_user: schema.userInfo=Depends(oauth2.get_current_user)):
    question = db.query(models.mcq).filter(models.mcq.id==id)
    if not question.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Question with id {id} not found")
    question.delete(synchronize_session=False)
    db.commit()
    return 'done'