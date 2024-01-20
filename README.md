# 📱 GYMTRYHARDER APPLICATION

A comprehensive fitness application meticulously crafted to explore the practical implementation of design patterns in software development. GYMTRYHARDER leverages cutting-edge technologies to deliver a robust, scalable, and user-friendly experience, offering insightful ways to manage fitness routines.

## Project Overview

This project is designed to delve into the benefits and practical applications of various software design patterns. By integrating these patterns into the development process, GYMTRYHARDER stands as a testament to efficient and effective software engineering practices.

## 👥 Team Members

- **Konrad Sitek** - Backend Developer
- **Adrian Cielniak** - Frontend Developer

## 🛠️ Used Technologies

### Backend Technologies

- **Python**: A versatile and powerful programming language. [Learn more](https://www.python.org/)
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python based on standard Python type hints. [Learn more](https://fastapi.tiangolo.com/)
- **SQLAlchemy**: The Python SQL toolkit and Object-Relational Mapping (ORM) library for Python. [Learn more](https://www.sqlalchemy.org/)
- **PostgreSQL**: A powerful, open-source object-relational database system. [Learn more](https://www.postgresql.org/)
- **Docker**: A set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers. [Learn more](https://www.docker.com/)
- **Amazon EC2**: A web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers. [Learn more](https://aws.amazon.com/ec2/)

### Frontend Technologies
- **React Native**: An open-source framework developed by Facebook, React Native enables developers to build mobile applications using JavaScript and React. It's designed to allow for the creation of natively rendered apps for both iOS and Android from a single codebase.



## 📝 **Description:**
Fitness application designed to cater to individual fitness goals. The application allows users to create personalized workout plans or follow plans your friends. Progress tracking is a core feature, enabling users to monitor their achievements over time.

## 📈 **Diagram:**

![Diagram](https://github.com/sit3kk/GymTryHarder_App/assets/69002597/a819a998-661b-4363-a81e-6cb0db0800c5)



### 🌟 **CORE FEATURES:**
- Registration and login using JWT Tokens
<table style="border-collapse: collapse; border: none;">
  <tr>
    <td style="border: none;"><img src="https://github.com/sit3kk/GymTryHarder_App/assets/69002597/633570c8-3ed7-40e1-b83b-34d2fb6acaa8" width="100%"></td>
    <td style="border: none;"><img src="https://github.com/sit3kk/GymTryHarder_App/assets/69002597/6236c0f5-6926-439f-9d0e-db6ef379720d" width="100%"></td>
  </tr>
</table>

- Saving workout plans
<table style="border-collapse: collapse; border: none;">
  <tr>
    <td style="border: none;"><img src="https://github.com/sit3kk/GymTryHarder_App/assets/69002597/6059aedf-14d2-4407-9ff9-937b2bed9aca" width="100%"></td>
    <td style="border: none;"><img src="https://github.com/sit3kk/GymTryHarder_App/assets/69002597/50a3751b-9e31-47bc-a7e2-e4ee833805ac" width="100%"></td>
  </tr>
</table>

- Saving current progress
<table style="border-collapse: collapse; border: none;">
  <tr>
    <td style="border: none;"><img src="https://github.com/sit3kk/GymTryHarder_App/assets/69002597/52482f0f-fb29-455d-bf18-7d0b3a467066" width="100%"></td>
    <td style="border: none;"><img src="https://github.com/sit3kk/GymTryHarder_App/assets/69002597/696706bd-e9be-4702-9dd2-4e73ad556719" width="100%"></td>
  </tr>
</table>

- Follow other users
<table style="border-collapse: collapse; border: none;">
  <tr>
    <td style="border: none;"><img src="https://github.com/sit3kk/GymTryHarder_App/assets/69002597/1d2d3249-09a9-4cc0-8c34-1c7c84d98aea" width="100%"></td>
    <td style="border: none;"><img src="https://github.com/sit3kk/GymTryHarder_App/assets/69002597/fcc438cf-1192-4707-afc5-34616e74d62c" width="100%"></td>

  



  </tr>
</table>





## 🧩 **Design Patterns used in the project:**

## 🎨 Decorator Pattern
**Purpose:**  
Enhance or modify the behavior of functions or methods without altering their core functionality.

**Examples in Project:**
- **Authentication and Authorization Decorators**:  
  Used in API routes to ensure only authenticated users access certain endpoints.  
  Example: Checking for valid tokens before allowing access to user profile updates.
- **Logging Decorators**:  
  Applied to log activities like login attempts and user actions.  
  Example: Logging successful or failed login attempts, and user data access or updates.


## 📐 Model-View-Controller (MVC)
**Purpose:**  
Separate application logic into three interconnected components: models, views, and controllers.

**Examples in Project:**
- **Models (`models.py`)**:  
  Define data structures such as `UserModel` and `WorkoutModel`, representing the application's data layer.
- **Views (`utils.py`)**:  
  Functions like `get_all_user_plans` prepare and present data, acting as the view layer in the application.
- **Controllers (`routes.py`)**:  
  Handle the incoming requests, process them using models, and return the appropriate views. Examples include endpoints for user authentication, data retrieval, and updates.

## 🔗 Singleton Pattern
**Purpose:**  
Ensure a class has only a single instance, providing a global point of access to it.

**Examples in Project:**
- **Database Connection Pool**:  
  Manages a single database connection pool for efficient database access across the application.

## 🏭 Factory Pattern
**Purpose:**  
Create objects without specifying the exact class of the object that will be created.

**Examples in Project:**
- **Workout Plan Creation ('factories.py')**:  
  Factory to create new sets of exercises.
- **User Creation ('factories.py')**:  
  Factory to create new user in system.
- **Plan Creation ('factories.py')**:  
  Factory to create new plan in system.

## ➡️ Backend endpoints:
![image](https://github.com/sit3kk/GymTryHarder_App/assets/69002597/d05af8ed-fa3e-4c57-b2b3-7a68c5114eca)






![image](https://github.com/sit3kk/GymTryHarder_App/assets/69002597/9ffd3451-dd83-4a2e-b972-723ed3358495)
