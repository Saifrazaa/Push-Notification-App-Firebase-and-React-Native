import React from "react";
import { List, ListItem } from "native-base";
import { View, ScrollView, Text, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getSpecificGroup, sendJoinRequest, handleJoinRequest } from "../../store/actions";
import firebase from "react-native-firebase";
const { height, width, fontScale } = Dimensions.get("window");
class GroupDashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const key = this.props.navigation.getParam("groupID");
        this.props.getSpecificGroup(key)
    }
    joinRequest = (key) => {
        this.props.sendJoinRequest(key);
    }
    handleRequest = (arg) => {
        this.props.handleJoinRequest(arg)
    }
    render() {
        const group = this.props.group;
        let members = [];
        let admins = [];
        group.members && group.members.map((member) => {
            members.push(member.member);
        })
        group.admins && group.admins.map((admin) => {
            admins.push(admin.admin);
        })
        const user = firebase.auth().currentUser._user.phoneNumber;
        return (
            <View style={{ height: height, width: width }}>
                <View style={{ height: height / 4 }}>
                    <ImageBackground source={{ uri: "https://png.icons8.com/color/1600/group.png" }} style={{ width: width, height: height / 4, justifyContent: "flex-end" }}>
                        <Text style={{ color: "white", fontSize: fontScale * 40, fontWeight: "bold", marginLeft: 10 }}>{group.groupName && group.groupName}</Text>
                        <Text style={{color:"white",fontSize:fontScale*20,marginLeft:5}}>0 Members , 0 Admins</Text>
                    </ImageBackground>
                </View>
                {group.superAdmin === user ?
                    <View style={{ height: height }}>
                        <View>
                            <ScrollView>
                                <List>
                                    {group.join_request !== undefined ? group.join_request.map((request, index) => {
                                        return (
                                            <ListItem key={index}>
                                                <View style={{ height: height / 15, width: width / 2, justifyContent: "center" }}>
                                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: fontScale * 18 }}>{request.value}</Text>
                                                </View>
                                                <TouchableOpacity style={{ height: height / 15, backgroundColor: "green", width: width / 5, justifyContent: "center", borderRadius: 10 }} onPress={this.handleRequest.bind(this, { groupKey: group.key, requestKey: request.key, type: "approve", value: request.value })}>
                                                    <Text style={{ alignSelf: "center", color: "white", fontWeight: "bold" }}>Approve</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ height: height / 15, backgroundColor: "red", width: width / 5, justifyContent: "center", marginLeft: 5, borderRadius: 10 }} onPress={this.handleRequest.bind(this, { groupKey: group.key, requestKey: request.key, type: "delete", value: request.value })}>
                                                    <Text style={{ alignSelf: "center", color: "white", fontWeight: "bold" }}>Delete</Text>
                                                </TouchableOpacity>
                                            </ListItem>
                                        )
                                    })
                                        :
                                        <View></View>
                                    }
                                </List>
                            </ScrollView>
                        </View>
                        <View>
                            <TouchableOpacity style={{ justifyContent: "center", width: width / 1.1, height: height / 15, backgroundColor: "green", borderRadius: 5, alignSelf: "center", marginTop: 5 }} onPress={() => { this.props.navigation.navigate('MembersList', { groupKey: group.key, groupName: group.groupName }) }}>
                                <Text style={{ color: "white", alignSelf: "center", fontWeight: "bold" }}>Members List (0)</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={{ justifyContent: "center", width: width / 1.1, height: height / 15, backgroundColor: "green", borderRadius: 5, alignSelf: "center", marginTop: 5 }} onPress={() => { this.props.navigation.navigate('AdminsList', { groupKey: group.key, groupName: group.groupName }) }}>
                                <Text style={{ color: "white", alignSelf: "center", fontWeight: "bold" }}>Admins List (0)</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View>
                        {admins.includes(user) ?
                        <View>
                            <View style={{ height: height / 15, width: width / 1.1, justifyContent: "center", backgroundColor: "green", alignSelf: "center", borderRadius: 5, marginTop: 5 }}>
                                <Text style={{ alignSelf: "center", fontWeight: "bold", color: "white" }}>You are Admin</Text>
                            </View>
                            <View>
                            <TouchableOpacity style={{ justifyContent: "center", width: width / 1.1, height: height / 15, backgroundColor: "green", borderRadius: 5, alignSelf: "center", marginTop: 5 }} onPress={() => { this.props.navigation.navigate('MembersList', { groupKey: group.key, groupName: group.groupName }) }}>
                                <Text style={{ color: "white", alignSelf: "center", fontWeight: "bold" }}>Members List</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                            :
                            members.includes(user) ?
                                <View style={{ width: width / 1.1, height: height / 15, marginTop: 5, backgroundColor: "green", justifyContent: "center", alignSelf: "center", borderRadius: 5 }}>
                                    <Text style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}>Already Member</Text>
                                </View>
                                :
                                group.request_sent === true ?
                                    <View style={{ height: height / 15, width: width / 1.1, justifyContent: "center", backgroundColor: "green", alignSelf: "center", borderRadius: 5, marginTop: 5 }}>
                                        <Text style={{ alignSelf: "center", fontWeight: "bold", color: "white" }}>Join Request in Pending</Text>
                                    </View>
                                    :
                                    <TouchableOpacity style={{ height: height / 15, width: width / 1.1, alignSelf: "center", justifyContent: "center", backgroundColor: "green", marginTop: 5, borderRadius: 5 }}
                                        onPress={this.joinRequest.bind(this, group.key)}
                                    >
                                        <Text style={{ alignSelf: "center", color: "white", fontWeight: "bold" }}>Join Group</Text>
                                    </TouchableOpacity>
                        }
                    </View>
                }

            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        group: state.PushNotification.group,
        success: state.PushNotification.success
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSpecificGroup: (arg) => {
            dispatch(getSpecificGroup(arg))
        },
        sendJoinRequest: (key) => {
            dispatch(sendJoinRequest(key))
        },
        handleJoinRequest: (arg) => {
            dispatch(handleJoinRequest(arg))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupDashboard);