# School Management System

## Description

This is a simple **frontend-only web application** that demonstrates a school management system. It allows managing students, teachers, classes, attendance, and financial data — all running entirely in the browser. There’s no backend or database; data can be handled using local storage or static JSON files.

The main goal is to show basic **Object-Oriented Programming (OOP)** principles like encapsulation, inheritance, polymorphism, and abstraction while keeping the code easy to understand for beginners.

## Introduction

The project models a small school system where:

* Students and teachers are represented using classes.
* Financial calculations include student fees and teacher salaries.
* Simple charts visualize the school’s data using Chart.js.
* Everything runs in the browser without any server setup.

It’s a clean and easy-to-run project meant for learning and demonstrating fundamental concepts of both OOP and frontend development.

## File Structure

```
src/
  models/        # JS classes for Student, Teacher, Person, etc.
  services/      # Logic for attendance, finance, etc.
  ui/            # UI components and interactions
  charts/        # Chart.js setup for visualizations
  data/          # Demo JSON data files
  main.js        # App entry point
  index.html     # Main HTML file

README.md        # Project overview
```

## How to Run

Simply open `index.html` in your browser, or use a simple static server like:

```bash
npx http-server
```

Then visit `http://localhost:8080` to use the app.
