# 📱 Skin Disease Classification App : PREDICTXD.AI

A mobile application built with React Native that allows users to upload an image of a skin condition and receive a prediction of the type of skin disease. This app aims to help users identify possible skin issues for further medical consultation.

## 📋 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
  
## ✨ Features

- **Image Upload**: Users can capture or upload a photo from their gallery for analysis.
- **Disease Prediction**: The app uses a machine learning model to predict the type of skin disease.
- **User-Friendly Interface**: Simple navigation for all user interactions and features.

## 🛠 Technologies

- **Mobile Application**: React Native (TypeScript)
- **Machine Learning Model**: Processes the uploaded images to classify skin diseases (handled separately by the ML team).

## 📁 Project Structure

```plaintext
.
├── frontend/        # React Native mobile application
│   ├── src/
│   └── ...
├── model/         # ML Model
│   ├── train_model.ipynb/
│   ├── convert_to_tflite.py/
|   ├── trained_model.tflite/
|   ├── requirements.txt/
│   └── ...
└── README.md

```
## 🚀 Getting Started

Prerequisites
Node.js installed
React Native CLI set up


Installation
Clone the repository:

```
git clone https://github.com/your-username/predictXD.ai.git
cd predictXD.ai
```

Navigate to the frontend:```cd frontend```

Install dependencies:
```npm install```

Start the frontend:
```npm start ```

## 📲 Usage

Open the app on your device.
Use the Upload feature to capture or select an image of a skin condition.
Submit the image for prediction.
View the results and possible disease classification returned by the machine learning model.


