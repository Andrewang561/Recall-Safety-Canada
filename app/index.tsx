import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View
} from "react-native";
import { AlertEntry } from './components/AlertEntry';
import { supabase } from './components/supabase';
import { recallData } from './type/recall';

export default function HomeScreen() {
  const [recalls, setRecalls] = useState<recallData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('Page_Data')
          .select('*')
          .limit(20);

        if (error) console.error(error);
        else setRecalls(data);
      } catch {
        throw new Error("Failed to retrieve data from database");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f5f7fa' }}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* 🧭 HEADER SECTION */}
      <View
        style={{
          paddingTop: 70,
          paddingBottom: 28,
          backgroundColor: '#0a3d62',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Text
          style={{
            color: '#ffffff',
            fontSize: 30,
            fontWeight: '600',
            letterSpacing: 0.8,
            textAlign: 'center',
          }}
        >
          Recall Safety Canada
        </Text>
        <Text
          style={{
            color: '#cce4ff',
            fontSize: 15,
            textAlign: 'center',
            marginTop: 6,
            opacity: 0.9,
          }}
        >
          Stay updated on the latest recalls
        </Text>
      </View>

      {/* 🇨🇦 CANADA FLAG + SUBTEXT */}
      <View style={{ alignItems: 'center', marginVertical: 18 }}>
        <Image
          source={require('../assets/images/canada-flag.png')}
          style={{ width: 65, height: 42, resizeMode: 'contain' }}
        />
        <Text style={{ fontSize: 13, color: '#555', marginTop: 6 }}>
          Data from Government of Canada Recalls
        </Text>
      </View>

      {/* 🔍 SEARCH BAR (placeholder for now) */}
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 12,
          paddingHorizontal: 18,
          paddingVertical: 12,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 4,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#777', fontSize: 15 }}>🔍 Search recalls...</Text>
      </View>

      {/* 🔔 ALERT LIST */}
      <View style={{ alignItems: 'center' }}>
        {recalls.map((recall) => (
          <AlertEntry key={recall.id} data={recall} />
        ))}
      </View>
    </ScrollView>
  );
}
