import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Response, status 
from typing import List
import models, schema, database, oauth2
from passlib.context import CryptContext
from sqlalchemy import desc, func

router = APIRouter(
    prefix="/plays",
    tags=['UserPlaysQuiz']
    )

#insert in user_plays_quiz by taking user email, quiz id
# @router.post('/{email}/{id}/useremailforscore', response_model=schema.userOutput)
# def insertInAssociationTable(email: str, id: int, db: Session=Depends(database.get_db)):
#     user = db.query(models.userInfo).filter(models.userInfo.email == email).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"User with the email_id {id} is not available")
#     quizid = db.query(models.quiz).filter(models.quiz.id == id).first()
#     if not quizid:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Quiz with the id {id} is not available")

#     user.quizez.append(quizid)
#     db.add(user)
#     db.commit()
#     db.refresh(user)
#     return user

#get from association table user_plays_quiz by taking user email
# @router.get('/{email}/getUserquiz', response_model=schema.userOutput)
# def getFromAssociationTable(email: str, db: Session=Depends(database.get_db)):
#     user = db.query(models.userInfo).filter(models.userInfo.email == email).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"User with the email_id {id} is not available")
#     return user

#get from association table user_plays_quiz by taking quiz id
# @router.get('/{id}/getuser', response_model=schema.quizOutput)
# def getFromAssociationTable(id: int, db: Session=Depends(database.get_db)):
#     quiz = db.query(models.quiz).filter(models.quiz.id == id).first()
#     if not quiz:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Quiz with the id {id} is not available")
#     return quiz

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

#insert in user_plays_quiz when email and id doesn't exist
@router.post('/setScore', response_model=schema.UserScore)
def createUserInfo(request: schema.userScoreEmailId, db: Session=Depends(database.get_db)):
    existing_user = db.query(models.user_plays_quiz).filter_by(email=request.email, id=request.id).first()

    if existing_user:
        raise HTTPException(status_code=409, detail="User already exists.")
    
    new_user = models.user_plays_quiz(email=request.email, id=request.id, total_score=request.total_score)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    score = new_user.total_score

    return {"total_score": score}

#update total score when email and id already exist
@router.put('/updateScore', response_model=schema.UserScore)
def createUserInfo(request: schema.userScoreEmailId, db: Session=Depends(database.get_db)):
    existing_user = db.query(models.user_plays_quiz).filter_by(email=request.email, id=request.id).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    existing_user.total_score = request.total_score
    db.commit()
    db.refresh(existing_user)
    score = existing_user.total_score
    
    return {"total_score": score}

# get 3 top scorer in quiz
@router.get('/top-scorers-quiz', response_model=List[schema.TopScorer])
def get_top_scorers(db: Session = Depends(database.get_db)):
    top_scorers = db.query(models.user_plays_quiz.email, func.sum(models.user_plays_quiz.total_score).label('total_score')). \
        filter(models.user_plays_quiz.id != 100). \
        group_by(models.user_plays_quiz.email). \
        order_by(desc('total_score')). \
        limit(3).all()

    if not top_scorers:
        raise HTTPException(status_code=404, detail="No scorers found.")

    result = []
    for email, total_score in top_scorers:
        user = db.query(models.userInfo).filter_by(email=email).first()
        if user:
            result.append({"username": user.userName, "email": email, "total_score": total_score})

    return result

# get 3 top scorer in game
@router.get('/top-scorers-game', response_model=List[schema.TopScorer])
def get_top_scorers(db: Session = Depends(database.get_db)):
    top_scorers = db.query(models.user_plays_quiz.email, func.sum(models.user_plays_quiz.total_score).label('total_score')). \
        filter(models.user_plays_quiz.id == 100). \
        group_by(models.user_plays_quiz.email). \
        order_by(desc('total_score')). \
        limit(3).all()

    if not top_scorers:
        raise HTTPException(status_code=404, detail="No scorers found.")

    result = []
    for email, total_score in top_scorers:
        user = db.query(models.userInfo).filter_by(email=email).first()
        if user:
            result.append({"username": user.userName, "email": email, "total_score": total_score})

    return result