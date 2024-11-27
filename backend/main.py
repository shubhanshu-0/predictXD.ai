from tensorflow.keras.models import load_model
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

model = load_model('my_skin_disease_pred_model.h5')

# Class names for the prediction
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
CORS(app)  # Cross-Origin Resource Sharing

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to the skin disease prediction API'})

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    
    try:
        predicted_class_index, predicted_class_name, predicted_prob, _ = predict_image(file)

        res = {
            'predicted_class': predicted_class_name,
            'prediction_probability': str(predicted_prob)
        }

        return jsonify(res)

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': 'Prediction failed'}), 500

def predict_image(file):
    
    image = Image.open(file.stream)
    

    image = np.array(image.resize((64, 64)))  
    image = image.astype('float32') / 255.0 

    #  convert to RGB , if RGBA
    if image.shape[-1] == 4:
        image = cv2.cvtColor(image, cv2.COLOR_RGBA2RGB)

    image = np.expand_dims(image, axis=0)  # add batch dimension

    # Predict 
    predictions = model.predict(image)
    predicted_class_index = np.argmax(predictions[0])
    predicted_prob = predictions[0][predicted_class_index]
    predicted_class_name = class_names[predicted_class_index]

    return predicted_class_index, predicted_class_name, predicted_prob, image[0]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
