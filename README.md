# Getting Started with Simble

This project is a dissertation project written by Wankyu Lim (wl39 - 160005106)

## To run the program

- Simply type `npm start` in the terminal.
- The code above will open the web browser.
- Now you can try whatever you want :)

***OR***

- You can directly use the application in this link: https://demos.constraintmodelling.org/university-timetabling/
- **DO NOT REFRESH ON THE PAGE ABOVE**: This will cause 404 error
  - This is because, the webpage is hosted via ngnix but also the application used react-router/
    - The combination above causes 404 error when the user refreshes the page
    - This error colud be fixed, but I have to change the back-end code which I do not have the access.

## User Interface

Below are some screenshots of the project UI:

### Home Page

![Home Page](screenshots/homepage.png)

This is the homepage with no existing project

### Create Page

![Create Page](screenshots/create.png)

This is the project page showing the project details

### Edit Page

![Edit Page](screenshots/edit.png)

This is the project page showing the project details

### Solution Page

![Solution Page](screenshots/solution.png)

This is the project page showing the project details

## Application Preview

### Simple tutorial with Tutorial.json file

- Download Tutorial.json file
- Go to **CREATE** tab
- Click the **IMPORT** button
  - Import the Tuorial.json file
- Go to **SOLUTION** tab
- Click **GET SOLUTION** button
- Done!

### Import tutorial

![Import Tutorial](screenshots/import-tutorial.gif)

Import data from the tutorial.json

### Get solution

![Get Solution](screenshots/get-solution.gif)

Get timetabling solution for the tutorial example

### Create new module

![Create Module](screenshots/create-module.gif)

Create a new module named **CS1002**

### Create new activity

![Create Activity](screenshots/creat-activity.gif)

Create **lecture** activity for **CS1002** 

### Create new lecturer

![Create Lecturer](screenshots/create-lecturer.gif)

Create lecturer **Ruth Leatham**

### Create new room

![Create Room](screenshots/create-room.gif)

Create room **JH110**

### Assign lecturer

![Assign Lecturer](screenshots/assign-lecturer.gif)

Assign lecturer **Ruth** to **CS1002**

### Assign room

![Assign Room](screenshots/assign-room.gif)

Assign **JH110** to **CS1002**

#### Bugs and errors
- If you find and buys or errors please email me(iwg6852@gmail.com), I will try to fix it ASAP.
