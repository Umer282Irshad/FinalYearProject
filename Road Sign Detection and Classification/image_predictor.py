import cv2
import numpy as np
from tensorflow.keras.models import load_model


model = load_model('GTSRB.h5')

image = cv2.imread('Frame162.jpg')

sharpen_filter=np.array([
    [-1,-1,-1],
    [-1,9,-1],
    [-1,-1,-1]])

sharp_image=cv2.filter2D(image,-1,sharpen_filter)
print("Shape of image" , image.shape)

cv2.imshow(sharp_image)
cv2.waitKey(10000)
index = np.argmax(model.predict(np.array([sharp_image])))

print(index)