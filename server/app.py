#!/usr/bin/env python3

from flask import request, jsonify, session
from flask_restful import Resource, Api
from flask_cors import CORS

from config import app, db
from models import User, Project, Review
from flask_session import Session

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'myapp'
import os
from dotenv import load_dotenv

load_dotenv()

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

Session(app)

api = Api(app)
CORS(app, supports_credentials=True)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.serialize() for project in projects])

@app.route('/projects', methods=['POST'])
def create_project():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    title = data.get('title')
    description = data.get('description')
    image = data.get('image')
    freelancer_id = data.get('freelancer_id')

    if not title or not freelancer_id:
        return jsonify({"message": "Missing fields"}), 400

    new_project = Project(title=title, description=description, image=image, freelancer_id=freelancer_id)
    db.session.add(new_project)
    db.session.commit()

    return jsonify({"message": "Project created successfully", "project": new_project.serialize()}), 201


@app.route('/projects/<int:project_id>', methods=['GET'])
def get_project_details(project_id):
    project = Project.query.get_or_404(project_id)
    return jsonify(project.serialize())

@app.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    user_id = session.get('user_id')
    print("Session user_id:", user_id)
    print("Project freelancer_id:", project.freelancer_id)
    if project.freelancer_id == user_id:
        return jsonify({"message": "Unauthorized action"}), 403
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted successfully"}), 204


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    username = data.get('name')
    email = data.get('email')
    password = data.get('password')
    is_freelancer = data.get('is_freelancer', False)

    if not username or not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "Email already registered"}), 400

    new_user = User(username=username, email=email, is_freelancer=is_freelancer)
    new_user.password = password
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user": new_user.serialize()}), 201



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.verify_password(password):
        return jsonify({"message": "Invalid email or password"}), 401

    session['user_id'] = user.id
    session.modified = True
    return jsonify({"message": "Login successful", "user": user.serialize()}), 200

@app.route('/check_session', methods=['GET'])
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user:
            return jsonify(user.serialize())
    return jsonify({'message': 'Not logged in'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5555, debug=True)
