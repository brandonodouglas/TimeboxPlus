import { JwtPayload } from '@supabase/supabase-js';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import Auth from '../components/Auth';
import { notionStyle } from './mystyles/notionStyle';


export default function Tab() {
  const [text, onChangeText] = useState('');
  const [claims, setClaims] = useState<JwtPayload | null>(null)




  return (
    <View style={notionStyle.page}>
      <Text style={notionStyle.title}>TimeboxPlus.</Text>
      <Text style={notionStyle.blockText}>Productivity, simplified</Text>
      <Text style={notionStyle.blockTextSmall}>Code by @brandonodouglas 2026.</Text>

      <View style={notionStyle.divider}></View>
      <Text style={notionStyle.blockTextSmall}>Ready to get started? 🚀</Text>
      <View>
        <Auth />
        {claims && <Text>{claims.sub}</Text>}
      </View>





    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',


    justifyContent: 'center',
    alignItems: 'center',
  },
});