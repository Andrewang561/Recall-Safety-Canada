import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from "react-native";
import { AlertEntry } from './components/AlertEntry';
import SupabaseTest from './components/SupabaseTest';
import { recallData } from './type/recall';

export default function Index() {
  const [recalls, setRecalls] = useState<recallData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api_placeholder');
        const data: recallData[] = await response.json();
        setRecalls(data);
      } catch {
        throw new Error("Failed to retreive data from database");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size = "large" />
      </View>
    );
  }


  return (
    <div>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      {recalls.map((recall) => (
        <AlertEntry data = { recall } />
      ))}
    </ScrollView>
    <SupabaseTest/>
    </div>
  );
}
