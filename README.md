1.how to setup and run your project

first step:- 
git clone https://github.com/yourusername/blogapp.git
cd blogapp

second step:-
cd backend
npm install (it will install all the required dependecies)

third step:-
cd..
cd frontend
npm install


2.dependencies and configuration required:-

step 1:-
create and .env file in your backend folder

step 2:-
Add this and use you initials in env file
PORT=5000
MONGODB_URL="mongodb+srv://<your_username>:<password>@cluster0.4janxrl.mongodb.net/blog-app"
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_SECRET_KEY=
JWT_SECRET_KEY=

after adding the data
step 3:-
cd backend
npm run dev

step 4:-
click plus symbol in terminal
cd frontend
npm start

ENJOY CODING!!!
