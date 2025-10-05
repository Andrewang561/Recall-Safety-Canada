import { useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { recallData } from '../type/recall';

export function AlertEntry({ data }: { data: recallData }) {
  const [expanded, setExpanded] = useState(false);

  const imageMap: Record<string, any> = {
    transport: require('../../assets/images/transport-logo.png'),
    health: require('../../assets/images/health.webp'),
    product: require('../../assets/images/product-logo.png'),
    food: require('../../assets/images/food-icon.png'),
  };

  const imageSource = imageMap[data.label];

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Pressable style={styles.container} onPress={toggleExpanded}>
      {/* Header row: image + summary text */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {data.title}
        </Text>
        {!expanded &&(
          <View style={styles.bottomRow} collapsable={false}>
            <Image source={imageSource} style={styles.img} />
            <View style={styles.textBlock}>
              <Text style={styles.product} numberOfLines={2} ellipsizeMode="tail">
                <Text style={styles.detail}>Product:</Text> {data.product}
              </Text>
              <Text style={styles.issue} numberOfLines={2} ellipsizeMode="tail">
                <Text style={styles.detail}>Issue:</Text> {data.issue}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Dropdown when expanded */}
      {expanded && (
        <View style={styles.dropdown} collapsable={false}>
          <Text style={styles.detail}>What to do:</Text>
          <Text style={styles.subtitle}>{data.wtd}</Text>
          <Text style={styles.detail}>Product:</Text>
          <Text style={styles.subtitle}>{data.product}</Text>
          <Text style={styles.detail}>Issue:</Text>
          <Text style={styles.subtitle}>{data.issue}</Text>
          <Text style={styles.detail}>Type:</Text>
          <Text style={styles.subtitle}>{data.recall_type}</Text>
          <Text style={styles.detail}>Audience:</Text>
          <Text style={styles.subtitle}>{data.audience}</Text>
          <Text style={styles.detail}>Distribution:</Text>
          <Text style={styles.subtitle}>{data.distribution}</Text>
          <Text style={styles.detail}>Date:</Text>
          <Text style={styles.subtitle}>{data.date}</Text>
          <View style={styles.imglink_container}>
            <Image source={imageSource} style={styles.img} />
            <Text
              style={[styles.detail, styles.link]}
              onPress={() => Linking.openURL(data.link)}>
              Learn More →
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%', // instead of 100%, adds space on sides
    alignSelf: 'center', // centers the card horizontally
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 25,
    marginBottom: 20, // more space between cards
    paddingVertical: 24, // increased vertical padding
    paddingHorizontal: 24, // increased side padding
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4, // better shadow for Android
  },
  header: {
    flexDirection: 'column',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 15,
    alignSelf: 'flex-end',
    // marginRight: 20,
  },
  bottomRow:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textBlock: {
    flex: 1,
    flexShrink: 1,
    justifyContent:'flex-end',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  product: {
    fontSize: 15,
    color: '#333',
    marginBottom: 3,
  },
  issue: {
    fontSize: 15,
    color: '#444',
  },
  dropdown: {
    marginTop: 18,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 12,
    paddingLeft: 4,
  },
  detail: {
    fontSize: 15,
    marginTop: 6,
    fontWeight: 'bold'
  },
   subtitle: {
    fontSize: 15
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 12,
    fontWeight: '500',
    marginRight: 10,
  },
  imglink_container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'flex-end',
  }
});

export default AlertEntry;
