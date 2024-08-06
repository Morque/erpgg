import random
import string
import bcrypt

def generate_ssid_token() -> str:
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(128))


def is_ssid_token_valid() -> bool:
    return True


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')


def check_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))



