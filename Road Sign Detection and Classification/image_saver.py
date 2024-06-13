import cv2 
import numpy as numpy

def image_saver(frame):

    import cv2
    import numpy as np

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    lower_red = np.array([150, 40, 40])
    upper_red = np.array([180, 255, 255])
    mask = cv2.inRange(hsv, lower_red, upper_red)
        
    # Apply Gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(mask, (5, 5), 0)

    # Apply Canny edge detection
    edges = cv2.Canny(blurred,50, 150
                    )

    # Find contours
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if(contours):

        
        for cnt in contours:

            cnt_area = cv2.contourArea(cnt)

            if(cnt_area > 1000 and cnt_area < 30000):

                # Approximate the contour to reduce the number of vertices
                epsilon = 0.02 * cv2.arcLength(cnt, True)
                approx = cv2.approxPolyDP(cnt, epsilon, True)

                # Get the number of vertices
                vertices = len(approx)

                if(vertices == 3 or vertices >= 8):

                    x,y,w,h = cv2.boundingRect(cnt)
                    crop_image = frame[y-10:y+h+10 , x-10:x+w+10]
                    return True , crop_image , hsv, mask, [x,y,w,h]

    
    

    return False , [] , [] , [] , [0,0,0,0]