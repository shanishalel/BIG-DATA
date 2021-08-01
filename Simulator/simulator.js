const kafkaProduce=require('../Kafka/kafkaProduce');


module.exports.DataMaker= function () {
    for (let i = 0; i < 10; i++) {
        var event = {}; // event={} is an empty object 
        enter_road =  Math.floor(Math.random() * 6) + 1; // Enter road from 1 to 5 
        event.Enter_Road = enter_road
        
        let next_step = ["Enter Section","Exit road"]
       
        // Enter Section = 0
        // Exit road = 1
        location1 = Math.floor(Math.random() * 2); // Returns a random integer from 0 to 1
        if(location1 == 0) {
            while(location1!= 1) {  // Enter Section case
                let which_section = ["before","after"]
                location2 = Math.floor(Math.random() * 2) ; // Returns a random integer from 0 to 1
                if (location2 == 0) { // 0 is "before"
                    enter_section = enter_road - 1;
                    event.Enter_Section = enter_section;
                    event.Exit_Section = enter_section;
            }
                else { // 1 is "after"
                    enter_section = enter_road + 1;
                    event.Enter_Section = enter_section;
                    event.Exit_Section = enter_section;
            }

                location1 = Math.floor(Math.random() * 2); // Returns a random integer from 0 to 1
                if(location1 == 1) {
                    event.Exit_Road = enter_section;
                }
            }
        }

        else { // Exit road case in the first time
            event.Exit_Road = enter_road;
            event.Enter_Section = null;
            event.Exit_Section = null;
        }
         
        // Type of the car - private, truck, van 
        let car_types = ["Private", "Truck", "Van"]
        location3 = Math.floor(Math.random() * 3);
        event.Car_Type = car_types[location3]; 

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
        event.Is_Special = bool[location5];

        //publish to kafka by the publish function in kafkaProduce
        kafkaProduce.publish(event) // send the event to kafka producer
    }
}