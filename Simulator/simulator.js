const kafkaProduce=require('../Kafka/kafkaProduce');


module.exports.DataMaker= function () {
    for (let i = 0; i < 10; i++) {
        var event = {}; // event={} is an empty object 
        
        var type = ["Enter Section","Enter Road","Exit Section","Exit road"]
        choose_section = Math.floor(Math.random() * 6) + 1; // Enter road from 1 to 5 
        event.Type = "Enter Road";
        event.Section = choose_section;


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

        //publish to kafka by the publish function in kafkaProduce
        kafkaProduce.publish(event); // send the event to kafka producer

        
       
        // Enter Section = 0
        // Exit road = 1
         location1 = Math.floor(Math.random() * 2); // Returns a random integer from 0 to 1
        if(location1 == 0) {
            while(location1!= 1) {  // Enter Section case

                event.Type = "Enter Section";
 
                location2 = Math.floor(Math.random() * 2) ; // Returns a random integer from 0 to 1
                if (location2 == 0) { // 0 is "before"
                    enter_section = choose_section - 1;
                    event.Section = enter_section;
                    kafkaProduce.publish(event);

                    event.Type = "Exit Section";
                    kafkaProduce.publish(event);      
                }
                else { // 1 is "after"
                    enter_section = choose_section + 1;
                    event.Section = enter_section;
                    kafkaProduce.publish(event);

                    event.Type = "Exit Section";
                    kafkaProduce.publish(event);
                }

                location1 = Math.floor(Math.random() * 2); // Returns a random integer from 0 to 1
                if(location1 == 1) {
                    event.Type= "Exit road";
                    kafkaProduce.publish(event);
                }
            }
        }

        else { // Exit road case in the first time

            event.Type = "Exit road";
            event.Section = choose_section;
        }

        
            //publish to kafka by the publish function in kafkaProduce
            kafkaProduce.publish(event) // send the event to kafka producer
     
    }
}