const kafkaProduce=require('../Kafka/kafkaProduce');

module.exports.DataMaker=function(){
    setInterval(my,1000); 
};


function my() {
        var event = {}; // event={} is an empty object 
        
        
        event.Type = "Enter Road";

        // Type of the car - private, truck, van 
        let car_types = ["Private", "Truck", "Van"]
        location3 = Math.floor(Math.random() * 3);
        event.CarType = car_types[location3]; 

        // Day week 
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        location4 = Math.floor(Math.random() * 7);
        event.Day = days[location4]; 

        // Time
        const StartDate = new Date('July 20, 69 00:20:18 GMT+00:00');
        const EndDate = new Date('July 20, 22 00:20:18 GMT+00:00');
        const date = new Date(StartDate.getTime() + Math.random() * (EndDate.getTime() - StartDate.getTime()));
        event.Time = date.toLocaleTimeString();

        // If it is a special day - true/ false
        location5 = Math.floor(Math.random() * 2);
        let bool = [true,false]
        event.IsSpecial = bool[location5];

        choose_section = Math.floor(Math.random() * 5) + 1; // Enter road from 1 to 5 
        event.enter_section=choose_section;
        event.Section = choose_section;

        


        // console.log(event);
        //publish to kafka by the publish function in kafkaProduce
        kafkaProduce.publish(event); // send the event to kafka producer

        event.Type = "Enter Section";

        


        
        // console.log(event);

        

        kafkaProduce.publish(event); 


        // Enter Section = 0
        // Exit road = 1
         location1 = Math.floor(Math.random() * 2); // Returns a random integer from 0 to 1
        if(location1 == 0) {

            while(location1!= 1) {  // Enter Section case             

                location2 = Math.floor(Math.random() * 2) ; // Returns a random integer from 0 to 1
                if (location2 == 0) { // 0 is "before"
                   if(event.Section != 1) {
                        event.Type = "Enter Section";
                        enter_section = event.Section - 1;
                        event.Section = enter_section;
                        // console.log(event);
                        kafkaProduce.publish(event);

                        event.Type = "Exit Section";
                        // console.log(event);
                        kafkaProduce.publish(event);      
                    }
                }
                else { // 1 is "after"
                    if(event.Section != 5) {
                         
                        event.Type = "Enter Section";
                        enter_section = event.Section + 1;
                        event.Section = enter_section;
                        // console.log(event);
                        kafkaProduce.publish(event);
    
                        event.Type = "Exit Section";
                        // console.log(event);
                        kafkaProduce.publish(event);
                    }  
                }

                location1 = Math.floor(Math.random() * 2); // Returns a random integer from 0 to 1
                if(location1 == 1) {
                    event.Type= "Exit road";  
                    // console.log(event);
                    kafkaProduce.publish(event);
                }
            }
        }

        else { // Exit road case in the first time
            event.Type = "Exit Section";
            //publish to kafka by the publish function in kafkaProduce
            // console.log(event);
            kafkaProduce.publish(event) // send the event to kafka producer

            event.Type = "Exit road";
            //publish to kafka by the publish function in kafkaProduce
            // console.log(event);
            kafkaProduce.publish(event) // send the event to kafka producer
     
        }
    }
