import React, {useContext, useRef, useState, useEffect} from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {PageContext} from "../../../App";
import MaterialSnackbar from "../../components/MaterialSnackbar";
import {storageImageUrl} from "../../tools/Helpers";
import MultiColumnView from "../../components/MultiColumnView";
import HeaderFourButton from "../../components/HeaderFourButton";

const DATA2 = [
    {id: '1', image: 'gallery_1_img_6.jpg'},
    {id: '2', image: 'gallery_1_img_7.jpg'},
    {id: '3', image: 'gallery_1_img_8.jpg'},
    {id: '4', image: 'gallery_1_img_9.jpg'},
    {id: '5', image: 'gallery_1_img_10.jpg'},
    {id: '6', image: undefined},
];

const screenWidth = Dimensions.get('window').width;

function GalleryStyle6() {
    const pageContext = useContext(PageContext);
    const snackbarRef = useRef(null);
    const [numSelected, setNumSelected] = useState(0);
    const [dataEdit, setDataEdit] = useState([]);

    useEffect(() => {
        let newData = [];
        newData.push({id: '1', isSelected: false, image: 'gallery_1_img_1.jpg'});
        newData.push({id: '2', isSelected: false, image: 'gallery_1_img_2.jpg'});
        newData.push({id: '3', isSelected: false, image: 'gallery_1_img_3.jpg'});
        newData.push({id: '4', isSelected: false, image: 'gallery_1_img_4.jpg'});
        newData.push({id: '5', isSelected: false, image: 'gallery_1_img_5.jpg'});
        newData.push({id: '6', isSelected: false, image: undefined});
        setDataEdit(newData);
    }, []);

    const onItemClick = (dt) => {
        let newData = [];
        dataEdit.map((d) => {
            if (dt.id === d.id){
                if (d.isSelected){
                    setNumSelected(numSelected - 1)
                } else {
                    setNumSelected(numSelected + 1)
                }
                dt.isSelected = !dt.isSelected;
                newData.push(dt)
            } else {
                newData.push(d)
            }
        });
        setDataEdit(newData);
    };

    const showSnacbar = (message) => {
        snackbarRef.current.ShowSnackBarFunction(message)
    };

    const screenTitle = numSelected > 0 ? numSelected + ' Selected' : 'Gallery';

    return (
        <View style={{flex: 1, backgroundColor: '#f1f5f7'}}>
            <HeaderFourButton
                title={screenTitle}
                isHome={true}
                isEdit={numSelected > 0}
                navPress={() => pageContext.pageDispatch({page: 'pop'})}
                editPress={() => numSelected > 0 ? showSnacbar('share clicked') : showSnacbar('edit clicked')}
                searchPress={() => numSelected > 0 ? showSnacbar('delete clicked') : showSnacbar('search clicked')}
                morePress={() => showSnacbar('more clicked')}
                bgColor='#8bc34a'
            />
            <ScrollView contentContainerStyle={{paddingVertical: 5}}>
                <ListDataImage data={dataEdit} title='Minimal Interior' onItemClick={onItemClick}/>
                <ListDataImage data={DATA2} title='Women' onItemClick={() => {
                }}/>
                <ListDataImage data={DATA2} title='Nature' onItemClick={() => {
                }}/>
            </ScrollView>
            <MaterialSnackbar ref={snackbarRef}/>
        </View>
    );
}

function ListDataImage({data, title, onItemClick}) {
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingVertical: 20,
                backgroundColor: 'white',
            }}>
                <Text style={{fontSize: 14, color: '#616161'}}>{title}</Text>
                <Text style={{fontSize: 12, color: '#bdbdbd'}}>24 Photos</Text>
            </View>
            <MultiColumnView
                containerStyle={{padding: 5}}
                data={data}
                numColumns={3}
                renderItem={(item, numColumns) => <ItemData data={item} onItemClick={onItemClick}/>}
            />
        </View>
    );
}

function ItemData({data, onItemClick}) {
    if (data.image === undefined) {
        return (
            <View style={{width: (screenWidth / 3), paddingHorizontal: 4, paddingVertical: 2}}>
                <View style={{
                    height: 110,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{fontSize: 27, color: '#8c8c8c'}}>136</Text>
                    <Text style={{fontSize: 12, color: '#8c8c8c'}}>more</Text>
                </View>
            </View>
        );
    } else {
        return (
            <TouchableOpacity onPress={() => onItemClick(data)}
                              style={{width: (screenWidth / 3), paddingHorizontal: 4, paddingVertical: 2}}>
                <Image source={{uri: storageImageUrl('gallery', data.image)}}
                       style={{height: 110, justifyContent: 'flex-end'}}/>
                {data.isSelected && (
                    <View style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: '#448aff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}>
                        <Image source={require('../../assets/icon/ic_check.png')}
                               style={{height: 14, width: 14, tintColor: 'white', resizeMode: 'contain'}}/>
                    </View>
                )}
            </TouchableOpacity>
        );
    }
}

export default GalleryStyle6;