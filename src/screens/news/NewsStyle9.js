import React, {useContext, useRef} from 'react';
import {Dimensions, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {PageContext} from "../../../App";
import MaterialSnackbar from "../../components/MaterialSnackbar";
import HeaderThreeButton from "../../components/HeaderThreeButton";

const DATA = [
    {
        id: '1',
        user: 'Michael Adams',
        avatar: require('../../assets/icon/ic_profile1.png'),
        image: 'news_5_img_1.jpg',
        text: 'We also talk about the future of work as the robots advance, and we ask whether a retro phone',
        datetime: 'Fri, 12 May 2017 • 14.30'
    },
    {
        id: '2',
        user: 'Michael Adams',
        avatar: require('../../assets/icon/ic_profile2.png'),
        image: 'news_5_img_2.jpg',
        text: 'We also talk about the future of work as the robots advance, and we ask whether a retro phone',
        datetime: 'Fri, 12 May 2017 • 14.30'
    },
    {
        id: '3',
        user: 'Michael Adams',
        avatar: require('../../assets/icon/ic_profile4.png'),
        image: 'news_5_img_3.jpg',
        text: 'We also talk about the future of work as the robots advance, and we ask whether a retro phone',
        datetime: 'Fri, 12 May 2017 • 14.30'
    },
];

const screenWidth = Dimensions.get('window').width;

function NewsStyle9() {
    const pageContext = useContext(PageContext);
    const snackbarRef = useRef(null);

    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#f1f5f7'}}>
            <HeaderThreeButton
                title='Twitter Feeds'
                isHome={true}
                navPress={() => pageContext.pageDispatch({page: 'pop'})}
                searchPress={() => snackbarRef.current.ShowSnackBarFunction('search clicked')}
                enableMore={false}
                bgColor='#cc0001'
            />
            <FlatList
                contentContainerStyle={{paddingTop: 10, paddingBottom: 10}}
                data={DATA}
                renderItem={({item}) => <ItemNews data={item} snackbarRef={snackbarRef}/>}
                keyExtractor={item => item.id}
            />
            <MaterialSnackbar ref={snackbarRef}/>
        </View>
    );
}

function ItemNews({data, snackbarRef}) {
    return (
        <View style={{width: screenWidth}}>
            <View style={{
                marginHorizontal: 10,
                marginTop: 10,
                backgroundColor: 'white',
                borderRadius: 3,
                shadowRadius: 3,
                elevation: 3,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 15}}>
                    <Image source={data.avatar}
                           style={{height: 40, width: 40, resizeMode: 'cover'}}/>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={{fontSize: 14}}>
                            <Text style={{fontWeight: 'bold', color: '#616161'}}>{data.user}</Text>
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: 2, alignItems: 'center'}}>
                            <Text style={{fontSize: 12, color: '#bdbdbd'}}>{data.datetime}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{
                    fontSize: 14,
                    marginTop: 5,
                    color: '#616161',
                    lineHeight: 25,
                    paddingHorizontal: 15
                }}>{data.text}</Text>
                <View style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: '#b0bec5',
                    marginTop: 15,
                    padding: 5
                }}>
                    <TouchableOpacity style={{width: 100, flexDirection: 'row', alignItems: 'center', marginLeft: 6}}
                                      onPress={() => snackbarRef.current.ShowSnackBarFunction('retweet clicked')}>
                        <Image source={require('../../assets/icon/ic_retwit.png')}
                               style={{height: 40, width: 40, resizeMode: 'contain'}}/>
                        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#b0bec5', marginLeft: 10}}>25</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={{width: 70, alignItems: 'center', justifyContent: 'center'}}
                                      onPress={() => snackbarRef.current.ShowSnackBarFunction('share clicked')}>
                        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff9800'}}>SHARE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 70, alignItems: 'center', justifyContent: 'center'}}
                                      onPress={() => snackbarRef.current.ShowSnackBarFunction('open clicked')}>
                        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ff9800'}}>OPEN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default NewsStyle9;