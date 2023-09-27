#!/usr/bin/env python3

from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Project, Review

def seed_users(fake, num=10):
    users = []
    for _ in range(num):
        user = User(
            username=fake.unique.user_name(),
            email=fake.unique.email(),
            password=fake.password()
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()
    return users

def seed_projects(fake, users, num=20):
    projects = []
    for _ in range(num):
        project = Project(
            title=fake.unique.company(),
            description=fake.text(),
            image=fake.image_url(),
            client=rc(users)
        )
        projects.append(project)
    db.session.add_all(projects)
    db.session.commit()
    return projects

def seed_reviews(fake, users, num=30):
    reviews = []
    for _ in range(num):
        review = Review(
            content=fake.text(),
            freelancer=rc(users)
        )
        reviews.append(review)
    db.session.add_all(reviews)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        users = seed_users(fake, 10)
        print(f"Seeded {len(users)} users.")
        
        projects = seed_projects(fake, users, 20)
        print(f"Seeded {len(projects)} projects.")
        
        seed_reviews(fake, users, 30)
        print("Seeded 30 reviews.")
