# 📱 **GYMTRYHARDER APPLICATION**

A project created for the purpose of understanding and diving deeper into the benefits and practicality of using design patterns in the software development process.

## 👥 **Members:**
- Konrad Sitek
- Adrian Cielniak

## 📝 **Description:**
Fitness application designed to cater to individual fitness goals and community engagement. The application allows users to create personalized workout plans or opt for pre-designed plans curated by administrators. Progress tracking is a core feature, enabling users to monitor their achievements over time through intuitive graphs and statistics.

## 🚀 **Development Phases:**

### 🌟 **PHASE 1 (CORE FEATURES):**
- User Authentication and Profile Management
- Workout Plans (Personalized and Pre-designed)
- Progress Tracking

### 🌟 **PHASE 2 (ENHANCED FEATURES):**
- Social Features
- Achievements

### 🌟 **PHASE 3 (COMMUNITY ENGAGEMENT):**
- Community Forums

### 🌟 **PHASE 4 (PERSONALIZATION):**
- Personalized Recommendations

## 🧩 **Design Patterns:**

### 📐 **MODEL-VIEW-CONTROLLER (MVC):**
**Use Case:** Organizing your code in a way that separates data handling, user interface rendering, and control flow.
**Example:** Models could represent data structures for users and workouts, views could render user profiles and workout plans, and controllers could handle user inputs like creating a new workout plan.

### 🔗 **SINGLETON:**
**Use Case:** Ensuring a class has only a single instance and providing a global point of access to that instance.
**Example:** Managing a single database connection pool to ensure efficient database access across your app.

### 🏭 **FACTORY:**
**Use Case:** Creating objects without specifying the exact class of object that will be created.
**Example:** Creating workout plan objects where different types of workout plans (e.g., strength training, cardio, mixed) may have different properties and behaviors.

### 🎨 **DECORATOR:**
**Use Case:** Adding new functionality to an object without altering its structure.
**Example:** Extending the functionalities of API endpoints, like adding authentication checks or input validation without modifying the existing code structure.

### 🔔 **OBSERVER:**
**Use Case:** Allowing an object to publish changes to its state so that other objects can react accordingly.
**Example:** Notifying users of new social interactions like friend requests, comments, or shared achievements in real-time.

### 🔄 **STRATEGY:**
**Use Case:** Allowing a family of algorithms to be defined and encapsulated within a class. The algorithm can be selected at runtime.
**Example:** Allowing users to switch between different workout recommendation algorithms based on their preferences and goals.



![image](https://github.com/sit3kk/GymTryHarder_App/assets/69002597/9ffd3451-dd83-4a2e-b972-723ed3358495)
