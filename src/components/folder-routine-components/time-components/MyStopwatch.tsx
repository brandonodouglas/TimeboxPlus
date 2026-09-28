import { notionStyle } from "@/app/mystyles/notionStyle";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';

export default function MyStopwatch() {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const [paddingSeconds, setPaddingSeconds] = useState('0');
    const [paddingMinutes, setPaddingMinutes] = useState('0');
    const [paddingHours, setPaddingHours] = useState('0');

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerReset, setTimerReset] = useState(false)
    const [timerPaused, setTimerPaused] = useState(false)

    const [timerID, setTimerID] = useState(0);

    function startTimer(event: GestureResponderEvent): void {
        setSeconds(0)
        setMinutes(0)
        setHours(0)
        setPaddingSeconds('0')
        setPaddingMinutes('0')
        setPaddingHours('0')
        
        console.log("Timer started.")
        setTimerStarted(true)
        let tempSeconds = 0;
        let tempMinutes = 0;
        let tempHours = 0;
        let myTimerId = setInterval(() => {
            setSeconds((seconds) => seconds + 1)
            tempSeconds = tempSeconds + 1;
            console.log(tempSeconds)
            if (tempSeconds > 9) {
                setPaddingSeconds('')

            }
            if (tempSeconds > 59) {
                setMinutes((minutes) => minutes + 1)
                setSeconds(0)
                setPaddingSeconds('0')
                tempSeconds = 0
            }
            
            if (tempMinutes > 9) {
                setPaddingMinutes('');
            }
            if (tempMinutes > 59) {
                setHours((hours) => hours + 1)
                setMinutes(0)
                setPaddingMinutes('0')
                tempMinutes = 0
            }

            if (tempHours > 9) {
                setPaddingHours('')
            }
           
            
        }, 1000)
        setTimerID(myTimerId)
        

        
    }

    function resetTimer(event: GestureResponderEvent): void {
        setTimerReset(true)
        console.log("Timer reset.")
        clearInterval(timerID)
        setTimerStarted(false)
        setTimerPaused(false)
         setSeconds(0)
        setMinutes(0)
        setHours(0)
        setPaddingSeconds('0')
        setPaddingMinutes('0')
        setPaddingHours('0')
    }

    function continueTimer(event: GestureResponderEvent): void {
        console.log("Continuing timer")
        setTimerStarted(true)
        setTimerPaused(false)
         let tempSeconds = 0;
        let tempMinutes = 0;
        let tempHours = 0;
        let myTimerId = setInterval(() => {
            setSeconds((seconds) => seconds + 1)
            tempSeconds = tempSeconds + 1;
            console.log(tempSeconds)
            if (tempSeconds > 9) {
                setPaddingSeconds('')

            }
            if (tempSeconds > 59) {
                setMinutes((minutes) => minutes + 1)
                setSeconds(0)
                setPaddingSeconds('0')
                tempSeconds = 0
            }
            
            if (tempMinutes > 9) {
                setPaddingMinutes('');
            }
            if (tempMinutes > 59) {
                setHours((hours) => hours + 1)
                setMinutes(0)
                setPaddingMinutes('0')
                tempMinutes = 0
            }

            if (tempHours > 9) {
                setPaddingHours('')
            }
           
            
        }, 1000)
        setTimerID(myTimerId)
    }


    function pauseTimer(event: GestureResponderEvent): void {
        console.log("Timer paused")
        clearInterval(timerID)
        setTimerPaused(true)
    }

    

    if (timerPaused) {
        return (
            <View style={styles.container}>
                <Text style={notionStyle.timerText}>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}</Text>
                <MaterialIcons name="play-arrow" size={25} color="#007AFF" style={styles.iconStyle} onPress={continueTimer} />
                <MaterialIcons name="replay" size={25} color="#007AFF" style={styles.iconStyle} onPress={resetTimer} />
            </View>
        )
    } else {
        // Initially when the timer starts it just displays an empty string
        if (!timerStarted) {
            return (
                <View style={styles.container}>
                    <Text style={notionStyle.timerText}>00:00:00</Text>
                    <MaterialIcons name="play-arrow" size={25} color="#007AFF" style={styles.iconStyle} onPress={startTimer} />
                </View>
            )
        }
        if (timerStarted) {
            return (
                <View style={styles.container}>
                    <Text style={notionStyle.timerText}>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}</Text>
                    <MaterialIcons name="pause" size={25} color="#007AFF" style={styles.iconStyle} onPress={pauseTimer} />
                    <MaterialIcons name="replay" size={25} color="#007AFF" style={styles.iconStyle} onPress={resetTimer} />
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