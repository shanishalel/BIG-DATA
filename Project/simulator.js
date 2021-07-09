const kafkaProduce=require('./kafkaProduce');


/*
every event will include : 
type event(enter the road, enter section, exit the road and exit section)
section of the road
type of the car(private, van, truck)
day in the week
time
if it is a special day (hollyday)
*/
module.exports.DataMaker= function (kafka) 
{
    for (let i = 0; i < 10; i++)
    {
        var event= {};
        /**event type- 4 types :
         * 1-enter the road
         * 2-enter section
         * 3-exit the road
         * 4-exit section**/
        event.Type = Math.floor(Math.random() * 4) + 1;
        //section id from 1 to 5
        event.Section = Math.floor(Math.random() * 5) + 1;
        //type of the car- private, truck, van 
        let Cars=["Private","Truck","Van"]
        location=Math.floor(Math.random() * 3) + 0;
        event.CarType = Cars[location]; 
        //day from 1 to 7 
        event.Day = Math.floor(Math.random() * 8) + 1; 
        //time
        const StartDate=new Date('July 20, 69 00:20:18 GMT+00:00');
        const EndDate=new Date('July 20, 22 00:20:18 GMT+00:00');
        const date=new Date(StartDate.getTime() + Math.random() * (EndDate.getTime() - StartDate.getTime()));
        event.Time = date.toLocaleTimeString();
        //if this day is special-true/false
        location_1=Math.floor(Math.random() * 2) + 0;
        let bool=[true,false]
        event.IsSpecial = bool[location_1];
        //publish to kafka by the publish function in kafkaProduce
        kafkaProduce.publish(event)
    }
}