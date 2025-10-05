import { useState } from 'react';
import {
    Image,
    LayoutAnimation,
    Linking,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    UIManager,
    View,
} from 'react-native';
import { recallData } from '../type/recall';

// Enable animation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <Pressable style={styles.container} onPress={toggleExpanded}>
      {/* Header row: image + summary text */}
      <View style={styles.header}>
        <Image source={imageSource} style={styles.img} />
        <View style={styles.textBlock}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {data.title}
          </Text>
          <Text style={styles.product} numberOfLines={1} ellipsizeMode="tail">
            Product: {data.product}
          </Text>
          <Text style={styles.issue} numberOfLines={2} ellipsizeMode="tail">
            Issue: {data.issue}
          </Text>
        </View>
      </View>

      {/* Dropdown when expanded */}
      {expanded && (
        <View style={styles.dropdown}>
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
          <Text style={styles.detail}>Date: {data.date}</Text>
          <Text style={styles.subtitle}>{data.date}</Text>
          <Text
            style={[styles.detail, styles.link]}
            onPress={() => Linking.openURL(data.link)}
          >
            Learn More →
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 20,
  },
  textBlock: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 6,
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
  },
});

export default AlertEntry;
