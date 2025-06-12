![Screenshot 2025-06-12 133005](https://github.com/user-attachments/assets/c6a4736f-3ba6-4be1-b158-4746bf1cf7f1)

# 🎓 Internship Backend 
rvices

This repository contains backend services developed for handling **internship applications** and **certificate verification**, implemented as part of internship tasks. The project is built using **Node.js**, **Express**, **MongoDB**, and **Google Sheets API**.

---

## 📌 Project Overview

### ✅ Task 1: Internship Application API

**🔹 Description**:  
A secure backend service to receive internship applications from students and store them in a Google Sheet.

**🔹 Features:**
- `POST /internship-applications` endpoint
- Input validation middleware
- Token-based authentication
- Integration with Google Sheets API using a **Service Account**
- Handles errors and invalid requests gracefully

**🔹 Technologies:**
- Node.js, Express.js
- Google Sheets API (Service Account Auth)
- Postman-tested secure headers

---

### ✅ Task 2: Certificate Verification API

**🔹 Description**:  
Provides an endpoint to verify a student's internship certificate using a unique certificate ID.

**🔹 Features:**
- `GET /certificate/:id` endpoint
- MongoDB-based document storage
- Relational linking between certificates and student profiles
- Token-based authentication
- File-based request logging (`certificates-log.txt`)
- ⚡ Optimized for performance (responses in ~14ms)
- Prepared for Redis/memory-based caching

**🔹 Technologies:**
- Node.js, Express.js
- MongoDB (Mongoose ODM)
- File-based logging (optional Redis-ready)
- Secure API access

---

## 🔒 Authentication

All endpoints are protected via **token-based authentication** using headers. Tokens are expected in the `Authorization` header and verified before any processing.

---

## ⚙️ Project Structure
📦project-root
┣ 📂controllers
┃ ┗ 📜index.js # Route logic for both tasks
┣ 📂routes
┃ ┗ 📜apiRoutes.js # Route declarations
┣ 📂models
┃ ┣ 📜User.js # User schema
┃ ┗ 📜Certificate.js # Certificate schema
┣ 📜sheetsClient.js # Google Sheets API integration
┣ 📜logger.js # File-based logging utility
┣ 📜server.js # Express server bootstrapping
┣ 📜.env # Environment variables
┗ 📜README.md # This file

