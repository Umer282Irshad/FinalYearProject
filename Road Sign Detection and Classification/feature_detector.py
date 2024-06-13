import cv2
import numpy as np 
import matplotlib.pyplot as plt


def plot(im1 , im2):

    rows = 1
    columns = 2
    fig = plt.figure(figsize=(100,100))
    fig.add_subplot(rows, columns, 1) 
    # showing image 
    plt.imshow(im1) 
    plt.axis('off') 
    plt.title("Template") 
    
    # Adds a subplot at the 2nd position 
    fig.add_subplot(rows, columns, 2) 
    # showing image 
    plt.imshow(im2 ) 
    plt.title("sample") 

    plt.show()


def modifier(image):

    img = image.copy()
    img = triangle(img)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # Define a lower and upper threshold for the red color in HSV
    lower_red = np.array([50, 0 ,0])
    upper_red = np.array([250, 255, 50])
    # Create a mask for the red color
    red_mask = cv2.inRange(hsv, lower_red, upper_red)
    # Make the red part white in the original image
    kernel = np.ones((3,3),np.uint8)
    opening = cv2.morphologyEx(red_mask, cv2.MORPH_OPEN, kernel)

    # # mask = cv2.cvtColor(img , cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(opening , (3,3) , 0)
    temp_edges = cv2.Canny(blur , 50 , 100)

    return temp_edges



def modifier1(image):


    img = image.copy()
    blur = cv2.GaussianBlur(img , (5,5) , 0)
    temp_edges = cv2.Canny(blur , 0 , 255)

    return temp_edges


def edge(image):
    img = image.copy()
    img = cv2.cvtColor(img , cv2.COLOR_BGR2GRAY)
    smoothed_image = cv2.GaussianBlur(img, (3, 3), 0)
    edges = cv2.Canny(smoothed_image, 0, 255)    
    return edges



def triangle(image):
    img = image.copy()
    gray = cv2.cvtColor(img , cv2.COLOR_BGR2GRAY)

    blur = cv2.GaussianBlur(gray , (3,3) , 0)

    edges = cv2.Canny(blur , 50  , 100)

    kernel = np.ones((3,3),np.uint8)
    opening = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel)

    contours, _ = cv2.findContours(opening, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    triangles = []
    for contour in contours:
        epsilon = 0.04 * cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, epsilon, True)
        
        triangles.append(contour)

    areas = np.array([cv2.contourArea(cnt) for cnt in triangles])
    max_cnt = [triangles[np.argmax(areas)]]

    black_image = np.zeros_like(gray)

    epsilon = 0.04 * cv2.arcLength(max_cnt[0], True)
    approx = cv2.approxPolyDP(max_cnt[0], epsilon, True)
    cv2.fillPoly(black_image, [approx], (255, 255, 255))


    img = cv2.bitwise_and(img , img ,  mask= black_image)
    # cv2.drawContours(black_image , max_cnt ,  color=[255,255,255] ,thickness= 1 , contourIdx = 0) 

    return img

def inside_extractor(image):

    img = image.copy()

    upscaled_image = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

    hsv = cv2.cvtColor(upscaled_image, cv2.COLOR_BGR2HSV)

    lower_red = np.array([150, 40, 40])
    upper_red = np.array([180, 255, 255])
    red_mask = cv2.inRange(hsv, lower_red, upper_red)

    not_red_mask = cv2.bitwise_not(red_mask)

    contours, _ = cv2.findContours(red_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    black_image = np.zeros_like(not_red_mask)
    if(contours):
        areas = [cv2.contourArea(cnt) for cnt in contours]

        cont = contours[np.argmax(areas)]

    

        epsilon = 0.0001 * cv2.arcLength(cont, True)
        approx = cv2.approxPolyDP(cont, epsilon, True)

        cv2.fillPoly(black_image, [approx], (255, 255, 255))

        final_mask = cv2.bitwise_and(black_image , not_red_mask)

        final_result = cv2.bitwise_and(upscaled_image , upscaled_image, mask = final_mask)

        return final_result
    return []

def black_extractor(image):

    if(len(image) > 0):

        gray = cv2.cvtColor(image , cv2.COLOR_BGR2GRAY)

        lower_threshold = 1 # Greater than 0
        upper_threshold = 50  # Less than 25

        binary_mask = cv2.inRange(gray, lower_threshold, upper_threshold)
        kernel = np.ones((5,5),np.uint8)
        closing = cv2.morphologyEx(binary_mask, cv2.MORPH_CLOSE, kernel)
        kernel = np.ones((3,3),np.uint8)

        opening = cv2.morphologyEx(closing, cv2.MORPH_OPEN, kernel)

        return opening

    return []



def classifier(image):
    contours, hierarchy = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    print(len(contours))
    filtered = []
    for cont in contours:
        if(cv2.contourArea(cont)  > 200):

            filtered.append(cont)
    print(len(filtered))
    length = len(filtered)
    if(length == 1):
        return 'Left_Crossing_At_Next_Intersection'
    
    elif(length == 2):
        return 'Two_Way_Traffic'
    elif(length == 5):
        return '20kph_Speed_Limit'
    else:
        return "NONE"
    

def final_classify(image):
    inside = inside_extractor(image)
    black = black_extractor(inside)
    name = classifier(black)

    return name


def extract(image):
    inside = inside_extractor(image)
    black = black_extractor(inside)

    return inside , black


def bounding_box(contour):
    boxes = []
    if(len(contour) == 1):
        x,y, w,h = cv2.boundingRect(contour[0])
        return x,y, x+w,y+h
    
    for c in contour:
        print('area = ' , cv2.contourArea(c))
        if(cv2.contourArea(c)> 900):
            (x, y, w, h) = cv2.boundingRect(c)
            boxes.append([x,y, x+w,y+h])

    boxes = np.asarray(boxes)
    if(len(boxes) >0):
        left, top = np.min(boxes, axis=0)[:2]
        right, bottom = np.max(boxes, axis=0)[2:]

        return left , top , right , bottom
    else:
        return 10 , 10, 20, 20
    

def resize(image):
    contours, _ = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    l,t,r,b = bounding_box(contours)
    black = image[t:b ,l:r]
    black = cv2.resize( black,None ,   fx = 150/black.shape[1] , fy = 250/black.shape[0] , interpolation=cv2.INTER_CUBIC)
    return black


def crop_and_resize(image):
    inside = inside_extractor(image)
    black = black_extractor(inside)
    contours, _ = cv2.findContours(black, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    l,t,r,b = bounding_box(contours)
    black = black[t:b ,l:r]
    black = cv2.resize( black,None ,   fx = 150/black.shape[1] , fy = 250/black.shape[0] , interpolation=cv2.INTER_CUBIC)
    return black


# def classify(image):
    # crp = crop_and_resize(image)
    