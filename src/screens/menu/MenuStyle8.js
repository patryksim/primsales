import React, {useCallback, useContext, useRef, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import SwipeBackView from "../../components/SwipeBack";
import {PageContext} from "../../../App";
import HeaderThreeButton from "../../components/HeaderThreeButton";
import MaterialSnackbar from "../../components/MaterialSnackbar";
import DummyPage from "../../components/DummyPage";
import MaterialInput from "../../components/MaterialInput";
import SwipeMenuLeft from "../../components/SwipeMenuLeft";

const DATA = [
    {id: '1', title: 'Feed', notifCount: 32},
    {id: '2', title: 'Explore', notifCount: 2},
    {id: '3', title: 'Activity', notifCount: 0},
    {id: '4', title: 'Group', notifCount: 0},
    {id: '5', title: 'Photos', notifCount: 0},
    {id: '6', title: 'Video', notifCount: 0},
    {id: '7', title: 'Setting', notifCount: 0},
];

function MenuStyle8() {
    const pageContext = useContext(PageContext);
    const snackbarRef = useRef(null);
    const leftMenuRef = useRef(null);

    const onMenuPress = (title) => {
        snackbarRef.current.ShowSnackBarFunction(`menu ${title} clicked`);
        leftMenuRef.current.navigateMenu();
    };

    return (
        <SwipeBackView style={{flex: 1, backgroundColor: 'gray'}}
                       onSwipeBack={() => pageContext.pageDispatch({page: 'pop'})}>
            <HeaderThreeButton
                title='Menu'
                isHome={true}
                navPress={() => leftMenuRef.current.navigateMenu()}
                searchPress={() => snackbarRef.current.ShowSnackBarFunction('search clicked')}
                morePress={() => snackbarRef.current.ShowSnackBarFunction('more clicked')}
                bgColor='#8e24aa'
            />
            <SwipeMenuLeft
                ref={leftMenuRef}
                menuWidth={300}
                renderMenuComponent={() => <LeftMenuContainer onMenuPress={onMenuPress}/>}
                renderPage={() => <DummyPage/>}
            />
            <MaterialSnackbar ref={snackbarRef}/>
        </SwipeBackView>
    );
}

function LeftMenuContainer({onMenuPress}) {
    const [selected, setSelected] = useState(new Map());

    const onSelect = useCallback(
        (id, title) => {
            const newSelected = new Map();
            newSelected.set(id, !selected.get(id));
            setSelected(newSelected);
            onMenuPress(title);
        },
        [selected],
    );

    return (
        <View style={{flex: 1, paddingTop: 15, backgroundColor: '#f1f5f7'}}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                marginHorizontal: 20,
                marginBottom: 20,
                paddingRight: 15,
                elevation: 3,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3
            }}>
                <MaterialInput style={{flex: 1}} bgColor='transparent' margin={0} placeholder='Search'/>
                <Image source={require('../../assets/icon/ic_search_gray.png')}
                       style={{height: 18, width: 18, resizeMode: 'contain'}}/>
            </View>
            <View style={{width: '100%'}}>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <ItemMenu
                        data={item}
                        onMenuPress={onMenuPress}
                        selected={!!selected.get(item.id)}
                        onSelect={onSelect}
                    />}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

function ItemMenu({data, selected, onSelect}) {
    return (
        <TouchableOpacity onPress={() => onSelect(data.id, data.title)}
                          style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              borderLeftWidth: 4,
                              borderLeftColor: selected ? '#2979ff' : 'transparent',
                              borderTopColor: '#e5e9eb',
                              borderTopWidth: 1,
                              paddingVertical: 15,
                              paddingHorizontal: 30
                          }}>
            <Text style={{fontSize: 14, color: selected ? '#2979ff' : '#616161', fontWeight: selected ? 'bold' : 'normal'}}>{data.title}</Text>
            <View style={{
                width: 21,
                height: 21,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: selected ? 13 : 4,
                marginLeft: 10,
                backgroundColor: selected ? '#2979ff' : '#cfd8dc',
                opacity: data.notifCount > 0 ? 1 : 0
            }}>
                <Text style={{fontSize: 12, color: 'white'}}>{data.notifCount}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default MenuStyle8;