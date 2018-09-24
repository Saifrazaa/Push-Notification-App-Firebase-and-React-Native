import React from "react";
import { View, Text, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { fetchAdmins } from "../../store/actions";
import { List, ListItem } from "native-base";
const { height, width, fontScale } = Dimensions.get("window");
class AdminsList extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const groupKey = this.props.navigation.getParam('groupKey');
        this.props.fetchAdmins(groupKey);
    }
    handleClick = (arg) => {
    }
    render() {
        const groupKey=this.props.navigation.getParam('groupKey');
        const groupName=this.props.navigation.getParam('groupName');
        return (
            <View>
                <View style={{ width: width, height: height / 5, backgroundColor: "green", justifyContent: "center" }}>
                    <Text style={{ alignSelf: "center", color: "white", fontSize: fontScale * 30, fontWeight: "400" }}>Admins List ({groupName})</Text>
                </View>
                <View>
                    <ScrollView>
                        <List>
                            {this.props.admins.map((admin, index) => {
                                return (
                                    <ListItem key={index}>
                                        <View style={{ height: height / 15, width: width / 2.2, justifyContent: "center" }}>
                                            <Text style={{ color: "black", fontWeight: "bold", fontSize: fontScale * 18 }}>{admin.admin}</Text>
                                        </View>
                                        <TouchableOpacity style={{ height: height / 15, backgroundColor: "green", width: width / 3.5, justifyContent: "center", borderRadius: 10 }} onPress={this.handleClick.bind(this, { admin: admin.admin, adminKey: admin.key, action: "approve", groupKey: groupKey })}>
                                            <Text style={{ alignSelf: "center", color: "white", }}>Remove Admin</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ height: height / 15, backgroundColor: "red", width: width / 6, justifyContent: "center", marginLeft: 5, borderRadius: 10 }} onPress={this.handleClick.bind(this, { adminKey: admin.key, action: "ban", groupKey: groupKey })}>
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
        admins: state.PushNotification.admins
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAdmins: (key) => {
            dispatch(fetchAdmins(key))
        },
        // handleMembers: (arg) => {
        //     dispatch(handleMembers(arg))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminsList);