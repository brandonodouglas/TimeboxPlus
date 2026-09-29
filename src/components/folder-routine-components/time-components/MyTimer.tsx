
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


type TimerProps = {
    hours: number,
    minutes: number,
    seconds: number,
}


export default function MyTimer(props: TimerProps) {
    const [seconds, setSeconds] = useState(props.seconds);
    const [minutes, setMinutes] = useState(props.minutes);
    const [hours, setHours] = useState(props.hours);

    const [paddingSeconds, setPaddingSeconds] = useState('0');
    const [paddingMinutes, setPaddingMinutes] = useState('0');
    const [paddingHours, setPaddingHours] = useState('0');

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerReset, setTimerReset] = useState(false)
    const [timerPaused, setTimerPaused] = useState(false)

    const [timerID, setTimerID] = useState(0);

    // Helper function that converts seconds




    function startTimer() {

        let tempSecondsTest = 0;


        // Base case
        if (props.hours == 0 && props.minutes == 0 && props.seconds == 0) {
            return (
                <View>
                    <Text>00:00:00</Text>
                </View>
            )

        }

        

        if (props.hours <= 23 && props.minutes <=59 && props.seconds <= 59) {
            let tempSeconds = props.seconds;
            let tempMinutes = props.minutes;
            let tempHours = props.hours;
            let myTimerId = setInterval(() => {
                // Handles 59 secs
              //  setSeconds((seconds) => seconds - 1)
                //tempSeconds = tempSeconds - 1
                //console.log(tempSeconds)

                    tempSeconds = tempSeconds - 1
                    setSeconds((seconds) => seconds - 1)
                    console.log(tempSeconds);
                    if (tempSeconds <= -1) {
                        setSeconds(59)
                        tempSeconds = 59
                        tempMinutes = tempMinutes -1
                        setMinutes((minutes) => minutes -1)
                    }
                    if (tempMinutes <=-1) {
                        setMinutes(59)
                        tempMinutes = 59
                        tempHours = tempHours - 1
                        setHours((hours) => hours - 1)

                    }

                    
                   

                
                // Makes the countdown timer stops at zero 
                if (tempSeconds == 0 && tempMinutes == 0 && tempHours == 0) {
                    clearInterval(myTimerId)
                }
            }, 1000)

        }

       

        /*

        if (props.minutes == 1 && seconds == 0) {
            setSeconds(59)
            setMinutes(0)
        } else {
            setSeconds(props.seconds)
            setMinutes(props.minutes)
        }

        setHours(props.hours)
        console.log("Starting countdown timer")
        setTimerStarted(true)
        let tempSeconds = props.seconds
        let tempMinutes = props.minutes
        let tempHours = props.hours

        // Convert time to miliseconds
        let hoursToSeconds = props.hours * 3600;
        let minutesToSeconds = props.minutes * 60
        let countdown = (hoursToSeconds + minutesToSeconds + props.seconds)
        let tempCountdown = countdown;

        // If statements for time parsing



        // Conversion stuff
        // Start with 59 seconds, then one minute (60 seconds), then 5 minutes, etc


        let myTimerId = setInterval(() => {



            // Handles 59 secs
            setSeconds((seconds) => seconds - 1)
            tempCountdown = tempCountdown - 1
            console.log(tempCountdown)
            // Makes the countdown timer stops at zero 
            if (tempCountdown == 0) {
                clearInterval(myTimerId)
            }



        }, 1000)
        setTimerID(myTimerId)
        */

    }

    return (
        <View style={styles.container}>
            <Text>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}</Text>
            <MaterialIcons name="play-arrow" size={25} color="#007AFF" style={styles.iconStyle} onPress={startTimer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 2,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        textAlign: 'center'
    }
});