from tensorflow.keras.models import load_model
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

model = load_model('my_skin_disease_pred_model.h5')

class_names = {
    0: 'Melanocytic nevi',
    1: 'Melanoma',
    2: 'Benign keratosis-like lesions',
    3: 'Basal cell carcinoma',
    4: 'Actinic keratoses',
    5: 'Vascular lesions',
    6: 'Dermatofibroma'
}

app = Flask(__name__)
CORS(app)  

@app.route('/' , methods=['GET'])
def home():
    return jsonify({'message': 'welcome'})

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['image']
        predicted_class_index, predicted_class_name, predicted_prob, image = predict_image(file)

        res = {
            'predicted_class': predicted_class_name,
            'prediction_probability': str(predicted_prob)
        }

        return jsonify(res)


def predict_image(file):
    file_bytes = np.fromfile(file, np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Preprocess image (resize and normalize)
    image = cv2.resize(image, (64, 64))
    image = image.astype('float32') / 255.0

    image = np.expand_dims(image, axis=0)

    predictions = model.predict(image)

    predicted_class_index = np.argmax(predictions[0])
    predicted_prob = predictions[0][predicted_class_index]
    predicted_class_name = class_names[predicted_class_index]

    return predicted_class_index, predicted_class_name, predicted_prob, image[0]



if __name__ == '__main__':
    app.run(host='0.0.0.0' , port=5001)