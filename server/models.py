from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_freelancer = db.Column(db.Boolean, default=False)
    
    projects_posted = db.relationship('Project', backref='freelancer', lazy=True)
    client_reviews = db.relationship('Review', backref='client', lazy=True)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_freelancer': self.is_freelancer,
            'projects_posted': [project.serialize() for project in self.projects_posted],
            'client_reviews': [review.serialize() for review in self.client_reviews]
        }

class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image = db.Column(db.String(500), nullable=True)
    freelancer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image': self.image,
            'freelancer_id': self.freelancer_id
        }

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'client_id': self.client_id
        }
    
association_table = db.Table('association', 
    db.Column('freelancer_profile_id', db.Integer, db.ForeignKey('freelancer_profiles.id')),
    db.Column('skill_id', db.Integer, db.ForeignKey('skills.id'))
)

class Skill(db.Model, SerializerMixin):
    __tablename__ = 'skills'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }

class FreelancerProfile(db.Model, SerializerMixin):
    __tablename__ = 'freelancer_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    total_projects_completed = db.Column(db.Integer, default=0)
    
    skills = db.relationship('Skill', secondary=association_table, backref='freelancers')

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bio': self.bio,
            'total_projects_completed': self.total_projects_completed,
            'skills': [skill.serialize() for skill in self.skills]
        }

