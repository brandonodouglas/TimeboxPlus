import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { notionStyle } from './mystyles/notionStyle';




export default function Tab() {
  const [googleSignedInStatus, setGoogleSignedInStatus] = useState(false)
  const [googleAccountUserName, setGoogleAccountUserName] = useState('')
  

  GoogleSignin.configure({
    iosClientId: '1069392446627-qgok83dq08mdbconf3hqacsgu0g2i507.apps.googleusercontent.com',
  })
 



if (googleSignedInStatus == false) {
  return (
    <View style={notionStyle.page}>
      <Text style={notionStyle.title}>TimeboxPlus.</Text>
      <Text style={notionStyle.blockText}>Productivity, simplified</Text>
      <Text style={notionStyle.blockTextSmall}>Code by @brandonodouglas 2026.</Text>

      <View style={notionStyle.divider}></View>
      <Text style={notionStyle.blockTextSmall}>Ready to get started? Sign in below! 🚀</Text>
      
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            console.log("hello im trying")
            await GoogleSignin.hasPlayServices()
            const response = await GoogleSignin.signIn()
            if (isSuccessResponse(response)) {
              console.log("shit workedr")
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.data.idToken,
              })
              console.log(error, data)
              // Get full name from thedata response, use a js prettty printer for esponse dat
              console.log("Welcome: " + data.user?.user_metadata.full_name)
              setGoogleAccountUserName(data.user?.user_metadata.full_name)
              setGoogleSignedInStatus(true)
              
            
            } else {
              console.log("the response was unsuccessful for some reason")
            }
          } catch (error: any) {
            if (error.code === statusCodes.IN_PROGRESS) {
              console.log("in progress")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
              console.log("plays ervices not available")
            } else {
              // some other error happened
              console.log("some next error ting happened")
              console.log(error)
            }
          }
        }}
      />






    </View>
  );

} else {
  return (
    <View style={notionStyle.page}>
      <Text style={notionStyle.title}>Welcome, {googleAccountUserName}👋!</Text>
      <Text style={notionStyle.blockText}>Placeholder text to do with timers once the user is signed in via google or apple.</Text>

  </View>
  )
  
}
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',


    justifyContent: 'center',
    alignItems: 'center',
  },
});