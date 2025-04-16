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
    img = Image.open(image_path)
    img = img.resize((224, 224))
    img_array = array(img, dtype=float32) / 255.0
    img_array = expand_dims(img_array, axis=0)
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
        print("Prediction failed:", str(e))
        return {"error": str(e)}
