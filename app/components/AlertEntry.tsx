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
          <Text style={styles.detail}>Type: {data.recall_type}</Text>
          <Text style={styles.detail}>Audience: {data.audience}</Text>
          <Text style={styles.detail}>Distribution: {data.distribution}</Text>
          <Text style={styles.detail}>Date: {data.date}</Text>
          <Text
            style={[styles.detail, styles.link]}
            onPress={() => Linking.openURL(data.link)}
          >
            View full recall →
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    marginBottom: 12,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  textBlock: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  product: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  issue: {
    fontSize: 14,
    color: '#444',
  },
  dropdown: {
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  detail: {
    fontSize: 14,
    marginTop: 4,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default AlertEntry;
