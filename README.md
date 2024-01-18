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

(TBD - Add similar descriptions for the frontend technologies used)


Frontend


## 📝 **Description:**
Fitness application designed to cater to individual fitness goals. The application allows users to create personalized workout plans or follow plans your friends. Progress tracking is a core feature, enabling users to monitor their achievements over time.

## 📈 **Diagram:**

![Diagram](https://github.com/sit3kk/GymTryHarder_App/assets/69002597/a819a998-661b-4363-a81e-6cb0db0800c5)




### 🌟 **(CORE FEATURES):**
- Registration and login using JWT Tokens

- Saving workout plans

- Saving current progress

- Setting personal informations like photo, height, weight etc.


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





![image](https://github.com/sit3kk/GymTryHarder_App/assets/69002597/9ffd3451-dd83-4a2e-b972-723ed3358495)
