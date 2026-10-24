
import TimerHandler from '@/time-components/TimerHandler';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { notionStyle } from './mystyles/notionStyle';




export default function App() {

  return (
    <SQLiteProvider databaseName="app.db" onInit={initializeDatabase}>
      <MainApp />
    </SQLiteProvider>

  );


}

async function initializeDatabase(db: any) {
  await db.execAsync(`
  CREATE TABLE IF NOT EXISTS user_info (id INTEGER PRIMARY KEY NOT NULL,
  username TEXT NOT NULL);
  `);
}



export function MainApp() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('')
  const [showHomePage, setShowHomePage] = useState(false)

  // Database related stuff
  const db = useSQLiteContext();
  const [usernameDB, setUserNameDB] = useState('');

  // Here, load start page.
  useEffect(() => {
    loadUsernameFromDb();


  }, []);




  async function loadUsernameFromDb() {
    // gets the first row, if user has entered a username locally before
    try {
      const result: any = await db.getFirstAsync('SELECT * FROM user_info');
      console.log(result.username + ' has been pulled from the database.')
      setUserNameDB(result.username)
      setShowHomePage(true)

    } catch (error) {
      console.log(error + ' unable to get username from database. Perhaps its the first time the user has used the app locally or database to big ...?')
      clearDatabase(db)
      setShowHomePage(false)
    }

  }

  async function addUsername(db: any, name: string) {
    // only add a username if the database has a length of 0
    // otherwise do nothing
    console.log('Attempting to add name: ' + name + ' to the database');
    try {
      const result = await db.runAsync(
        'INSERT INTO user_info (username) VALUES (?)', name);
      setShowHomePage(true)

    } catch (error) {
      console.log('Database error is: ' + error)
    }


  }

  async function clearDatabase(db: any) {
    console.log("Attempting to clear database");
    try {
      let response = await db.getAllAsync(
        'DELETE FROM user_info WHERE id > 0'
      )
      console.log("The contents of the database (after deletion) is: " + response);
      console.log("The databse has a length of: " + response.length())
    } catch (err) {
      console.log(err)
    }
  }


  const handlePress = () => {

    addUsername(db, name)






  };

  const handlePressDbReset = () => {
    clearDatabase(db)



  }

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
    loadUsernameFromDb()
    console.log("Username is: " + usernameDB)



    return (
      <View style={notionStyle.page}>
        <Text style={notionStyle.title}>Welcome, {usernameDB}</Text>
        <Text style={notionStyle.blockText}>You currently have 0 timers.</Text>
        <Text style={notionStyle.blockText}>Try adding some below!</Text>

        <TimerHandler />
        <TouchableOpacity style={notionStyle.button} onPress={handlePressDbReset}><Text style={notionStyle.whiteText}>reset database</Text></TouchableOpacity>

      </View>)
  }



}

