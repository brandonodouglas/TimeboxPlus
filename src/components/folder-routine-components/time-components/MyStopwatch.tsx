import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { useState } from 'react';
import { Text, View } from 'react-native';




export default function MyStopwatch() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const [paddingSeconds, setPaddingSeconds] = useState('0');
    const [paddingMinutes, setPaddingMinutes] = useState('0');
    const [paddingHours, setPaddingHours] = useState('0');
    return (
        <View>
                <Text>{paddingHours}{hours}:{paddingMinutes}{minutes}:{paddingSeconds}{seconds}</Text>
                <MaterialIcons name="play-arrow" size={30} color="#007AFF" />


        </View>
        
    )
}