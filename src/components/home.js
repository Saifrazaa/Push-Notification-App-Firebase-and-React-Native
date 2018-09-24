import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "react-native-firebase";
import { Container, Header, Footer, FooterTab, Content, Button, Picker } from "native-base";
import Messages from "./messages";
import Groups from "./groups";
const { height, width, fontScale } = Dimensions.get("window");
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab_value: 1
        }
    }
    handleTabs = (value) => {
        this.setState({ tab_value: value })
    }
    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate("PhoneAuth");
        }).catch((error) => {
            alert(JSON.stringify(error))
        });
    }
    render() {
        return (
            <View style={{ height: height }}>
                <View>
                    <View style={{ width: width, flexDirection: "row" }}>
                        <TouchableOpacity style={{ width: width / 3.3, backgroundColor: "green", height: height / 12, justifyContent: "center" }} onPress={this.handleTabs.bind(this, 1)}>
                            <Icon name="wechat" style={{ color: "white", fontSize: fontScale * 25, alignSelf: "center", opacity: this.state.tab_value === 1 ? 1.0 : 0.3 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: width / 3.3, backgroundColor: "green", height: height / 12, justifyContent: "center" }} onPress={this.handleTabs.bind(this, 2)}>
                            <Icon name="group" style={{ color: "white", fontSize: fontScale * 25, alignSelf: "center", opacity: this.state.tab_value === 2 ? 1.0 : 0.3 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: width / 3.3, backgroundColor: "green", height: height / 12, justifyContent: "center" }} onPress={this.handleTabs.bind(this, 3)}>
                            <Icon name="pencil-square-o" style={{ color: "white", fontSize: fontScale * 25, alignSelf: "center", opacity: this.state.tab_value === 3 ? 1.0 : 0.3 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: width / 11, backgroundColor: "green", justifyContent: "center" }} onPress={this.signOut.bind(this)}>
                            <Icon2 style={{ color: "white", fontSize: fontScale * 25,alignSelf:"center"}} name="dots-vertical" />
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.tab_value === 1 ?
                            <View style={{ height: height }}>
                                <Messages />
                            </View>
                            :
                            <View></View>
                    }
                    {
                        this.state.tab_value === 2 ?
                            <View>
                                <Groups navigation={this.props.navigation} />
                            </View>
                            :
                            <View></View>
                    }
                    {
                        this.state.tab_value === 3 ?
                            <View>
                                <Text>About</Text>
                            </View>
                            :
                            <View></View>
                    }
                </View>
            </View>
        )
    }
}