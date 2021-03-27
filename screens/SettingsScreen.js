import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';

import { ExpoConfigView } from '@expo/samples'; 

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
      title: 'Link a new device',
    };

    constructor(props) {
      super(props);

      this.state = {
        // 0 - Intro
        // 1 - How to
        // 2 - Test Connection
        // 3 - Add Network
        // 9 - Loading
        select: 0
      };
    }
    handle_howto  = () => { 
      this.setState({
        select: 1
      });
    }

    handle_networks_get  = () => {
      this.setState({
        select: 9
      });
      this.get_networks();
    }

    get_networks = () =>{
      fetch('http://192.168.1.172/pinode/networks/', {
          method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          if(responseJson){
          this.setState({
              text: JSON.stringify(responseJson),
              select: 2
          })
        }else{
          this.setState({
            text: "BAD",
            select: 2
          })
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          text: JSON.stringify(error),
          select: 2
        })
      });
    }

    handle_networks_post  = () => { 
      this.setState({
        select: 3
      });
    }

    render() {
      let view;
      switch(this.state.select){

        // 0 - Intro
        case 0:
          view = <Text>Hi... Welcome to Phosphr Mobile</Text>
        break;

        // 1 - How to
        case 1:
          let str = String("How to setup your phosphrPI\n\n-Go to Wifi and connect to phosphrPI_Node_xxxxxx\n-Come back to the app test the Connection\n-Add your home network to the phosphrPI\n\n-Did you see a confirmation message?\n-Check your devices for your phosphrPI Node!")
          view = <Text>{str}</Text>
        break;
        
        // 2 - Test Networks
        case 2:
            view = <Text>{this.state.text}</Text>
        break;

        // 3 - Add Networks
        case 3:
          view =<Text>POST</Text>
        break;

        // 9 - Loading
        case 9:
          view = <Text>Loading...</Text>
        break;
      }
      

    return (
      <View style={{flex: 3, flexDirection: 'column', alignItems: 'center'}}>
        <View style={styles.displayView}>
            {view}
        </View>
          <View style={styles.bottomView}>
            <Button
              onPress={this.handle_howto}
              title="How-to"
              color="black"
              accessibilityLabel="Learn how to connect device"
            />
            <Button
              onPress={this.handle_networks_get}
              title="Test Connection"
              color="black"
              accessibilityLabel="Get Networks on piNode"
            />
            <Button
              onPress={this.handle_networks_post}
              title="Add Your Network"
              color="black"
              accessibilityLabel="Add a Network Here"
            />
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    marginLeft: 10,
  },

  displayView: {
    flex: 2, 
    backgroundColor: 'powderblue', 
    width: '100%',
  },

  bottomView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems:'stretch',
    width: '88%',
  },

});
