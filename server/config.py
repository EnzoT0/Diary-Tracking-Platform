from datetime import timedelta
from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:

    #added
    # username = "postgres"
    # password = "Huynhkhang"
    # port = '5433'
    # db_name = 'CPSC304'
    # host = 'localhost'

    SECRET_KEY = os.environ["SECRET_KEY"]

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False #true

    folder_path = os.path.join(os.getcwd(), 'server')
    # SQLALCHEMY_DATABASE_URI = f"sqlite:///{folder_path}/db.sqlite"
    # SQLALCHEMY_DATABASE_URI = f'postgresql://{username}:{password}@{host}:{port}/{db_name}'

    

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = True #False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
    
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=30) # Set the session lifetime

