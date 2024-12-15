# Task-Management

Task Management Application

Overview

This Task Management Application is built with React and uses Redux for state management. It allows users to register, log in, and manage their tasks effectively. The app is designed with simplicity and usability in mind, featuring clean UI and efficient functionality.

Features
	•	User Authentication:
	•	User Registration with username and password and error validation.
	•	Login functionality with error validation.
	•	Persistent user sessions using local storage.
	•	Task Management:
	  •	Add, edit, and delete tasks.
	  •	Mark tasks as completed.
	  •	View a list of tasks in a structured layout.
	•	State Management:
	  •	Redux toolkit for managing authentication and task states.

Tech Stack
	•	Frontend: React, Redux tookit, React Router DOM
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
│   │       ├── registrationform.css
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
│   ├── store.js
├── .gitignore
├── package.json
├── README.md
└── yarn.lock / package-lock.json

