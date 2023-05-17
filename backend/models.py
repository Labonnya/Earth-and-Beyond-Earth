from sqlalchemy import Column, Integer, String, ForeignKey, Table
from database import Base
from sqlalchemy.orm import relationship
from sqlalchemy_utils import EmailType


user_plays_quiz = Table("user_plays_quiz", Base.metadata,
                       Column('email', ForeignKey("userInfo.email"), primary_key=True),
                       Column('id', ForeignKey("quiz.id"), primary_key=True),
                       Column('total_score', Integer, default=0),)

class userInfo(Base):
    __tablename__ = 'userInfo'

    #id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String)
    country = Column(String)
    userName = Column(String)
    email = Column(String, primary_key=True)
    password = Column(String)
    quizez = relationship("quiz",
                           secondary=user_plays_quiz,
                           back_populates="user")
    #user_id = Column(Integer, ForeignKey('users.id'))

class mcq(Base):
    __tablename__ = 'mcq'

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String)
    option1 = Column(String)
    option2 = Column(String)
    option3 = Column(String)
    option4 = Column(String)
    correct_ans = Column(String)
    round = Column(Integer)
    level = Column(Integer)
    quiz_id = Column(Integer, ForeignKey('quiz.id'))

    creator = relationship("quiz", back_populates="quizzes")

class quiz(Base):
    __tablename__ = 'quiz'

    id = Column(Integer, primary_key=True, index=True)
    heading = Column(String)
    level = Column(Integer)
    total_marks = Column(Integer)
    user = relationship("userInfo",
                           secondary=user_plays_quiz,
                           back_populates="quizez")

    quizzes = relationship("mcq", back_populates="creator")


class otp(Base):
    __tablename__ = 'otp'

    id = Column(Integer, primary_key=True, index=True)
    userid = Column(Integer)
    OTP = Column(Integer)

