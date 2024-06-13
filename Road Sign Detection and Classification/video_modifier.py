from frame_modifier import *
import cv2
import numpy as np
from edge_writer import *
from image_saver import *
from feature_detector import *
import os
from classifier import *
# Load the saved Keras model


def video_modifer(video_path):

    input_video = cv2.VideoCapture(video_path)
    if not input_video.isOpened():
        print("Could not open the video")
        return False
    
    output_video_path = 'output_video1.avi'

    ret , frame = input_video.read()
    if ret:
        print(frame.shape)
        frame_size = [frame.shape[1], frame.shape[0]]
    fourcc = cv2.VideoWriter_fourcc(*'XVID')

    video_writer = cv2.VideoWriter(output_video_path, fourcc, 30, frame_size)
    name = ''
    i = 0
    while True:

        ret , frame = input_video.read()

        if ret:
            if(i >= 0):
                # video_writer.write(modified_frame)

                flag ,crop_image , hsv, red_mask , rect = image_saver(frame)                
                if(flag and np.sum(crop_image == 0) > 10 and i%3 == 0):
                    name = classify(crop_image)
                    cv2.rectangle(frame , (rect[0] , rect[1]) , (rect[0]+rect[2]  , rect[1]+rect[3]) , [0,0,255] , 5)
                    cv2.putText(frame , name , (rect[0] , rect[1]-10) , cv2.FONT_HERSHEY_SIMPLEX, 2, [0,0,255], 5 , cv2.LINE_AA)
                else:
                    cv2.rectangle(frame , (rect[0] , rect[1]) , (rect[0]+rect[2]  , rect[1]+rect[3]) , [0,0,255] , 5)
                    cv2.putText(frame , name , (rect[0] , rect[1]-10) , cv2.FONT_HERSHEY_SIMPLEX, 2, [0,0,255], 5 , cv2.LINE_AA)
                video_writer.write(frame)
            print(f"Frame no {i} written")

            i+=1
        else:
            break



video_modifer('video1.mp4')

