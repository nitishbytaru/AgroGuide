from PIL import Image
from flask import jsonify
from torchvision.transforms import Compose, Resize, ToTensor, Normalize
from torchvision.models import resnet50
from torch import load, device, no_grad, argmax
from torch.nn import Linear
from functools import lru_cache

@lru_cache()
def get_transform():
    return Compose([
        Resize((224, 224)),
        ToTensor(),
        Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        ),
    ])

@lru_cache()
def get_model():
    model = resnet50(pretrained=False)
    num_ftrs = model.fc.in_features
    model.fc = Linear(num_ftrs, 39)

    checkpoint = load(
        "./trained_models/disease_detection/model_trained.pth",
        map_location=device("cpu")
    )

    if "state_dict" in checkpoint:
        model.load_state_dict(checkpoint["state_dict"], strict=False)
    else:
        model.load_state_dict(checkpoint, strict=False)

    model.eval()
    return model

def predict(image_path):
    try:
        img = Image.open(image_path)
        img = get_transform()(img)

        with no_grad():
            output = get_model()(img.unsqueeze(0))
            predicted_class = argmax(output)
        return predicted_class.item()

    except Exception as e:
        return {"error": str(e)}
