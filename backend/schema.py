from pydantic import BaseModel, EmailStr
from typing import Optional, List
#from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

class userInfo(BaseModel):
    fullName: str
    userName: str
    email: EmailStr
    country: str
    password: str
    class Config():
        orm_mode = True

class showUserInfo(BaseModel):
    fullName: str
    email: EmailStr
    country: str
    total_score: Optional[int]
    class Config():
        orm_mode = True

class updateUserInfo(BaseModel):
    fullName: Optional[str]
    userName: Optional[str]
    email: Optional[EmailStr]
    country: Optional[str]
    password: Optional[str]
    class Config():
        orm_mode = True

class mcq(BaseModel):
    question: str
    option1: str
    option2: str
    option3: str
    option4: str
    correct_ans: str
    round: int
    level: int
    quiz_id: int
    class Config():
        orm_mode = True


class showMcq(BaseModel):
    quiz_id: int
    question: str
    option1: str
    option2: str
    option3: str
    option4: str
    correct_ans: str
    round: int
    level: int
    class Config():
        orm_mode = True

class updateMcq(BaseModel):
    question: Optional[str]
    option1: Optional[str]
    option2: Optional[str]
    option3: Optional[str]
    option4: Optional[str]
    correct_ans: Optional[str]
    round: Optional[int]
    level: Optional[int]
    class Config():
        orm_mode = True


class quiz(BaseModel):
    heading: str
    level: int
    total_marks:int
    class Config():
        orm_mode = True

class updateQuiz(BaseModel):
    heading: Optional[str]
    level: Optional[int]
    total_marks: Optional[int]
    class Config():
        orm_mode = True

# class userOutput(showUserInfo):
#     quizez: List[quiz]
    


# class quizOutput(quiz):
#     user: List[userInfo]

#class user_quiz(BaseModel):
#    email: EmailStr
#    quiz_id: int
#    total_score: int

class otp(BaseModel):
    userid: int
    OTP: int
    class Config():
        orm_mode = True

class updateOtp(BaseModel):
    userid: Optional[int]
    OTP: Optional[int]
    class Config():
        orm_mode = True

class login(BaseModel):
    username:str
    password:str

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None

class PasswordReset(BaseModel):
    email: EmailStr

class UserCurrentLevel(BaseModel):
    current_level: int

class UserScore(BaseModel):
    total_score: int

class userScoreEmailId(BaseModel):
    email: EmailStr
    id: int
    total_score: int 

class TopScorer(BaseModel):
    username: str
    email: EmailStr
    total_score: int