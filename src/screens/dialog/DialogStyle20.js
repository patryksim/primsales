import React, {useContext, useRef, useState} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import {PageContext} from '../../../App';
import HeaderOneButton from '../../components/HeaderOneButton';
import Root from './Root';
import ModalContent from '../../components/ModalContent';
import {
    Button, ButtonClose,
    Card,
    RoundButton,
} from './DialogComponent';
import MaterialSnackbar from '../../components/MaterialSnackbar';
import ComboBox from '../../components/ComboBox';

const dummyArr = [
    {
        title: 'White',
        value: 'white',
        checked: false,
    },
    {
        title: 'Black',
        value: 'black',
        checked: false,
    },
    {
        title: 'Red',
        value: 'red',
        checked: false,
    },
    {
        title: 'Green',
        value: 'green',
        checked: false,
    },
    {
        title: 'Blue',
        value: 'blue',
        checked: false,
    },
];
export default function () {
    const [visible, setVisible] = useState(false);
    const [value, onChangeText] = useState('');
    const snackbarRef = useRef(null);
    const onPress = () => {
        return (e) => {
            console.warn(e);
        };
    };
    return (
        <Root>
            <ModalContent visible={visible} onBackDropPress={() => setVisible(!visible)} style={{padding: 30}}>
                <Card style={{backgroundColor: '#323545', minHeight: 440}}>
                    <ButtonClose onClose={() => setVisible(!visible)} tintColor={'#FFF'}/>
                    <View style={{alignItems: 'center', marginTop: 70}}>
                        <Image style={{width: 80, height: 80}} source={require('../../assets/dialog/person.png')}/>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 25}}>
                        <Text style={[{fontWeight: 'bold', fontSize: 22, marginBottom:10},style.txt]}>John Doe</Text>
                        <Text style={{
                            color: '#FFF',
                            textAlign: 'center',
                        }}>{`Integer ultricies semper\nnibh eget mattis. Sed`}</Text>
                    </View>
                    <View
                        style={{height: 90, paddingHorizontal: 90, justifyContent: 'center'}}>
                        <RoundButton onPress={() => setVisible(!visible)} style={{backgroundColor: '#2dc0b0'}}
                                     textStyle={{color: '#FFF', fontWeight: 'bold'}}>
                            Retry
                        </RoundButton>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={[{fontWeight:"bold"},style.txt]}>51.3K</Text>
                            <Text style={[style.txt]}>Follower</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={[{fontWeight:"bold"},style.txt]}>103</Text>
                            <Text style={[style.txt]}>Following</Text>
                        </View>
                    </View>
                </Card>
            </ModalContent>
            <RoundButton onPress={() => setVisible(!visible)} textStyle={{color: '#FFF'}}>
                Click me!
            </RoundButton>
            <MaterialSnackbar ref={snackbarRef}/>
        </Root>
    );
}

const ListWithIcon = ({title = 'Title'}) => {
    return (
        <View style={{flexDirection: 'row', height: 45}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#1e1e1e'}}>
                    {title}
                </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text>
                    -
                </Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    txt:{
        color:'#FFF'
    }
})
