# BlogNetwork

A blog writing website built with react.js, python flask and mongoDB

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [UI Showcase](#ui-showcase)
- [Endpoints Documentation](#endpoints-documentation)

## Overview

Provide a brief overview of your project here, explaining its purpose and main features. You can also include any relevant screenshots or GIFs to showcase the application.

## Features

Main features of your application:
- User registration and login
- Writing articles
- Categorizing articles
- Adding images to articles

## Prerequisites

Before getting started, make sure you have the following prerequisites installed:

- Python 3.x: You can download Python from the official website: https://www.python.org/downloads/
- Node.js and npm: You can download Node.js from the official website: https://nodejs.org/
- MongoDB You can download mongoDB from the official website: https://www.mongodb.com/try/download/community

## Installation

Instructions on how to install and set up the project locally. First of all make sure mongoDB is installed and running properly on your local machine.

1. Clone the repository:<br>
  ```
  git clone https://github.com/Gourav2000/BlogNetwork
  ```
2. Install dependencies for the Flask backend:<br>
  ``` 
  cd backend
  pip install -r requirements.txt 
  ```
3. Start the Flask backend:
```
flask run
```
3. Install dependencies for the React frontend:
```
cd ../frontend
npm install --force
```
5. Start the React frontend:
```
npm start
```

Alternatively You can download and install docker from the official website https://docs.docker.com/engine/install/ for your respective OS. Then Type
```
docker-compose up
```
For setting up the whole project in a single command.

## UI Showcase

### Blog Single Page & Home Page
<table>
<tr>
<td><img src="screenshots/BlogSinglePage.png" alt="Blog Single Page"></td>
<td><img src="screenshots/HomePage.png" alt="Home Page"></td>
</tr>
</table>

### Home Page 2 & Login Page
<table>
<tr>
<td><img src="screenshots/HomePage2.png" alt="Home Page 2"></td>
<td><img src="screenshots/LoginPage.png" alt="Login Page"></td>
</tr>
</table>

### Register Page & Write Blog Comments Page
<table>
<tr>
<td><img src="screenshots/RegisterPage.png" alt="Register Page"></td>
<td><img src="screenshots/WriteBlogCommentsPage.png" alt="Write Blog Comments Page"></td>
</tr>
</table>

### Write Blog Page & Write Blog Page 2
<table>
<tr>
<td><img src="screenshots/WriteBlogPage.png" alt="Write Blog Page"></td>
<td><img src="screenshots/WriteBlogPage2.png" alt="Write Blog Page 2"></td>
</tr>
</table>

### Write Blog Page 3
![Write Blog Page 3](screenshots/WriteBlogPage3.png)

## Endpoints Documentation

---

### **1. Home Page**
**Path:** `/`
- Displays a list of all posts.
- Each post showcases its title, a brief description, and an image.
- Posts can be filtered based on categories.
- Quick navigation links are provided for easy access to posts.

#### Endpoint: `/`
- **Method:** `GET`
- **Description:** Fetches and displays all posts on the home page.

---

### **2. Single Post Page**
**Path:** `/post/:id`
- Displays a single post based on the provided post ID.
- Shows post title, content, and image.
- Displays the author's details.
- Allows users to comment on the post.

#### Endpoint: `/post/:id`
- **Method:** `GET`
- **Parameters:** 
  - `id`: ID of the post to be fetched.
- **Description:** Fetches and displays a single post based on the provided post ID.

---

### **3. Write or Edit Post Page**
**Path:** `/write`
- Allows users to write a new post or edit an existing post.
- Users can add a title, content, and choose a category for the post.
- Provides an option to upload a cover image for the post.

#### Endpoint: `/write`
- **Method:** `POST` (for new posts) / `PUT` (for updating existing posts)
- **Description:** Allows users to write a new post or edit an existing post.

---

### **4. Profile Page**
**Path:** `/profile`
- Displays the profile details of the logged-in user.
- Shows user's name, email, and profile picture.
- Provides options to edit profile details or delete the profile.

#### Endpoint: `/profile`
- **Method:** `GET`
- **Description:** Fetches and displays the profile details of the logged-in user.

---

### **5. Login Page**
**Path:** `/login`
- Allows users to log in using their email and password.
- Provides a link to the registration page for new users.

#### Endpoint: `/login`
- **Method:** `POST`
- **Parameters:**
  - `email`: Email of the user.
  - `password`: Password of the user.
- **Description:** Authenticates and logs in the user.

---

### **6. Register Page**
**Path:** `/register`
- Allows new users to register by providing their name, email, and password.
- Provides an option to upload a profile picture.

#### Endpoint: `/register`
- **Method:** `POST`
- **Parameters:**
  - `name`: Name of the user.
  - `email`: Email of the user.
  - `password`: Password of the user.
- **Description:** Registers a new user.

---





