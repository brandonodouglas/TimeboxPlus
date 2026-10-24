import { notionStyle } from '@/app/mystyles/notionStyle';
import React from 'react';
import { TextInput, View } from 'react-native';




export default function TimerHandler() {
    return(<View>
             <TextInput style={notionStyle.input} placeholder="Enter your task here" />


    </View>)
}