# BIG-DATA

This is a project in a BigData course at Ariel University, the project was written by Shani Shalal, Yarden Cohen and Shirel Israelov.

In the project we simulate an entrance simulator for the exit to road 6, where the road is divided into 5 sections.
In each section we count the number of cars it has and for each car we find a function that predicts in which section it came out.


We use the MangoDB-Atlas database to store the car record, while saving the data: event type(enter/exit from road),
Car Type (private/van/truck), event day,  event time, IsSpecial-thaet present if it is a special-day(e.g Holiday) 
and section-represents the section number to which the car is located ,and we use this data to predic in BigMl.

We use BigMl to predic in which section the given car would exit , in the gevin data car-type, is-spaecial day,day, event type,which sectuon did he enter,
and  which section he is in the givrn time.


