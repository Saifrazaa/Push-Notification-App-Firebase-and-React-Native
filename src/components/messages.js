import React from "react";
import { View, Text, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Container, Header, Footer, FooterTab, Content, Button, List, ListItem, Left, Right, Body, Thumbnail } from "native-base";
import { fetchChats } from "../store/actions";
const { height, width, fontScale } = Dimensions.get("window");

class Messages extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchChats();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <List>
                        {this.props.chats.map((chat, index) => {
                            return (
                                <ListItem avatar key={index}>
                                    <TouchableOpacity>
                                        <View style={{ flexDirection: "row", width: width,height:height/9,borderBottomWidth:0.3,borderColor:"grey" }}>
                                            <View style={{ width: width / 5,justifyContent:"center",alignSelf:"center" }}>
                                                <Thumbnail source={{ uri: 'https://avatars3.githubusercontent.com/u/28540950?s=460&v=4' }} />
                                            </View>
                                            <View style={{ width: width / 2,justifyContent:"center",flexDirection:"column"  }}>
                                                <Text style={{fontWeight:"bold",fontSize:fontScale*15}}>{chat.username}</Text>
                                                <Text style={{marginTop:5}}>I m Here</Text>
                                            </View>
                                            <View style={{ width: width / 5,justifyContent:"center"  }}>
                                                <Text>{chat.lastmessage}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </ListItem>
                            )
                        })}
                    </List>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        chats: state.PushNotification.chats || []
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        fetchChats:()=>{
            dispatch(fetchChats())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);