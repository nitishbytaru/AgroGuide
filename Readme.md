# Project: Argoguide

## Abstract

AgroGuide is an intelligent agricultural assistance platform that combines machine learning with web technologies to empower farmers with data-driven insights. The system provides four core functionalities: (1) plant disease detection using image classification, (2) optimal crop recommendation based on soil and climate factors, (3) yield prediction using random forest regression, and (4) agricultural market information. Built with a React.js frontend and Flask backend, the platform integrates trained ML models (random forest for crop/yield prediction) to deliver actionable recommendations through an intuitive user interface. AgroGuide aims to enhance farming productivity and decision-making by bridging the gap between agricultural expertise and technological innovation.

## Features

1. **Plant Disease Detection**
   - Utilizes machine learning algorithms to identify diseases affecting crops based on uploaded images.

2. **Best Crop Suggestion**
   - Recommends the most suitable crops for cultivation based on various factors such as soil type, climate, and historical data.

3. **Yield Prediction**
   - Predicts crop yields using a random forest model trained on historical yield data and environmental factors.

4. **Agricultural Market Information**
   - Provides insights into market trends and pricing for various crops.

## Technology Stack

- **Backend**: Developed using Flask, a Python web framework. It handles data processing, machine learning model integration, and API endpoints for frontend communication.
  
- **Frontend**: Built with React.js, providing a responsive and interactive user interface for farmers to interact with the features seamlessly.

## Machine Learning Models

1. **Random Forest Models**
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

2. **InceptionV3 Model**
   - Purpose: Plant disease detection from leaf images.
   - Implementation: Utilizes the InceptionV3 architecture for image classification.
   - Location: server/Machine_Learning/inceptionv3.ipynb.
   - Features: Includes data preprocessing, model training, evaluation, and visualization of results.

3. **ResNet152V2 Model**
   - Purpose: Plant disease detection from leaf images.
   - Implementation: Utilizes the ResNet152V2 architecture for image classification.
   - Location: server/Machine_Learning/resnet152v2.ipynb.
   - Features: Similar to InceptionV3, includes data preprocessing, model training, evaluation, and visualization.

4. **Data Sources**
   - Crop recommendation: Kaggle agricultural dataset
   - Yield prediction: Indian agricultural statistics