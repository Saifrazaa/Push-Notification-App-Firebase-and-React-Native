import React from "react";
import PhoneAuth from "./phoneAuth";
import Home from "./home";
import firebase from "react-native-firebase";
import { View } from "react-native";
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userFound: false
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ userFound: true })
            }
        })
    }
    render() {
        return (
            <View>
                {this.state.userFound === true ?
                    <Home navigation={this.props.navigation} />
                      :
                    <PhoneAuth navigation={this.props.navigation} />
                }  
            </View>
        )
    }
}
export default Main;