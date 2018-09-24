import React from "react";
import { View, Text, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { fetchMembers, handleMembers } from "../../store/actions";
import { List, ListItem } from "native-base";
const { height, width, fontScale } = Dimensions.get("window");
class MembersList extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const groupKey = this.props.navigation.getParam('groupKey');
        this.props.fetchMembers(groupKey);
    }
    handleClick = (arg) => {
        this.props.handleMembers(arg);
    }
    render() {
        const groupKey=this.props.navigation.getParam('groupKey');
        const groupName=this.props.navigation.getParam('groupName');
        return (
            <View>
                <View style={{ width: width, height: height / 5, backgroundColor: "green", justifyContent: "center" }}>
                    <Text style={{ alignSelf: "center", color: "white", fontSize: fontScale * 30, fontWeight: "400" }}>Members List ({groupName})</Text>
                </View>
                <View>
                    <ScrollView>
                        <List>
                            {this.props.members.map((member, index) => {
                                return (
                                    <ListItem key={index}>
                                        <View style={{ height: height / 15, width: width / 2, justifyContent: "center" }}>
                                            <Text style={{ color: "black", fontWeight: "bold", fontSize: fontScale * 18 }}>{member.member}</Text>
                                        </View>
                                        <TouchableOpacity style={{ height: height / 15, backgroundColor: "green", width: width / 4, justifyContent: "center", borderRadius: 10 }} onPress={this.handleClick.bind(this, { member: member.member, memberKey: member.key, action: "approve", groupKey: groupKey })}>
                                            <Text style={{ alignSelf: "center", color: "white", }}>Make Admin</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ height: height / 15, backgroundColor: "red", width: width / 6, justifyContent: "center", marginLeft: 5, borderRadius: 10 }} onPress={this.handleClick.bind(this, { memberKey: member.key, action: "ban", groupKey: groupKey })}>
                                            <Text style={{ alignSelf: "center", color: "white", }}>Ban</Text>
                                        </TouchableOpacity>
                                    </ListItem>
                                )
                            })
                            }
                        </List>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        members: state.PushNotification.members
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchMembers: (key) => {
            dispatch(fetchMembers(key))
        },
        handleMembers: (arg) => {
            dispatch(handleMembers(arg))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MembersList);