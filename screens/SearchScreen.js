import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import fs from '../config'
import { ScrollView } from 'react-native-gesture-handler'
import { Header } from 'react-native-elements'
 
export default class Searchscreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        allTransactions : [],
        lastVisibleTransaction : null,
        search : ''
      }
    }

    searchTransactions = async (text) => {
      var enteredText = text.split("")

      if(enteredText[0].toLowerCase() === "b"){
        const transaction = fs.collection("Transaction").where("BookID", "==", text).get();
        transaction.docs.map((doc) => {
          this.setState({
            allTransactions : [...this.state.allTransactions, doc.data()],
            lastVisibleTransaction : doc
          })
        })
      }

      else{
        const transaction = fs.collection("Transaction").where("StudentID", "==", text).get();
        transaction.docs.map((doc) => {
          this.setState({
            allTransactions : [...this.state.allTransactions, doc.data()],
            lastVisibleTransaction : doc
          })
        })
      }
    }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
          <Header 
          centerComponent = {{title : "Wireless Library Search Engine", style : {backgroundColor : cadetblue, color : white}}}>
          </Header>  

          <Image source = {require("../assets/booklogo.jpg")} style = {{width:200, height: 200}}></Image>

          <TextInput
          placeholder = "Enter Book or Student ID"
          value = {this.state.search}
          onChangeText = {(text) => {
            this.setState({
              search : text
            })
          }}>
          </TextInput>

          <TouchableOpacity
          onPress = {() => {
            this.searchTransactions(this.state.search)
          }}>
            <Text> Search </Text>
          </TouchableOpacity>
          </View>

          <FlatList
          data = {this.state.allTransactions}
          renderItem = {(item) => {
            <View>
            </View>
          }}> 
          </FlatList>
        </View> 
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10,
      color : 'white'
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: 'cadetblue',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton:{
      backgroundColor: 'white',
      padding : 10,
      marginTop : 15,
      width: 100,
      borderWidth: 1.5,
      borderColor : "cadetblue"
    },
    submitButtonText : {
      fontSize: 15,
      textAlign: 'center',
      color : 'cadetblue'
    }
  });