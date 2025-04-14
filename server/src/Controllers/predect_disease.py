from PIL import Image
from numpy import array, expand_dims, float32, argmax
from tensorflow.lite.python.interpreter import Interpreter
from functools import lru_cache


@lru_cache()
def get_interpreter():
    interpreter = Interpreter(
        model_path="./trained_models/disease_detection/inceptionv3_96.tflite"
    )
    interpreter.allocate_tensors()
    return interpreter


def preprocess_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize((224, 224))  # Resize to match model input
    img_array = array(img) / 255.0  # Normalize to [0, 1]
    img_array = (img_array - [0.485, 0.456, 0.406]) / [
        0.229,
        0.224,
        0.225,
    ]  # Normalize like ImageNet
    img_array = expand_dims(img_array.astype(float32), axis=0)  # Add batch dimension
    return img_array


def predict(image_path):
    try:
        interpreter = get_interpreter()
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        img_array = preprocess_image(image_path)

        interpreter.set_tensor(input_details[0]["index"], img_array)
        interpreter.invoke()

        output_data = interpreter.get_tensor(output_details[0]["index"])
        predicted_class = argmax(output_data[0])

        return int(predicted_class)

    except Exception as e:
        return {"error": str(e)}
