# backend/src/app/_lib/session.py

from jose import JWTError, jwt
from datetime import datetime, timedelta
from django.conf import settings

# Ensure that the SECRET key is defined in your settings
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day

def encrypt(payload: dict) -> str:
    """
    Encrypts the payload into a JWT token.
    """
    to_encode = payload.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decrypt(token: str) -> dict:
    """
    Decrypts the JWT token back into a payload.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as e:
        print(f"JWT Decryption Error: {e}")
        return {}
