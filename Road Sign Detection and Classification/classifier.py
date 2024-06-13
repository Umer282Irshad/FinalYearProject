import numpy as np
import matplotlib.pyplot as plt
import cv2
from feature_detector import *
import os

path = 'D:\FYP\Phase3\YOLOv5\DATA'

names = []

image_names = os.listdir(path)

for i in range(len(image_names)):
    names.append(image_names[i][0:-4])


    
def classify(image):

    images = [cv2.imread(f'DATA/{i}' , cv2.IMREAD_GRAYSCALE) for i in image_names]

    image = crop_and_resize(image)

    print(image.shape)
    
    images = [resize(img) for img in images]

    for i in range(len(images)):
        print(images[i].shape)
    results = [cv2.bitwise_and(image , img) for img in images]

    results = [np.sum(img == 255) for img in results]

    class_idx = np.argmax(results)

    print(class_idx)
    name = names[class_idx]

    return name
