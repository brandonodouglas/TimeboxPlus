
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { notionStyle } from './mystyles/notionStyle';






export default function Tab() {


  const [name, setName] = useState('');
  const [userName, setUserName] = useState('')
  const [showHomePage, setShowHomePage] = useState(false)

  // Database related stuff

const handlePress = () => {

    setUserName(name);
    setShowHomePage(true)
  };

  if (!showHomePage) {
    return (
      <View style={notionStyle.page}>
        <Text style={notionStyle.title}>TimeboxPlus.</Text>
        <Text>⏰📦➕</Text>
        <Text style={notionStyle.blockText}>Productivity, simplified.</Text>
        <Text style={notionStyle.blockTextSmall}>Ready to get started? 🚀</Text>
        <TextInput
          style={notionStyle.input}
          placeholder='Enter your name here'
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={notionStyle.button} onPress={handlePress}><Text style={notionStyle.whiteText}>Continue</Text></TouchableOpacity>




      </View>
    );
  } else {
    return (<View style={notionStyle.page}><Text style={notionStyle.blockText}>Welcome, {userName}!</Text></View>)
  }



}