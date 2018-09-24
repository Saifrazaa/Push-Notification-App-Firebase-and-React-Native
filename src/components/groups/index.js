import React from "react";
import { Item, Input, Button, Spinner, Thumbnail, ListItem, List } from "native-base";
import { Modal, View, Text, Dimensions, TouchableOpacity, StyleSheet, TouchableHighlight, ScrollView, Alert } from "react-native";
import { createGroup, handleModal, fetchGroups, deleteGroup } from "../../store/actions";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";

const { height, width, fontScale } = Dimensions.get("window");
class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            groupname: "",
            spinner: false,
            tab_value: 1
        }
    }
    createGroup = () => {
        if (this.state.groupname === "") {
            alert("Please Enter The Name")
        }
        else {
            this.props.createGroup(this.state.groupname);
        }
    }
    componentWillMount() {
        this.props.fetchGroups()
    }
    goToGroupDashboard = (arg) => {
        this.props.navigation.navigate('GroupDashboard', { groupID: arg })
    }
    deleteGroup = (key) => {
        Alert.alert(
            'Confirmation',
            'Confirm Delete ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Confirm', onPress: () => this.props.deleteGroup(key) },
            ],
            { cancelable: false }
        )
    }
    render() {
        
        const groups = this.props.groups;
        const user = firebase.auth().currentUser._user.phoneNumber;
        let others_groups = groups.filter((group) => group.superAdmin !== user);
        const your_groups = groups.filter((group) => group.superAdmin === user);
        return (
            <View>
                <View style={{ height: height / 1.15 }}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ width: width / 2, height: height / 15, backgroundColor: "green", justifyContent: "center", borderRightWidth: 0.5, borderRightColor: "white" }} onPress={() => { this.setState({ tab_value: 1 }) }}>
                            <Text style={{ alignSelf: "center", fontWeight: "bold", color: "white", opacity: this.state.tab_value === 1 ? 1.0 : 0.3 }}>Others Groups</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: width / 2, height: height / 15, backgroundColor: "green", justifyContent: "center", borderRightWidth: 0.5, borderRightColor: "white" }} onPress={() => { this.setState({ tab_value: 2 }) }}>
                            <Text style={{ alignSelf: "center", fontWeight: "bold", color: "white", opacity: this.state.tab_value === 2 ? 1.0 : 0.3 }}>Your Groups</Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.tab_value === 1 ?
                        <View style={{ flex: 1 }}>
                            <ScrollView>
                                <List>
                                    {others_groups.map((group, index) => {
                                        return (
                                            <ListItem avatar key={index}>
                                                <TouchableOpacity onPress={this.goToGroupDashboard.bind(this, group.key)}>
                                                    <View style={{ flexDirection: "row", width: width, height: height / 9, borderBottomWidth: 0.3, borderColor: "grey" }}>
                                                        <View style={{ width: width / 5, justifyContent: "center", alignSelf: "center" }}>
                                                            <Thumbnail source={{ uri: 'https://www.mytasksolution.com/wp-content/uploads/2017/08/third-party-icon.png' }} />
                                                        </View>
                                                        <View style={{ width: width / 2, justifyContent: "center", flexDirection: "column" }}>
                                                            <Text style={{ fontWeight: "bold", fontSize: fontScale * 15 }}>{group.groupName}</Text>
                                                            <Text style={{ marginTop: 5 }}>0 Members,0 Admins</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </ScrollView>
                            {this.props.fetching === true ? <Spinner color="green" /> : <View></View>}
                        </View>
                        :
                        <View>
                        </View>
                    }
                    {this.state.tab_value === 2 ?
                        <View style={{ flex: 1 }}>
                            <ScrollView>
                                <List>
                                    {your_groups.map((group, index) => {
                                        return (
                                            <ListItem avatar key={index}>
                                                <View style={{ width: width, flexDirection: "row" }}>
                                                    <TouchableOpacity onPress={this.goToGroupDashboard.bind(this, group.key)}>
                                                        <View style={{ flexDirection: "row", width: width / 1.2, height: height / 9, borderBottomWidth: 0.3, borderColor: "grey" }}>
                                                            <View style={{ width: width / 5, justifyContent: "center", alignSelf: "center" }}>
                                                                <Thumbnail source={{ uri: 'https://www.mytasksolution.com/wp-content/uploads/2017/08/third-party-icon.png' }} />
                                                            </View>
                                                            <View style={{ width: width / 1.6, justifyContent: "center", flexDirection: "column" }}>
                                                                <Text style={{ fontWeight: "bold", fontSize: fontScale * 15 }}>{group.groupName}</Text>
                                                                <Text style={{ marginTop: 5 }}>0 Members,0 Admins</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    {user === group.superAdmin ?
                                                        <TouchableOpacity style={{ justifyContent: "center" }} onPress={this.deleteGroup.bind(this, group.key)}>
                                                            <Icon name="delete" style={{ alignSelf: "center", fontSize: fontScale * 30 }} />
                                                        </TouchableOpacity>
                                                        :
                                                        <View></View>
                                                    }
                                                </View>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </ScrollView>
                            {this.props.fetching === true ? <Spinner color="green" /> : <View></View>}
                        </View>
                        :
                        <View>
                        </View>
                    }
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.modal}
                    onRequestClose={() => this.setState({ dialogVisible: false, groupname: "" })} >
                    <View style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <View
                            style={{ height: height / 4, width: width / 1.1, backgroundColor: "#fff", elevation: 50, borderRadius: 5 }} >
                            <View>
                                <Text style={{ fontSize: fontScale * 20, fontWeight: "bold", color: "green", alignSelf: "center", padding: 5 }} >
                                    Add new group
                               </Text>
                            </View>
                            <View>
                                <Item style={{ marginTop: 3 }}>
                                    <Input
                                        onChangeText={(value) => { this.setState({ groupname: value }) }}
                                        placeholder="Enter Group Name"
                                    />
                                </Item>
                            </View>
                            <View style={{ justifyContent: "flex-end", flexDirection: "row", flex: 1 }}>
                                <TouchableOpacity style={{ justifyContent: "center", width: width / 5, }} onPress={() => { this.setState({ groupname: "" }, () => this.props.handleModal(false)) }}>
                                    <Text style={{ alignSelf: "center", fontSize: fontScale * 17, color: "green", fontWeight: "bold" }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ justifyContent: "center", width: width / 2.8 }} onPress={this.createGroup.bind(this)}>
                                    <Text style={{ alignSelf: "center", fontSize: fontScale * 17, color: "green", fontWeight: "bold" }}>Create Group</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View>
                    <TouchableOpacity
                        onPress={() => { this.props.handleModal(true) }}
                        activeOpacity={0.7}
                        style={styles.addButton}
                    >
                        <Text style={{ color: "#fff", fontSize: 30 }} >+</Text>
                    </TouchableOpacity>
                </View>
            </View>



        )
    }
}
const styles = StyleSheet.create({
    addButton: {
        height: 60,
        width: 60,
        backgroundColor: "green",
        borderRadius: 100,
        position: "absolute",
        bottom: 20, right: 20,
        elevation: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
const mapStateToProps = (state) => {
    return {
        groups: state.PushNotification.groups,
        modal: state.PushNotification.modal,
        fetching: state.PushNotification.fetching
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleModal: (arg) => {
            dispatch(handleModal(arg))
        },
        createGroup: (arg) => {
            dispatch(createGroup(arg))
        },
        fetchGroups: () => {
            dispatch(fetchGroups())
        },
        deleteGroup: (key) => {
            dispatch(deleteGroup(key))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Groups);