#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "Redmi Note 9";
const char* password = "umer282i";

WebServer server(80);










const int highpinA = 27;  // PWM pin for phase A  //27
const int highpinB = 25;   // PWM pin for phase B  //25
const int highpinC = 32;   // PWM pin for phase C  //32
const int lowpinA = 26;                     //26
const int lowpinB = 33;                      //39---3
const int lowpinC = 12;                   

const int highpinAB = 16;  // PWM pin for phase A   //16, 5 , 19
const int highpinBB = 5;   // PWM pin for phase B
const int highpinCB = 19;   // PWM pin for phase C
const int lowpinAB = 4;   //4 , 17 ,18
const int lowpinBB = 17;
const int lowpinCB = 18;




const int Voltage_Control_Pin = 21;

#define ADC_VREF_mV 3300.0 // in millivolt
#define ADC_RESOLUTION 4095.0
#define PIN_LM35 34
#define PIN_CURRENT 35

float current = 0;
int max_current = 50;

const int ledpin = 0;
const int button = 2;
const int button1 = 15;
const int button2 = 13;

const int inputSensor = 2;
int sensorValue;
int rpm;
unsigned long lastReadTime = 0;
int currentReading;
int lastState;
int reading;
int duty;
unsigned long lastReadTime1 = 0;
const int analogInPin = 14; // Analog input pin
unsigned long ttime= 0;
int maxRpm = 200;



const int rpm_measure_pin = 2;
int rpm_counter = 0;
int measured_rpm = 0;
unsigned long rpm_sensor_time = 0;

float tempC = 0;
int max_temp = 90;


int lastState1;
int reading1;
int lastState2;
int reading2;
int lastReadTime2;

int sensorLastState;
float delayLowerLimit = 180000;
float count = 0.0;
unsigned long countTime = 0;
int dutyCycleUpperLimit = 0;
int dutyCycleUpperLimitAbsolute = 930;



int count1 = 0;



// vatriables for p control


unsigned long delaytime = 60000;
int delayminus = 25;
int delayminuslower = 1;
int frequency = 20000;  // PWM frequency  Hz (adjust as needed)
unsigned long currentTime = 0;
unsigned long previousTime = 0;
unsigned long lastTimeramp = 0;

unsigned long lastTimeSwitching = 0;
unsigned long lastmicros = 0;
unsigned long lastDutyIncrementTime = 0;
unsigned long lastRpmChangeTime = 0;
unsigned long printTime = 0;






float phase_ah[36] = {0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

float phase_al[36] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427, 0.5, 0.3420,0.1736,0};

float phase_bh[36] = {0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0, 0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660};

float phase_bl[36] = {0, 0, 0, 0, 0, 0,0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

float phase_ch[36] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0, 0, 0, 0, 0};

float phase_cl[36] = { 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0, 0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660};

float phase_ahB[36] = {0,0,0,0,0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

float phase_alB[36] = {0.5, 0.3420,0.1736,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427};

float phase_bhB[36] = {1 , 0.9848, 0.9396, 0.8660,0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0, 0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848};

float phase_blB[36] = {0,0,0,0,0, 0, 0, 0, 0, 0,0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0, 0, 0, 0, 0, 0, 0};

float phase_chB[36] = {0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0.1736,0.3420, 0.5, 0.6427, 0.7660, 0.8660, 0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0};

float phase_clB[36] = {0.5, 0.6427, 0.7660, 0.8660,0.9396, 0.9848, 1 , 0.9848, 0.9396, 0.8660, 0.7660, 0.6427, 0.5, 0.3420,0.1736,0, 0, 0, 0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1736,0.3420};

int i = 0;


int p_current;
int p_temp;
int p_max_rpm;
int p_frequency;
int p_max_duty_cycle;

int parameter_counter = 0;
int parameter_flag = 0;






void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/command", handleCommand);

  server.begin();
  Serial.println("HTTP server started");





  pinMode(rpm_measure_pin , INPUT);

  pinMode(ledpin,OUTPUT);
  pinMode(button,INPUT);
  pinMode(button1,INPUT);
  
  
  ledcSetup(0, frequency, 10); // channel 0, PWM frequency, resolution 8-bit
  ledcSetup(1, frequency, 10); // channel 1, PWM frequency, resolution 8-bit
  ledcSetup(2, frequency, 10); // channel 2, PWM frequency, resolution 8-bit
  ledcSetup(3, frequency, 10); // channel 3, PWM frequency, resolution 8-bit
  ledcSetup(4, frequency, 10); // channel 4, PWM frequency, resolution 8-bit
  ledcSetup(5, frequency, 10); // channel 5, PWM frequency, resolution 8-bit
  
  ledcSetup(6, frequency, 10); // channel 0, PWM frequency, resolution 8-bit
  ledcSetup(7, frequency, 10); // channel 1, PWM frequency, resolution 8-bit
  ledcSetup(8, frequency, 10); // channel 2, PWM frequency, resolution 8-bit
  ledcSetup(9, frequency, 10); // channel 3, PWM frequency, resolution 8-bit
  ledcSetup(10, frequency, 10); // channel 4, PWM frequency, resolution 8-bit
  ledcSetup(11, frequency, 10); // channel 5, PWM frequency, resolution 8-bit

  ledcSetup(12,frequency,10);
  // Attach PWM channels to pins
  ledcAttachPin(highpinA, 0);
  ledcAttachPin(highpinB, 1);
  ledcAttachPin(highpinC, 2);
  ledcAttachPin(lowpinA, 3);
  ledcAttachPin(lowpinB, 4);
  ledcAttachPin(lowpinC, 5);

  ledcAttachPin(highpinAB, 6);
  ledcAttachPin(highpinBB, 7);
  ledcAttachPin(highpinCB, 8);
  ledcAttachPin(lowpinAB, 9);
  ledcAttachPin(lowpinBB, 10);
  ledcAttachPin(lowpinCB, 11);
  ledcAttachPin(Voltage_Control_Pin,12);

  // Initialize PWM channels to 0
  ledcWrite(0, 0);
  ledcWrite(1, 0);
  ledcWrite(2, 0);
  ledcWrite(3, 0);
  ledcWrite(4, 0);
  ledcWrite(5, 0);
  ledcWrite(6, 0);
  ledcWrite(7, 0);
  ledcWrite(8, 0);
  ledcWrite(9, 0);
  ledcWrite(10, 0);
  ledcWrite(11, 0);
  rpm = 0;
}

void handleRoot() {
  server.send(200, "text/plain", "ESP32 Web Server");
}

void handleCommand() {

  if (server.hasArg("MaxCurrent") || server.hasArg("MaxTemp") || server.hasArg("MaxRpm") || server.hasArg("Frequency") || server.hasArg("MaxDutyCycle")) {

    parameter_counter += 1;

    if(parameter_counter == 5){
      parameter_flag = 1;
    }
    p_current = server.arg("MaxCurrent").toInt();
    p_temp = server.arg("MaxTemp").toInt();
    p_max_rpm = server.arg("MaxRpm").toInt();
    p_frequency = server.arg("Frequency").toInt();
    p_max_duty_cycle = server.arg("MaxDutyCycle").toInt();

    
    // Add code here to handle the command
    server.send(200, "text/plain", "Command received: 1");
  } else {
    server.send(400, "text/plain", "Bad Request");
  }
}

void loop() {

    
  server.handleClient();

if(parameter_flag){

  Serial.println("IN TRUE LOOP");

  if(micros() - lastTimeSwitching > delayLowerLimit){
  lastTimeSwitching = micros();
  if (i == 28 || i == 0 || i == 14) {
    
    duty = phase_al[i]  *dutyCycleUpperLimit;
    ledcWrite(3, duty);
    duty = phase_bl[i]  *dutyCycleUpperLimit;
    ledcWrite(4, duty);
    duty = phase_cl[i]*dutyCycleUpperLimit;
    ledcWrite(5, duty);
    
    duty =  phase_ah[i]*dutyCycleUpperLimit;
    ledcWrite(0, duty);
    duty = phase_bh[i]*dutyCycleUpperLimit;
    ledcWrite(1,duty);
    duty =phase_ch[i]*dutyCycleUpperLimit;
    ledcWrite(2, duty);

    duty = phase_alB[i]  *dutyCycleUpperLimit;
    ledcWrite(9, duty);
    duty = phase_blB[i]  *dutyCycleUpperLimit;
    ledcWrite(10, duty);
    duty = phase_clB[i]*dutyCycleUpperLimit;
    ledcWrite(11, duty);
    
    duty =  phase_ahB[i]*dutyCycleUpperLimit;
    ledcWrite(6, duty);
    duty = phase_bhB[i]*dutyCycleUpperLimit;
    ledcWrite(7,duty);
    duty =phase_chB[i]*dutyCycleUpperLimit;
    ledcWrite(8, duty);


  } else {

    duty =  phase_ah[i]*dutyCycleUpperLimit;
    ledcWrite(0, duty);
    duty = phase_bh[i]*dutyCycleUpperLimit;
    ledcWrite(1,duty);
    duty =phase_ch[i]*dutyCycleUpperLimit;
    ledcWrite(2, duty);


    duty = phase_al[i]  *dutyCycleUpperLimit;
    ledcWrite(3, duty);
    duty = phase_bl[i]  *dutyCycleUpperLimit;
    ledcWrite(4, duty);
    duty = phase_cl[i]*dutyCycleUpperLimit;
    ledcWrite(5, duty);



    duty =  phase_ahB[i]*dutyCycleUpperLimit;
    ledcWrite(6, duty);
    duty = phase_bhB[i]*dutyCycleUpperLimit;
    ledcWrite(7,duty);
    duty =phase_chB[i]*dutyCycleUpperLimit;
    ledcWrite(8, duty);


    duty = phase_alB[i]  *dutyCycleUpperLimit;
    ledcWrite(9, duty);
    duty = phase_blB[i]  *dutyCycleUpperLimit;
    ledcWrite(10, duty);
    duty = phase_clB[i]*dutyCycleUpperLimit;
    ledcWrite(11, duty);
  }
  
  i += 1;
  i = i % 36;
  //Serial.println(rpm);
}


  

// code for the input button to increase the frequency with debouncing
if(millis()-lastReadTime > 50){
  lastReadTime = millis();
  reading = digitalRead(button);
  if(reading == HIGH && lastState == LOW){
    //do what you wanna do 
    digitalWrite(ledpin,!digitalRead(ledpin));
    dutyCycleUpperLimitAbsolute = dutyCycleUpperLimitAbsolute - 10;
  }
  lastState = reading;
}


if(digitalRead(rpm_measure_pin)){

  rpm_counter += 1;

}


if(millis()-rpm_sensor_time >= 1000){

  measured_rpm = (rpm_counter/8)*60;

  rpm_sensor_time = millis();

}






  // code for the input button to decrease the frequency with debouncing
if(millis()-lastReadTime1 > 50){
  lastReadTime1 = millis();
  reading1 = digitalRead(button1);
  if(reading1 == LOW && lastState1 == HIGH){
    //do what you wanna do 
    digitalWrite(ledpin,!digitalRead(ledpin));
    dutyCycleUpperLimitAbsolute = dutyCycleUpperLimitAbsolute + 10;
  }
    lastState1 = reading1;
}

  // code for the input button2 to increase the rpm with debouncing
if(millis()-lastReadTime2 > 50){
  lastReadTime2 = millis();
  reading2 = digitalRead(button2);
  if(reading2 == LOW && lastState2 == HIGH){
    //do what you wanna do 
    digitalWrite(ledpin,!digitalRead(ledpin));
    rpm = rpm + 10 ;
  }
    lastState2 = reading2;
}



  sensorValue = analogRead(analogInPin); // Read the analog voltage
  sensorValue = max(0,sensorValue);
  rpm = (sensorValue - 950)/20 + 1;
  rpm = max(0,rpm);
  rpm = rpm - rpm%5;
  rpm = min(rpm,maxRpm);

  //if( (dutyCycleUpperLimit + 25 > dutyCycleUpperLimitAbsolute) && (dutyCycleUpperLimit - 25 < dutyCycleUpperLimitAbsolute)){
  if (rpm > 4){

    if (millis() - lastRpmChangeTime > 50){
      lastRpmChangeTime = millis();
      delayLowerLimit = 208000/rpm;
    }
  delayLowerLimit = 208000/rpm;
  
  if(millis()-lastDutyIncrementTime > 10){
  lastDutyIncrementTime = millis();
  if(dutyCycleUpperLimit == 0){
    dutyCycleUpperLimit = dutyCycleUpperLimit + 500;  
  }
  dutyCycleUpperLimit = dutyCycleUpperLimit + 10;
  dutyCycleUpperLimit = min(dutyCycleUpperLimit,dutyCycleUpperLimitAbsolute);
  }

}else{
    rpm = 0;
    dutyCycleUpperLimit = 0;
  }
  //}  

 // Serial.println(sensorValue);
 // Serial.println(rpm);
  //  Serial.println(dutyCycleUpperLimit);
 // Serial.println(dutyCycleUpperLimit);
  // get the ADC value from the temperature sensor
int adcVal = analogRead(PIN_LM35);
// convert the ADC value to voltage in millivolt
float milliVolt = adcVal * (ADC_VREF_mV / ADC_RESOLUTION);
// convert the voltage to the temperature in Celsius
tempC = milliVolt / 10;

if(tempC < 0){

  tempC = 0;

}
// convert the Celsius to Fahrenheit
float tempF = tempC * 9 / 5 + 32;


int adc_current = analogRead(PIN_CURRENT);
float milliVolts = adc_current * (ADC_VREF_mV / ADC_RESOLUTION);
current = (milliVolts - 1657)/40;

if(current < 0){
  current = 0;
}


// print the temperature in the Serial Monitor:
//Serial.print("Temperature: ");
//Serial.print(tempC); // print the temperature in Celsius
//Serial.print("°C");


if(delayLowerLimit < 1000){
  ttime = delayLowerLimit -  (micros()-lastTimeSwitching) ;
  if(ttime < 80){
    delayMicroseconds(ttime);
  }
  
}


if(millis() - printTime >= 2000){

  print_values();
  printTime = millis();
}


}

else{

  Serial.println("IN FALSE LOOP");

  if(millis() - printTime >= 2000){

  print_values();
  printTime = millis();
}

}


  

}



void print_values(){

  Serial.println("-----------------------------------------------------");
  Serial.println("INPUT TO THE CONTROLLER");
  Serial.println("-----------------------------------------------------");

  Serial.print("Input RPM = ");
  Serial.print(rpm);

  Serial.print('\n');

  Serial.print("Input Duty Cycle = ");
  Serial.print(dutyCycleUpperLimit);

  Serial.print('\n');

  Serial.print("Max Duty Cycle = ");
  Serial.print(dutyCycleUpperLimitAbsolute);

  Serial.print('\n');

  Serial.print("Max RPM = ");
  Serial.print(maxRpm);

    Serial.print('\n');


  Serial.print("Max Current = ");
  Serial.print(max_current);


  Serial.print('\n');

  Serial.print("Input PWM Frequency = ");
  Serial.print(frequency);

    Serial.print('\n');


  Serial.println("-----------------------------------------------------");

  Serial.println("-----------------------------------------------------");
  Serial.println("OUTPUT FROM THE MOTOR");
  Serial.println("-----------------------------------------------------");

  Serial.print("Measured RPM = ");
  Serial.print(measured_rpm);

    Serial.print('\n');

  Serial.print("Temperature = ");
  Serial.print(tempC);

    Serial.print('\n');

  Serial.print("Current = ");
  Serial.print(current);

    Serial.print('\n');

  Serial.println("-----------------------------------------------------");

  Serial.println("-----------------------------------------------------");
  Serial.println("SIGNAL FROM THE COMPUTER");
  Serial.println("-----------------------------------------------------");

  Serial.print("Paremeter Max Current =");
  Serial.print(p_current);

  Serial.print("\n");


  Serial.print("Paremeter Max Temperature =");
  Serial.print(p_temp);

  Serial.print("\n");


  Serial.print("Paremeter Max Duty Cycle =");
  Serial.print(p_max_duty_cycle);

  Serial.print("\n");

      
  Serial.print("Paremeter Frequency =");
  Serial.print(p_frequency);

  Serial.print("\n");


  Serial.print("Paremeter Max RPM =");
  Serial.print(p_max_rpm);

  Serial.print("\n");

  dutyCycleUpperLimitAbsolute = p_max_duty_cycle;
  maxRpm = p_max_rpm;
  max_current = p_current;
  max_temp = p_temp;
  frequency = p_frequency;


  
  
  


  
}