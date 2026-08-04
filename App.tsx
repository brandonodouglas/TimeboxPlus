import { FlatList, StyleSheet, Text, View, TextInput, Button, TouchableHighlight, TextInputSubmitEditingEvent } from 'react-native'
import * as SQLite from 'expo-sqlite';
import { getDB } from './database/db';
import Stopwatch from './components/Stopwatch';
import { useState, useEffect } from 'react';



export default function App() {
  const [timer, setTimer] = useState("");
  const [name, setName] = useState("");
  const [dbdata, setDbData] = useState([]);
  const [showUserView, setShowUserView] = useState(false);



  useEffect(() => {
    async function setup() {
      const db = await getDB();
      console.log("Querying database")
      try {
        const result = await db.getAllAsync('SELECT * FROM USERS');
        for (const row of result) {
          setDbData(row.user_name)

        }
         if (result.length > 1) {
          await db.getAllAsync('DROP TABLE IF EXISTS USERS');
          console.log("Too many usernames in the database.")
        }
          if (result.length < 1) {
        setShowUserView(false)
        console.log("The database is empty")
      } else {
        setShowUserView(true)
        console.log("huh")
      }

      } catch (e) {
        console.log("database empty, creating database")
        // no data in datbase so show landing page prompting user to enter forename
        setShowUserView(false)

      }

    
    }
    setup();
  }, []);

  async function handleEvent(event: TextInputSubmitEditingEvent) {
    // Create the table if it doesn't exist
    event.persist();
    const db = await getDB();

    setName(event.nativeEvent.text)
    // Insert data into correct database table
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS USERS (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name TEXT
        );
    `);
    await db.runAsync("INSERT INTO USERS (user_name) VALUES (?)", [event.nativeEvent.text]);
    setShowUserView(true)
  }
  if (showUserView) {
  


    return (<View style={styles.container}>
      <Text style={styles.title}>TimeboxPlus</Text>
      <Text style={styles.title}>Welcome, {dbdata} 👋.</Text>
      <Text style={styles.title}>------------------</Text>
      
<Stopwatch label={'Testing stopwatch label'} isCountUp={true} />




    </View>)

  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TimeboxPlus</Text>
        <Text style={styles.subheading}>A modern approach to time management.</Text>
        <Text style={styles.subheading2}>Code by Brandon Douglas 2026</Text>
        <TextInput
          style={styles.input}
          textAlign="center"
          placeholder='Enter your name to get started'
          onSubmitEditing={event => {
            handleEvent(event);
          }}></TextInput>
        <Text style={styles.text}>{dbdata}</Text>
      </View>
    )

  }

}
const options = {
    style: {
        margin: 'auto',
    },
    textStyle: {
        color: '#000000',
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    highlight: {
        backgroundColor: '#ffffff',
    },
    play: {
        underlayColor: '#ffffff',
        borderColor: '#d9dcdd',
        textStyle: {
            color: '#000000',
        },
        style: {
            backgroundColor: '#ffffff',
        },
    },
    cancel: {
        underlayColor: '#ffffff',
        borderColor: '#d9dcdd',
        textStyle: {
            color: '#000000',
        },
        style: {
            backgroundColor: '#ffffff',
        },
    },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 45,
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