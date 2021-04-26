import React, { Component } from "react";
import { Platform, Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput, Button } from "react-native";
import commonStyles from "../commonStyles";

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

const initialState = {desc: '', date: new Date(), showDatePicker: false}

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            ...this.state
        }

        this.props.onSave(newTask) && this.props.onSave(newTask)
        this.setState({...initialState})
    }

    

    getDatePicker = () => {
        let datePicker =  <DateTimePicker 
            value={this.state.date}
            onChange={(_, date) => this.setState({date: date, showDatePicker: false})}
            mode="date"
        />

        const dateString = moment(this.state.date).format('dddd, D [de] MMMM [de] YYYY')
        //Creates a button that shows the calendar, Android only 
        if(Platform.OS === 'android'){
            datePicker =(
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {/* Date picker just changes when jsx is loaded */}
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        
       return datePicker
    }

    render(){
        return(
            <Modal transparent={true} 
            visible={this.props.isVisible}
            onRequestClose={this.props.onCancel} animationType='slide' presentationStyle='overFullScreen'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} placeholder="Informe a descrição..." 
                    onChangeText={x => this.setState({ desc: x })} 
                    value={this.state.desc}/>
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Text style={styles.button} onPress={this.save}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,

    },
    container: {
        backgroundColor: '#FFF',
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today,
    },  
    input:{
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})