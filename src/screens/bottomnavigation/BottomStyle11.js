import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Surface from '../../components/Surface';
import RootBottomNav1 from './RootBottomNav1';

export default function () {
    const [tab, setTab] = useState('recent');
    const renderSeparator = () => {
        return (
            <View
                style={{
                    width: 10,
                }}
            />
        );
    };
    return (
        <RootBottomNav1 revert={true} bg={'#f1f5f7'} card_bg={'#FFF'} text_color={'#000'}>
            <Surface>

                <View style={{height: 56, backgroundColor: '#FFF', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setTab('recent')}
                                      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={style.img}
                               resizeMode={'contain'}
                               source={require('../../assets/bottom/home.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab('favorite')}
                                      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={style.img}
                               resizeMode={'contain'}
                               source={require('../../assets/bottom/heart.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab('nearby')}
                                      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{
                            backgroundColor: '#3a57f9',
                            borderRadius: 50,
                            height: 35,
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>

                            <Image style={style.img}
                                   resizeMode={'contain'}
                                   source={require('../../assets/bottom/plus.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab('nearby')}
                                      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={style.img}
                               resizeMode={'contain'}
                               source={require('../../assets/bottom/bell.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab('nearby')}
                                      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={style.img}
                               resizeMode={'contain'}
                               source={require('../../assets/bottom/cart.png')}/>
                    </TouchableOpacity>
                </View>
            </Surface>
        </RootBottomNav1>
    );
}

const style = StyleSheet.create({
    img: {
        width: 28, height: 28,
    },
});
