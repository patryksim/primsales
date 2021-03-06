import React, {useContext, useRef, useState} from 'react';
import {ScrollView, Dimensions, FlatList, Image, Text, View, ImageBackground, TouchableOpacity} from "react-native";
import {PageContext} from "../../../App";
import MaterialSnackbar from "../../components/MaterialSnackbar";
import HeaderShopping from "../../components/HeaderShopping";
import {storageImageUrl} from "../../tools/Helpers";
import ViewPagerIndicator from "../../components/ViewPagerIndicator";
import SizeSelector from "../../components/SizeSelector";
import MaterialButton from "../../components/MaterialButton";

const DATA = [
    {id: '1', title: 'Sky Blue Dress', image: 'ecommerce_3_img_1.jpg', price: '225'},
    {id: '2', title: 'Sky Blue Dress', image: 'ecommerce_3_img_2.jpg', price: '225'},
    {id: '3', title: 'Zara Jumpsuit Dress', image: 'ecommerce_3_img_3.jpg', price: '225'},
    {id: '4', title: 'Black Faux Leather', image: 'ecommerce_3_img_4.jpg', price: '225'},
    {id: '5', title: 'Sky Blue Dress', image: 'ecommerce_3_img_5.jpg', price: '225'},
    {id: '6', title: 'Sky Blue Dress', image: 'ecommerce_3_img_6.jpg', price: '225'},
];

const screenWidth = (Dimensions.get('window').width);

function EcommerceStyle18() {
    const pageContext = useContext(PageContext);
    const snackbarRef = useRef(null);
    const [page, setPage] = useState(0);
    const flatlistRef = useRef(null);
    const onViewRef = useRef((viewableItems) => {
        setPage(viewableItems.viewableItems[0].index);
    });
    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <HeaderShopping
                title='Ecommerce'
                isHome={false}
                searchAction={true}
                moreAction={true}
                navPress={() => pageContext.pageDispatch({page: 'pop'})}
                searchPress={() => snackbarRef.current.ShowSnackBarFunction('search clicked')}
                cartPress={() => snackbarRef.current.ShowSnackBarFunction('cart clicked')}
                morePress={() => snackbarRef.current.ShowSnackBarFunction('more clicked')}
                bgColor='#ff9800'
                shadow={false}
            />
            <ScrollView>
                <View style={{
                    backgroundColor: 'white',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    borderRadius: 3,
                    elevation: 3,
                }}>
                    <View>
                        <FlatList
                            ref={flatlistRef}
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            data={[{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}]}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => <Image
                                source={{uri: storageImageUrl('ecommerce', 'ecommerce_18_img_1.jpg')}}
                                style={{width: screenWidth, height: 400}}/>}
                            onViewableItemsChanged={onViewRef.current}
                            viewabilityConfig={viewConfigRef.current}
                        />
                        <View style={{alignItems: 'center', position: 'absolute', bottom: 15, left: 0, right: 0}}>
                            <ViewPagerIndicator numPages={4} activeIndex={page} defaultColor='#e0e0e0'
                                                activeColor='#ff9800'/>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 15
                    }}>
                        <View>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#263238'}}>Black Faux Leather</Text>
                            <Text style={{fontSize: 14, color: '#9e9e9e', marginTop: 5}}>Women, Dress, Summer</Text>
                        </View>
                        <Text style={{fontSize: 20, color: '#ff9800'}}>$225</Text>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor: '#eaeef0'}}>
                        <SizeSelector style={{margin: 20}}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderTopColor: '#eaeef0',
                        borderBottomWidth: 1,
                        borderBottomColor: '#eaeef0'
                    }}>
                        <ButtonSelectorColor onPress={() => snackbarRef.current.ShowSnackBarFunction('color clicked')}/>
                        <View style={{width: 1, height: '100%', backgroundColor: '#eaeef0'}}/>
                        <ButtonSelectorQuantity
                            onPress={() => snackbarRef.current.ShowSnackBarFunction('quantity clicked')}/>
                    </View>
                    <Text style={{fontSize: 14, color: '#9e9e9e', lineHeight: 22, padding: 15}}>Weasel
                        the jeeper
                        goodness inconsiderately spelled
                        so ubiquitous amused knitted and altruistic amiable
                        far much toward.</Text>
                </View>

                <View style={{
                    marginTop: 10,
                    backgroundColor: 'white',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    borderRadius: 3,
                    elevation: 3,
                }}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: '#616161', marginLeft: 10, marginTop: 15}}>RELATED PRODUCTS</Text>
                    <FlatList
                        contentContainerStyle={{padding: 5}}
                        horizontal
                        data={DATA}
                        renderItem={({item}) => <CardItem data={item}/>}
                        keyExtractor={item => item.id}
                    />
                </View>

                <MaterialButton title='Add to Cart'
                                style={{
                                    width: screenWidth - 20,
                                    height: 50,
                                    marginTop: 10,
                                    marginHorizontal: 10,
                                    backgroundColor: '#ff9800'
                                }}
                                buttonPress={() => snackbarRef.current.ShowSnackBarFunction('add to cart clicked')}/>
                <MaterialButton title='Add to Wishlist'
                                style={{
                                    width: screenWidth - 20,
                                    height: 50,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    backgroundColor: 'white'
                                }}
                                buttonPress={() => snackbarRef.current.ShowSnackBarFunction('Add to wishlist clicked')}/>
            </ScrollView>
            <MaterialSnackbar ref={snackbarRef}/>
        </View>
    );
}

function CardItem({data}) {
    let cardMargin = 5;
    let cardWidth = (screenWidth / 2) - (cardMargin * 3);

    return (
        <View style={{
            width: cardWidth,
            margin: cardMargin,
        }}>
            <View style={{height: 190, overflow: 'hidden',}}>
                <Image style={{height: '100%', width: '100%'}}
                       source={{uri: storageImageUrl('ecommerce', data.image)}}/>
            </View>
            <View style={{padding: 10}}>
                <Text style={{fontSize: 14, color: '#263238'}}>{data.title}</Text>
                <Text style={{fontSize: 12, color: '#ff9800', marginTop: 5}}>${data.price}</Text>
            </View>
        </View>
    )
}

function ButtonSelectorColor({onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
        }}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#616161'}}>COLOR</Text>
            <View style={{width: 36, height: 36, backgroundColor: '#bde2da', borderRadius: 5}}/>
        </TouchableOpacity>
    );
}

function ButtonSelectorQuantity({onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 20
        }}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#616161'}}>QUANTITY</Text>
            <Image source={require('../../assets/icon/ic_chevron_right.png')}
                   style={{height: 16, width: 12, tintColor: '#bdbdbd', resizeMode: 'contain'}}/>
        </TouchableOpacity>
    );
}

export default EcommerceStyle18;