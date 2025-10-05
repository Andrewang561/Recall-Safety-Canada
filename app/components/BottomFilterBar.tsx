import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FilterKey = 'product' | 'transport' | 'health' | 'food';

export type FilterState = Record<FilterKey, boolean>;

type Props = {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

export default function BottomFilterBar({filters, setFilters}: Props){
    const toggleFilter = (key: FilterKey) =>{
        setFilters((prev) => {

          const updated = { ...prev, [key]: !prev[key] };

          const allOff = Object.values(updated).every((v) => v === false);
          if (allOff) {
            return {
              product: true,
              transport: true,
              health: true,
              food: true,
            };
          }
          return updated;
        });
    };

    return (
        <View style = {styles.container}>
            {(Object.keys(filters) as FilterKey[]).map((key) =>(
                <TouchableOpacity
                    key ={key}
                    style={[styles.tab, filters[key] && styles.activeTab]}
                    onPress={() => toggleFilter(key)}>
                    <Text style={[styles.text, filters[key] && styles.activeText]}>
                        {key.charAt(0).toUpperCase()+key.slice(1)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 30,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  text: {
    color: '#333',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});