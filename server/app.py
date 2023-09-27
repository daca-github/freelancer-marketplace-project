#!/usr/bin/env python3

from flask import request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS

from config import app, db
from models import User, Project, Review, db


api = Api(app)
CORS(app)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.serialize() for project in projects])


class ProjectListResource(Resource):
    def get(self):
        projects = Project.query.all()
        return jsonify([project.to_dict() for project in projects])

api.add_resource(ProjectListResource, '/api/projects')

class ProjectResource(Resource):
    def get(self, project_id):
        project = Project.query.get_or_404(project_id)
        return project.to_dict()

api.add_resource(ProjectResource, '/api/projects/<int:project_id>')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5555, debug=True)

