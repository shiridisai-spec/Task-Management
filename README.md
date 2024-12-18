# Task-Management

Task Management Application


Overview

This Task Management Application is built with React JS and uses Redux toolkit for state management. It allows users to register, log in, and manage their tasks effectively. The app is designed with simplicity and usability in mind, featuring clean UI and efficient functionality.

Features
	•	User Authentication:
	   •	User Registration with username and password and error validation.
	   •	Login functionality with error validation.
	   •	Persistent user sessions using local storage.
	•	Task Management:
	   •	Add, edit, and delete tasks.
	   •	Mark tasks as completed.
   	   •	Filter tasks by their completion status.
	   •	View a list of tasks in a structured layout.
       •	State Management:
	   •	Redux toolkit for managing authentication and task states.

Tech Stack
	•	Frontend: Reac JS, Redux tookit, React Router DOM
	•	Styling: CSS
	•	Storage: Local Storage for session persistence
	•	Development Tools: ESLint, Prettier, VS Code

Task-Management-App/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── login-form/
│   │   │   ├── LoginForm.js
│   │   │   ├── loginform.css
│   │   └── registration-form/
│   │       ├── RegistrationPage.js
│   │   └── tasks/
│   │       ├── TaskManagement.js
│   │       ├── taskManagement.css
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── RegistrationPage.js
│   │   ├── TaskManagementPage.js
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── taskSlice.js
│   ├── store/
│   │   ├── store.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── store/
│   │   ├── store.js
├── .gitignore
├── package.json
├── README.md
└── package-lock.json

How to Run This Project

Prerequisites

Ensure you have the following installed:
• Node.js (v16 or later)
• npm (comes with Node.js) or yarn

Setup Instructions
1. Clone the Repository
git clone (https://github.com/shiridisai-spec/Task-Management.git)
cd Task-Management-App  

2. Install Dependencies
Install all required packages:
npm install

3. Run the Application
Start the development server:
npm start

You can also find the deployed app here :- https://shiridisai-spec.github.io/Task-Management/

