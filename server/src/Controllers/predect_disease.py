from PIL import Image
from flask import jsonify

from torchvision.transforms import Compose, Resize, ToTensor, Normalize
from torchvision.models import resnet50
from torch import load, device, no_grad, argmax
from torch.nn import Linear

# Define image transformations
transform = Compose([
    Resize((224, 224)),  # Match the training input size
    ToTensor(),
    Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),  # Standard normalization for ResNet
])

# Load ResNet50 model
model = resnet50(pretrained=False)

# Modify the fully connected (fc) layer to match 39 classes
num_ftrs = model.fc.in_features
model.fc = Linear(num_ftrs, 39)

# Load trained weights
checkpoint = load(
    "./trained_models/disease_detection/model_trained.pth",
    map_location=device("cpu")
)

if "state_dict" in checkpoint:
    model.load_state_dict(checkpoint["state_dict"], strict=False)
else:
    model.load_state_dict(checkpoint, strict=False)

model.eval()

def predict(image_path):
    try:
        # Open and preprocess the image
        img = Image.open(image_path)
        img = transform(img)

        # Make prediction
        with no_grad():
            output = model(img.unsqueeze(0))
            predicted_class = argmax(output)
        return predicted_class.item()

    except Exception as e:
        return jsonify({"error": str(e)})
