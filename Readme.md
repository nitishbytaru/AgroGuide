# Project: Argoguide

## Abstract

AgroGuide is an intelligent agricultural assistance platform that combines machine learning with web technologies to empower farmers with data-driven insights. The system provides four core functionalities: (1) plant disease detection using CNN image classification, (2) optimal crop recommendation based on soil and climate factors, (3) yield prediction using random forest regression, and (4) agricultural market information. Built with a React.js frontend and Flask backend, the platform integrates trained ML models (CNN for disease detection, random forest for crop/yield prediction) to deliver actionable recommendations through an intuitive user interface. AgroGuide aims to enhance farming productivity and decision-making by bridging the gap between agricultural expertise and technological innovation.

## Features

1. **Plant Disease Detection**
   - Utilizes machine learning algorithms to identify diseases affecting crops based on uploaded images.

2. **Best Crop Suggestion**
   - Recommends the most suitable crops for cultivation based on various factors such as soil type, climate, and historical data.

3. **Yield Prediction**
   - Predicts crop yields using a random forest model trained on historical yield data and environmental factors.

## Technology Stack

- **Backend**: Developed using Flask, a Python web framework. It handles data processing, machine learning model integration, and API endpoints for frontend communication.
  
- **Frontend**: Built with React.js, providing a responsive and interactive user interface for farmers to interact with the features seamlessly.

## Machine Learning Models

1. **Convolutional Neural Network (CNN)**
   - Purpose: Plant disease detection from leaf images
   - Implementation: PyTorch-based model (model_trained.pth)
   - Location: server/trained_models/disease_detection/
   - Architecture:
     * 4 convolutional blocks (32, 64, 128, 256 filters)
     * Each block: Conv2D → ReLU → BatchNorm → Conv2D → ReLU → BatchNorm → MaxPool
     * Fully connected layers with dropout (0.4)
     * Input shape: 3x224x224 (RGB images)
     * Output: 39-class disease classification
   - Classes: Detects 39 plant disease conditions across multiple crops (apples, grapes, potatoes, tomatoes, etc.)
   - Training: Uses PlantVillage dataset with extensive augmentation
   - File: server/Machine_Learning/CNN.py contains model definition

2. **Random Forest Models**
   - **Crop Recommendation**:
     - Input: Soil parameters (N,P,K), temperature, humidity, pH, rainfall
     - Output: Recommended crops with probabilities
     - Location: server/trained_models/crop_predection/
     - Files: crop_prediction_model.pkl, label_encoder.pkl, scaler.pkl
   
   - **Yield Prediction**:
     - Input: Historical yield data, weather patterns, soil quality
     - Output: Predicted yield in tons/hectare
     - Location: server/trained_models/yield_prediction/
     - File: crop_yield_model.pkl

3. **Data Sources**
   - Disease detection: PlantVillage dataset
   - Crop recommendation: Kaggle agricultural dataset
   - Yield prediction: Indian agricultural statistics

## Overview

Argoguide integrates advanced machine learning capabilities with a user-friendly web interface to empower farmers with crucial insights into crop health, optimal crop selection, and yield forecasting. By combining Flask for robust backend operations and React.js for dynamic frontend interactions, the platform ensures efficient data processing and intuitive user experience.

