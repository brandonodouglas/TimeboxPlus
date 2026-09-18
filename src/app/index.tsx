import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { notionStyle } from './mystyles/notionStyle';





export default function Tab() {
  const [googleSignedInStatus, setGoogleSignedInStatus] = useState(false)
  const [googleAccountUserName, setGoogleAccountUserName] = useState('')

  const [appleSignedInStatus, setAppleSignedInStatus] = useState(false)
  const [appleAccountUserName, setAppleAccountUserName] = useState('')


  GoogleSignin.configure({
    iosClientId: '1069392446627-qgok83dq08mdbconf3hqacsgu0g2i507.apps.googleusercontent.com',
  })




  if (googleSignedInStatus == false && appleSignedInStatus == false) {
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
                console.log("plays ervices not available")
              } else {
                console.log("some next error ting happened")
                console.log(error)
              }
            }
          }}
        />

        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 200, height: 64 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              })
              // Sign in via Supabase Auth.
              if (credential.identityToken) {
                const {
                  error,
                  data: { user },
                } = await supabase.auth.signInWithIdToken({
                  provider: 'apple',
                  token: credential.identityToken,
                })
                console.log(JSON.stringify({ error, user }, null, 2))
                if (!error) {
                  // Apple only provides the user's full name on the first sign-in
                  // Save it to user metadata if available
                  if (credential.fullName) {
                    const nameParts = []
                    if (credential.fullName.givenName) nameParts.push(credential.fullName.givenName)
                    if (credential.fullName.middleName) nameParts.push(credential.fullName.middleName)
                    if (credential.fullName.familyName) nameParts.push(credential.fullName.familyName)
                    const fullName = nameParts.join(' ')
                    await supabase.auth.updateUser({
                      data: {
                        full_name: fullName,
                        given_name: credential.fullName.givenName,
                        family_name: credential.fullName.familyName,
                      }
                    })
                  }
                  // User is signed in.
                  console.log("The user has successful signed in with apple.")
                  // Example: Handling full name after successful sign in
                  if (credential.fullName) {
                    // Full name is only provided on first sign-in
                    await supabase.auth.updateUser({
                      data: {
                        full_name: `${credential.fullName.givenName} ${credential.fullName.familyName}`,
                        given_name: credential.fullName.givenName,
                        family_name: credential.fullName.familyName,
                      },
                    })
                  }
                }
              } else {
                throw new Error('No identityToken.')
              }
            } catch (e) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
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
  button: {
    width: 200,
    height: 44,
  },
});