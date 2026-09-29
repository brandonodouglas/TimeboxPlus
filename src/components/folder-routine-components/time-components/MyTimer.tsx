
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';

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

    function continueTimer() {
        console.log("continuing timer")
        setTimerStarted(true)
        setTimerPaused(false)
         if (props.hours == 0 && props.minutes == 0 && props.seconds == 0) {
            return (
                <View>
                    <Text>00:00:00</Text>
                </View>
            )
        }

        if (props.hours <= 23 && props.minutes <= 59 && props.seconds <= 59) {
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
                    tempMinutes = tempMinutes - 1
                    setMinutes((minutes) => minutes - 1)
                }
                if (tempMinutes <= -1) {
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
            setTimerID(myTimerId)
        }

       

    }



    function pauseTimer(event: GestureResponderEvent): void {
        console.log("Timer paused")
        setTimerPaused(true)
        setTimerStarted(false)
        setTimerReset(false)
        clearInterval(timerID)
    }

    function resetTimer(event: GestureResponderEvent): void {
        console.log("timer reset")
        setTimerReset(true)
        clearInterval(timerID)
        setTimerStarted(false)
        setTimerPaused(false)
        setSeconds(props.seconds)
        setMinutes(props.minutes)
        setHours(props.hours)
    }
    // Helper function that converts seconds
    function startTimer() {
        setTimerStarted(true)
        let tempSecondsTest = 0;
        // Base case
        if (props.hours == 0 && props.minutes == 0 && props.seconds == 0) {
            return (
                <View>
                    <Text>00:00:00</Text>
                </View>
            )
        }

        if (props.hours <= 23 && props.minutes <= 59 && props.seconds <= 59) {
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
                    tempMinutes = tempMinutes - 1
                    setMinutes((minutes) => minutes - 1)
                }
                if (tempMinutes <= -1) {
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
            setTimerID(myTimerId)
        }
    }
    if (timerPaused) {
        return(
        <View style={styles.container}>
            <Text>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}</Text>
            <MaterialIcons name="play-arrow" size={25} color="#007AFF" style={styles.iconStyle} onPress={continueTimer} />
            <MaterialIcons name="replay" size={25} color="#007AFF" style={styles.iconStyle} onPress={resetTimer} />
        </View>
        )

    } else {
        if (timerStarted) {
            return (
                <View style={styles.container}>
                    <Text>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}</Text>
                    <MaterialIcons name="pause" size={25} color="#007AFF" style={styles.iconStyle} onPress={pauseTimer} />
                    <MaterialIcons name="replay" size={25} color="#007AFF" style={styles.iconStyle} onPress={resetTimer} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}</Text>
                    <MaterialIcons name="play-arrow" size={25} color="#007AFF" style={styles.iconStyle} onPress={startTimer} />
                </View>
            )
        }
    }
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

