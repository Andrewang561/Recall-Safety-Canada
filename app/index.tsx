import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from "react-native";
import { AlertEntry } from './components/AlertEntry';
import { supabase } from './components/supabase';
import { recallData } from './type/recall';

export default function Index() {
  const [recalls, setRecalls] = useState<recallData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase
        .from('Page_Data')
        .select('*')
        .limit(10);

        if (error) console.error(error);
        else setRecalls(data);
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
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      {recalls.map((recall) => (
        <AlertEntry data = { recall } />
      ))}
    </ScrollView>
  );
}
