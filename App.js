import { StyleSheet, Platform } from 'react-native';


import {View, TextInput, Button, Linking} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {SetStateAction, useEffect, useState} from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const initialDate = new Date();
  initialDate.setMinutes(initialDate.getMinutes() - 5);
  const [link, setLink] = useState('');
  const [song, setSong] = useState('https://open.spotify.com/track/7x9aauaA9cu6tyfpHnqDLo?si=025c5403ace64fce');
  const [currDate, setCurr] = useState(new Date());
  const [date, setDate] = useState(initialDate);
  const [mode, setMode] = useState('date');

  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');
  
  useEffect(() => {
    var timer = setInterval(() => setCurr(new Date()), 1000);

    if(currDate.getDate() === date.getDate() && currDate.getHours() === date.getHours() && currDate.getMinutes() === date.getMinutes()){
      handleLinkSubmit();
    }
    return function cleanup() {
      clearInterval(timer);
    }
  });




  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    console.log(currentDate,currDate);
    
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  async function handleLinkSubmit() {
    try {
      const isSupported = await Linking.canOpenURL(link);
      if (isSupported) {
        Linking.openURL(link);
      } else {
        console.log('App cannot handle the provided URL.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }


  return (

    <View style={styles.container}>

      <Button title="Select Date" onPress={() => showMode('date')} /> 
      <Button title="Select Time" onPress={() => showMode('time')} /> 

      {show && 
      <DateTimePicker
      testID='dateTimePicker' 
      value={date} 
      mode={mode == 'date' ? 'date' : 'time'}
      is24Hour={false}
      display='default'
      onChange={onChange}/>
      }

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        placeholder="Enter a link"
        onChangeText={text => setLink(text)}
        value={link}
      />
      <Button title="Set Link"/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
