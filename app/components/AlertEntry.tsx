import { Image, Linking, Pressable, StyleSheet, Text } from 'react-native';

export function AlertEntry() {
    const handlePress = () => {
        Linking.openURL("https://recalls-rappels.canada.ca/en/alert-recall/pistachio-raw-recalled-due-salmonella");
    };

    return <Pressable style = {styles.container} onPress={ handlePress }>
        <Image source = {require('../../assets/images/food-icon.png')}  style = {styles.img}></Image>
        <Text style = {styles.title}>Pistachio Raw recalled due to Salmonella</Text>
        <Text style = {styles.body}>Product: Pistachio Raw Issue : Food - Microbial contamination -Salmonella</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        width: 438,
        height: 200,
        backgroundColor: '#ffffff',
        position: 'relative',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
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

