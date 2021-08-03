# BIG-DATA

This is a project in a BigData course at Ariel University, the project was written by Shani Shalal, Yarden Cohen and Shirel Israelov.

In the project we simulate an entrance simulator for the exit to road 6, where the road is divided into 5 sections.
In each section we count the number of cars it has and for each car we find a function that predicts in which section it came out.

We have created a simulator that grills the following data- 
* Type (enter/exit from road, enter/exit section)
* Car Type (private/van/truck)
* Day
* Time
* Special-day(e.g Holiday)
* Section
  
Each event is delivered directly to kafka produce who is responsible for routing the events to the appropriate Topic.
kafka consume transmits the events received from kafka produce to each of the DBs detailed below.

We use the MangoDB-Atlas database to store the car record, while saving the data: event type(enter/exit from road, enter/exit section),
Car Type (private/van/truck), event day,  event time, IsSpecial-thaet present if it is a special-day(e.g Holiday) 
and section-represents the section number to which the car is located ,and we use this data to predic in BigMl.

We use BigMl to predic which section of a given car will be exit , in the gevin data car-type, is-spaecial day,day, event type,which sectuon did he enter,
and  which section he is in the givrn time.
We create confusion matrix that count the Predicting successes against actual cars exits.
 

We used Redis DB to store the events, this DB use to present the numbers of cars in each section in the dashboard.
The Redis divided into two class- 
The first is responsible for storing the data within the DB while the second is responsible for retrieving the information which we displayed this data in real time.

In the end, all the data is displayed on an HTML web page that shows the end result of the project.

**Diagram showing technological mapping of the system:

![‏‏צילום מסך (216)](https://user-images.githubusercontent.com/57362284/127979586-5fc80760-d401-42a4-a083-8a08aa9041ce.png)



