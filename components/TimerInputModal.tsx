import React, { useState } from 'react'
import { Text, View, StyleSheet, Button, Modal } from 'react-native';

type TimeInputModalProps = {
    label: string;
    secondsToCountDownFrom: number
}

export default function TimerInputModal(props: TimeInputModalProps) {
    const [show, setShow] = useState(false);

    return (<View><Text>This is time input modal.</Text></View>);
} 