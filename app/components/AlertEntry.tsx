import { Image, Linking, Pressable, StyleSheet, Text } from 'react-native';
import { recallData } from '../type/recall';

export function AlertEntry({ data }: {data: recallData}) {
    const handlePress = () => {
        Linking.openURL(data.link);
    };

    return <Pressable style = {styles.container} onPress={ handlePress }>
        <Image source = {require('../../assets/images/food-icon.png')}  style = {styles.img}></Image>
        <Text style = {styles.title} numberOfLines={2} ellipsizeMode="tail">{data.title}</Text>
        <Text style = {styles.product } numberOfLines={1} ellipsizeMode="tail">{data.product}</Text>
        <Text style = {styles.issue} numberOfLines={2} ellipsizeMode="tail">{data.issue}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        width: 438,
        height: 200,
        backgroundColor: '#ffffff',
        position: 'relative',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 40,
        marginBottom: 10,
        left: 5,
    },
    title: {
        fontSize: 25,
        position: 'absolute',
        top: 25,
        left: 140,
        width: 290,
        height: 85,
        textAlign: 'center',
    },
    product: {
        fontSize: 15,
        position: 'absolute',
        top: 90,
        left: 210,
        width: 220,
        height: 172,
    },
    issue: {
        fontSize: 15,
        position: 'absolute',
        top: 120,
        left: 210,
        width: 220,
        height: 172,
    },
    img: {
        width: 110,
        height: 110,
        position: 'absolute',
        top: 50,
        left: 10,
    }
})
export default AlertEntry;

