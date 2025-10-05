import { Image, Linking, Pressable, StyleSheet, Text } from 'react-native';
import { recallData } from '../type/recall';

export function AlertEntry({ data }: {data: recallData}) {
    const handlePress = () => {
        Linking.openURL(data.link);

    };

    return <Pressable style = {styles.container} onPress={ handlePress }>
        <Image source = {require('../../assets/images/food-icon.png')}  style = {styles.img}></Image>
        <Text style = {styles.title}>{data.title}</Text>
        <Text style = {styles.body}>{data.product}</Text>
        <Text style = {styles.body}>{data.issue}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        width: 438,
        height: 200,
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    title: {
        fontSize: 28,
        position: 'absolute',
        top: 15,
        left: 117,
        width: 331,
        height: 85,
        textAlign: 'center',
    },
    body: {
        fontSize: 15,
        position: 'absolute',
        top: 105,
        left: 181,
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

