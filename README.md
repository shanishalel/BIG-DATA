# BIG-DATA

This is a project in a BigData course at Ariel University, the project was written by Shani Shalal, Yarden Cohen and Shirel Israelov.

In this project we shows the traffic in all the 5 sections of road 6.  
In each section we count the number of cars it has, additionally we created a prediction model that based on previous data it learned,the model predicte the exit section of new cars.

We have created a simulator that grills the following data- 
* Type (enter/exit from road, enter/exit section)
* Car Type (private/van/truck)
* Day
* Time
* Special-day(e.g Holiday)
* Section
* Enter section
  
Each event is delivered directly to kafka produce who is responsible for routing the events to the appropriate Topic.
Kafka consume transmits the events received from kafka produce to each of the DBs detailed below.

We use MangoDB-Atlas DB to store cars data that specified above (Type (enter/exit from road, enter/exit section), Car Type (private/van/truck) ,Day, Time, Special-day(e.g Holiday) and Section), we use this data to make the prediction in BigMl.

In a given data car-type, is-spaecial day, day, event type, enter section and time we use BigMl to predic which section of a given car will be exit.
We create confusion matrix that count the Predicting successes against actual cars exits.
 
We used Redis DB to store the events, this DB use to present the numbers of cars in each section in the dashboard.
The Redis divided into two class- 
The first is responsible for storing the data within the DB while the second is responsible for retrieving the information which we displayed this data in real time.

In the end, all the data is displayed on an HTML web page that shows the end result of the project.

### Diagram showing technological mapping of the system:

![‏‏צילום מסך (216)](https://user-images.githubusercontent.com/57362284/127979586-5fc80760-d401-42a4-a083-8a08aa9041ce.png)



