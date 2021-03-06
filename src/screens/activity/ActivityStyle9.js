import React, {useContext, useRef} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {PageContext} from "../../../App";
import MaterialSnackbar from "../../components/MaterialSnackbar";
import {storageImageUrl} from "../../tools/Helpers";
import HeaderThreeButton from "../../components/HeaderThreeButton";
import MaterialInput from "../../components/MaterialInput";
import MaterialButton from "../../components/MaterialButton";

const DATA = [
    {
        id: '1',
        user: 'Tony Ramirez',
        avatar: require('../../assets/icon/ic_profile2.png'),
        text: 'Nice photo!',
        datetime: 'An hour ago'
    },
    {
        id: '2',
        user: 'Ludwig',
        avatar: require('../../assets/icon/ic_profile1.png'),
        text: 'I love how you took it on white!',
        datetime: '2 hour ago'
    },
    {
        id: '3',
        user: 'Christina',
        avatar: require('../../assets/icon/ic_profile2.png'),
        text: 'You’re awesome!',
        datetime: '3 hour ago'
    },
    {
        id: '4',
        user: 'Remi Boucher',
        avatar: require('../../assets/icon/ic_profile3.png'),
        text: 'Wow!',
        datetime: '3 hour ago'
    },
    {
        id: '5',
        user: 'Tony Ramirez',
        avatar: require('../../assets/icon/ic_profile2.png'),
        text: 'Nice photo!',
        datetime: 'An hour ago'
    },
    {
        id: '6',
        user: 'Ludwig',
        avatar: require('../../assets/icon/ic_profile1.png'),
        text: 'I love how you took it on white!',
        datetime: '2 hour ago'
    },
];

function ActivityStyle9() {
    const pageContext = useContext(PageContext);
    const snackbarRef = useRef(null);
    return (
        <View style={{flex: 1, backgroundColor: '#f1f5f7'}}>
            <HeaderThreeButton
                title='Activity'
                isHome={true}
                navPress={() => pageContext.pageDispatch({page: 'pop'})}
                searchPress={() => snackbarRef.current.ShowSnackBarFunction('search clicked')}
                morePress={() => snackbarRef.current.ShowSnackBarFunction('more clicked')}
                bgColor='#f44336'
            />
            <MainContent/>
            <FlatList
                contentContainerStyle={{paddingBottom: 10}}
                data={DATA}
                renderItem={({item}) => <ItemActivity data={item}/>}
                keyExtractor={item => item.id}
            />
            <ChatContainer snackbarRef={snackbarRef}/>
            <MaterialSnackbar ref={snackbarRef}/>
        </View>
    );
}

function MainContent() {
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{
                flex: 1,
                marginHorizontal: 10,
                marginTop: 10,
                backgroundColor: 'white',
                borderRadius: 3,
                shadowRadius: 3,
                elevation: 3,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3
            }}>
                <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('../../assets/icon/ic_profile1.png')}
                           style={{height: 40, width: 40, resizeMode: 'cover'}}/>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>
                            <Text style={{fontWeight: 'bold', color: '#616161'}}>Gabriella Madelaine</Text>
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: 2, alignItems: 'center'}}>
                            <Text style={{fontSize: 12, color: '#bdbdbd'}}>An hour ago</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={{fontSize: 14, color: '#f44336'}}>Like</Text>
                    </TouchableOpacity>
                </View>
                <Image source={{uri: storageImageUrl('activity', 'activity_9_img.jpg')}}
                       style={{height: 170, width: '100%', resizeMode: 'cover'}}/>
                <View style={{
                    padding: 10,
                    marginVertical: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image source={require('../../assets/icon/ic_love_red.png')}
                           style={{width: 10, height: 10, resizeMode: 'contain'}}/>
                    <Text style={{fontSize: 12, marginLeft: 5, color: '#616161'}}>1347</Text>
                </View>
            </View>
        </View>
    );
}

function ItemActivity({data}) {
    return (
        <View style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#e0e0e0'
        }}>
            <Image source={data.avatar}
                   style={{height: 40, width: 40, resizeMode: 'cover'}}/>
            <View style={{flex: 1, marginLeft: 10}}>
                <Text style={{fontSize: 14}}>
                    <Text style={{fontWeight: 'bold', color: '#616161'}}>{data.user}</Text>
                    <Text style={{color: '#616161'}}> {data.text}</Text>
                </Text>
                <View style={{flexDirection: 'row', marginTop: 2, alignItems: 'center'}}>
                    <Text style={{fontSize: 12, color: '#bdbdbd'}}>{data.datetime}</Text>
                </View>
            </View>
        </View>
    );
}

function ChatContainer({snackbarRef}) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: 5,
            elevation: 3,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3
        }}>
            <MaterialInput bgColor='transparent' margin={0} placeholder='Write comment here..'/>
            <MaterialButton title='Send' style={{width: 73, borderRadius: 3, backgroundColor: '#f44336'}}
                            buttonPress={() => snackbarRef.current.ShowSnackBarFunction('Send clicked')}/>
        </View>
    );
}

export default ActivityStyle9;