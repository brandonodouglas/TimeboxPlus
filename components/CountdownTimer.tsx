import { useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';


// Label -> Timer text label
// secondsToCountDownFrom -> the starting value in seconds to count down from
type CountdownTimerProps = {
    label: string;
    secondsToCountDownFrom: number
}

export default function Stopwatch(props: CountdownTimerProps) {
    return (<p>Testing</p>);

}