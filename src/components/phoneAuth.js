import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Container, Header, Content, Form, Item, Input, Button, Label,Spinner,Footer } from 'native-base';
import firebase from "react-native-firebase";
const { width, height, fontScale } = Dimensions.get("window");
export default class phoneAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneAuth: true,
            phoneNumber: "",
            verifyCode: "",
            userName: "",
            verificationCodeInput: false,
            getUserName: false,
            spinner:0

        }
    }
    phoneAuth = () => {
        const phone_number = this.state.phoneNumber;
        this.setState({spinner:1})
        firebase.auth().signInWithPhoneNumber(phone_number).then(confirm => {
            this.setState({ phoneAuth: false, confirm, verificationCodeInput: true })
        }).catch((error) => {
            alert(JSON.stringify(error))
            this.setState({spinner:0})

        })
    }
    verifyPhoneNumber = () => {
        const confirmation = this.state.confirm;
        const verifyCode = this.state.verifyCode;
        this.setState({spinner:2})
        confirmation.confirm(verifyCode).then(() => {
            this.setState({ verificationCodeInput: false, getUserName: true })
        }).catch((error) => {
            alert(JSON.stringify(error))
            this.setState({spinner:0})

        })
    }
    getUserName = () => {
        this.setState({spinner:3})
        const user={
            name:this.state.userName,
            type:"user"
        }
        firebase.database().ref(`users/${firebase.auth().currentUser._user.phoneNumber}`).set(user).then(()=>{
            this.props.navigation.navigate("Home")
        }).catch((error)=>{
            alert(error.message)
            this.setState({spinner:0})

        });
    }
    render() {
        return (
            <View>
                {this.state.phoneAuth &&
                    <View style={{ justifyContent: "space-around", width: width / 1.2, height: height, alignSelf: "center" }}>
                        <Form>
                            <Item regular>
                                <Input style={{ fontSize: fontScale * 20 }} placeholder="Enter Your Phone Number" onChangeText={(value) => this.setState({ phoneNumber: value })} />
                            </Item>
                            <View style={{ alignSelf: "center" }}>
                                <Button block success style={{ width: width / 2, marginTop: 10 }} onPress={this.phoneAuth.bind(this)}>
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: fontScale * 15 }}>Confirm</Text>
                                </Button>
                            </View>
                        </Form>
                        {this.state.spinner===1?<Spinner color="green"/>:<View></View>}
                    </View>
                }
                {this.state.verificationCodeInput &&
                    <View style={{ justifyContent: "space-around", width: width / 1.2, height: height, alignSelf: "center" }}>
                        <Form>
                            <Item regular>
                                <Input style={{ fontSize: fontScale * 20 }} placeholder="Enter The Verification Code" onChangeText={(value) => this.setState({ verifyCode: value })} />
                            </Item>
                            <View style={{ alignSelf: "center" }}>
                                <Button block success style={{ width: width / 2, marginTop: 10 }} onPress={this.verifyPhoneNumber.bind(this)}>
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: fontScale * 15 }}>Submit Code</Text>
                                </Button>
                            </View>
                            <Text style={{ alignSelf: "center", marginTop: 30 }}>Please Wait For Verification Code</Text>
                        </Form>
                        {this.state.spinner===2?<Spinner color="green"/>:<View></View>}
                    </View>
                }
                {this.state.getUserName &&
                    <View style={{ justifyContent: "space-around", width: width / 1.2, height: height, alignSelf: "center" }}>
                    <Form>
                        <Item regular>
                            <Input style={{ fontSize: fontScale * 20 }} placeholder="Enter Your Name" onChangeText={(value) => this.setState({ userName: value })} />
                        </Item>
                        <View style={{ alignSelf: "center" }}>
                            <Button block success style={{ width: width / 2, marginTop: 10 }} onPress={this.getUserName.bind(this)}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: fontScale * 15 }}>Go</Text>
                            </Button>
                        </View>
                    </Form>
                    {this.state.spinner===3?<Spinner color="green"/>:<View></View>}
                </View>
                }
            </View>
        )
    }
}