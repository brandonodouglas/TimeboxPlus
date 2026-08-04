import { useState, useEffect } from 'react'

import { Text, View, StyleSheet, Button } from 'react-native'
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";




type StopwatchProps = {
    label: string;
    isCountUp: boolean;


};
export default function Stopwatch(props: StopwatchProps) {
    // Click counte for referencing timer states
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerPaused, setTimerPaused] = useState(false);
    const [timerReset, setTimerReset] = useState(false);
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    // Used to keep track of the seconds value in the react state
    let tempSeconds = 0;
    let tempMinutes = 0;
    let tempHours = 0;
    // Pads the stopwatch values
    const [paddingSeconds, setPaddingSeconds] = useState("0")
    const [paddingMinutes, setPaddingMinutes] = useState("0")
    const [paddingHours, setPaddingHours] = useState("0")
    function startTimer() {
        setTimerRunning(true)

    }

    function pauseTimer() {
        setTimerPaused(true)
        setTimerRunning(false)
    }

    function resetTimer() {
        setTimerPaused(false)
        setTimerRunning(false)
        setTimerReset(true)
        setSeconds(0)
        setMinutes(0)
        setHours(0)
        setPaddingSeconds("0")
        setPaddingMinutes("0")
        setPaddingHours("0")
        tempSeconds = 0;
        tempMinutes = 0;
        tempHours = 0;
    }

    useEffect(() => {
        if (timerRunning) {
            const interval = setInterval(() => {

                setSeconds(seconds => seconds + 1)
                if (tempSeconds == 0) {
                    setPaddingSeconds("0")
                }
                if (tempMinutes == 0) {
                    setPaddingMinutes("0")
                }
                if (tempHours == 0) {
                    setPaddingHours("0")
                }
                tempSeconds += 1
                if (!(tempSeconds >= 0 && tempSeconds <= 9)) {
                    setPaddingSeconds("")
                } else {
                    setPaddingSeconds("0")
                }
                if (!(tempMinutes >= 0 && tempMinutes <= 9)) {
                    setPaddingMinutes("")
                } else {
                    setPaddingMinutes("0")
                }
                if (!(tempHours >= 0 && tempHours <= 9)) {
                    setPaddingHours("")
                } else {
                    setPaddingHours("0")
                }
                // Ajust the seconds, minutes and hours based on stopwatch metadata
                if (tempSeconds % 60 == 0 && tempSeconds !== 0) {
                    setPaddingSeconds("0")
                    tempMinutes += 1;
                    setMinutes(minutes => minutes + 1)
                    setSeconds(0)
                    tempSeconds = 0

                }
                if (tempMinutes % 60 == 0 && tempMinutes !== 0) {
                    setPaddingMinutes("0")
                    tempHours += 1
                    tempMinutes = 0
                    setSeconds(0)
                    tempSeconds = 0
                    setMinutes(0)
                    setHours(hours => hours + 1)
                }
                if (tempHours == 99) {
                    // Reset the timer values
                    setSeconds(0)
                    let tempSeconds = 0;
                    setMinutes(0)
                    let tempMinutes = 0;
                    setHours(0)
                    let tempHours = 0;
                    clearInterval(interval)
                }
            }, 1000);
            return () => clearInterval(interval)
        }
    }, [timerRunning, timerPaused, timerReset]);

    // If the timer is a count up timer
    if (props.isCountUp) {
        if (!timerRunning && !timerPaused && !timerReset) {
            return (<View style={styles.container}><Text style={styles.title}>{props.label}</Text><Text style={styles.title}>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}{'\n'}<Button title="START" onPress={startTimer} ></Button><Button title="CUSTOM TIMER"></Button></Text></View>);
        }
        if (timerPaused && timerRunning == false) {
            return (<View style={styles.container}><Text style={styles.title}>{props.label}</Text><Text style={styles.title}>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}{'\n'}<Button title="START" onPress={startTimer}></Button><Button title="RESET" onPress={resetTimer}></Button></Text></View>);
        }
        if (timerRunning) {
            return (<View style={styles.container}><Text style={styles.title}>{props.label}</Text><Text style={styles.title}>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}{'\n'}<Button title="PAUSE" onPress={pauseTimer}></Button><Button title="RESET" onPress={resetTimer} ></Button></Text></View>);
        }
        if (timerReset && !timerPaused && !timerRunning) {
            return (<View style={styles.container}><Text style={styles.title}>{props.label}</Text><Text style={styles.title}>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}{'\n'}<Button title="START" onPress={startTimer}></Button></Text></View>);
        }

    } else {
        // Count down timer goes here
    }


}


const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 'auto',
        backgroundColor: 'orange',
        borderColor: 'black',
        borderStyle: 'dotted',
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 20,
        color: '#37352F',
        fontFamily: 'System',
        fontWeight: '800'
    },
    subheading: {
        color: '#787774',
    },
    subheading2: {
        color: '#787774',
    },
    text: {
        color: '#black',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})
