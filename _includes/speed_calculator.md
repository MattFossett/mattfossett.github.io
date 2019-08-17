## [Vehicle Speed Calculator](https://github.com/MattFossett/Vehicle-Speed-Calculator)

Small Java project designed to calculate the speed of an object given its length and the 
time taken to go from point A to B. 
This Object will also solve for any single unknown variable between length, time taken, and speed, specified with a -1.
This small project was started because my travel from Lancaster to Philadelphia
via Amtrak was very fascinating to me, so I had footage of passing trains and was curious of the speeds. 

### Example Case:
> A video taken from a fixed position shows a train passing. Wikipedia has the exact length of one of the train cars. The front of one of the train cars exits the screen, then 3 seconds later the back of that train car exits the screen. 
Now we have: Length, and seconds it took to move that length.

### Vehicle Object Constructor:
[Vehicle.java](https://github.com/MattFossett/Vehicle-Speed-Calculator/blob/master/Vehicle.java)
```java
/**
* Takes parameters and makes a vehicle object. 
* INVARIANT: 
* Vehicle will solve for ONE of these parameters. 
* If any ONE of these is <0, it will be assigned to its correct value. 
* 
* @param lengthInFeet 
* @param seconds
* @param MPH
*/
public Vehicle(double lengthInFeet, double seconds,double MPH){
    if(lengthInFeet<0 && seconds<0 || seconds < 0 && MPH < 0 ||
            lengthInFeet < 0 && MPH < 0){
        throw new IllegalArgumentException("Invalid Parameters");
    }
    this.length = lengthInFeet;
    this.seconds = seconds;
    this.speed = MPH;
    if(this.length < 0){
        this.length = 5280*(speed*seconds/3600);
    } else if (this.seconds <0){
        this.seconds = (length/5280)*speed;
    } else if(this.speed <0){
        this.speed = (this.length/5280)/(this.seconds/3600);
    }
}
```

### Driver Example
Here is an example using [VehicleDriver.java](https://github.com/MattFossett/Vehicle-Speed-Calculator/blob/master/VehicleDriver.java)

After taking a video of a passing train we can find that the length of a single car is [85.3 feet long](https://en.wikipedia.org/wiki/Amfleet). 
It takes 1.5 seconds from the time the front of the car leaves the screen to when the back of the car leaves the screen. 
We now have the 2 variables needed to see how fast that train was going. 

[Driver IO:](https://github.com/MattFossett/Vehicle-Speed-Calculator/blob/master/VehicleDriver.java)

```shell
Input the following format: "length_in_feet seconds mph"
  where one unknown value is -1 
85.3 
1.5
-1 
feet=85.3, seconds=1.5, MPH=38.77272727272727
```

Notice that it shows us how fast the train was going, **~38.8 MPH**. 
