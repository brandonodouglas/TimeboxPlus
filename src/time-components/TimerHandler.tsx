import { notionStyle } from '@/app/mystyles/notionStyle';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';




export default function TimerHandler() {

    const [timerCount, setTimerCount] = useState(0);
    return (<View>
        <Text>You currently have {timerCount} tasks logged!</Text>
        <TextInput style={notionStyle.input} placeholder="Enter your task here" />
    </View>)
}