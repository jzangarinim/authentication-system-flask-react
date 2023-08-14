"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

def set_password(password):
    return generate_password_hash(f"{password}")

def check_password(hash_password, password):
    return check_password_hash(hash_password, f"{password}")

@api.route('/users', methods=['POST'])
def handle_register():
    data = request.json
    print(data)
    if data["email"] is None or not data["email"]:
        return jsonify({"message": "Wrong property"}), 400
    if data["password"] is None or not data["password"] or len(data["password"]) < 8:
        return jsonify({"message": "Wrong property"}), 400
    if data["name"] is None or not data["name"]:
        return jsonify({"message": "Wrong property"}), 400
    if data["last_name"] is None or not data["last_name"]:
        return jsonify({"message": "Wrong property"}), 400

    user = User.query.filter_by(email=data.get("email")).first()
    if user is not None:
        return jsonify({"message": "The user already exists"}), 400

    if user is None:
        password = set_password(data.get("password"))
        user = User(email=data["email"], password=password, name=data["name"], last_name=data["last_name"])
        db.session.add(user)

        try:
            db.session.commit()
            return jsonify(user.serialize()), 201

        except Exception as error:
            print(error)
            return jsonify({"message": error.args}), 500

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)

    if email is None or password is None:
        return jsonify("You need an email and a password"), 400
    else:
        user = User.query.filter_by(email=email).one_or_none()
        if user is None:
            return jsonify({"message": "Bad credentials"}), 400
        else:
            if check_password(user.password, password):
                token = create_access_token(identity=user.id)
                return jsonify({"token": token}), 200
            else:
                return jsonify({"message": "Bad credentials"}), 400