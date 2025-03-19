from PIL import Image
from torchvision import transforms
import torch
import torch.nn as nn
import torchvision.models as models
from flask import jsonify


transform = transforms.Compose(
    [
        transforms.Resize((224, 224)),  # Match the training input size
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
        ),  # Standard normalization for ResNet
    ]
)


# Load ResNet50 but modify the fc layer before loading weights
model = models.resnet50(pretrained=False)

# Modify the fully connected (fc) layer to match 39 classes
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 39)  # Match the saved model's fc layer

# Load trained weights
checkpoint = torch.load(
    "./trained_models/disease_detection/model_trained.pth",
    map_location=torch.device("cpu"),
)
model.load_state_dict(checkpoint, strict=False)  # Load weights

model.eval()

if "state_dict" in checkpoint:
    model.load_state_dict(checkpoint["state_dict"], strict=False)
else:
    model.load_state_dict(checkpoint, strict=False)


def predict(image_path):
    try:
        # Open the image
        img = Image.open(image_path)
        img = transform(img)

        # Make a prediction
        with torch.no_grad():
            output = model(img.unsqueeze(0))
            predicted_class = torch.argmax(output)
        return predicted_class.item()  # Ensure we return an integer

    except Exception as e:
        return jsonify({"error": str(e)})  # Ensure we return a Flask response
