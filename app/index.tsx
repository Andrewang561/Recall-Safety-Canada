import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from "react-native";
import { AlertEntry } from './components/AlertEntry';
import BottomFilterBar, { FilterState } from './components/BottomFilterBar';
import { supabase } from './components/supabase';
import { recallData } from './type/recall';

export default function Index() {
  const [recalls, setRecalls] = useState<recallData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    product: true, 
    transport: true, 
    health: true, 
    food: true, 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase
        .from('Page_Data')
        .select('*');

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
    <View style ={{flex:1}}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {recalls.filter((recall) => {
          const label = recall.label as keyof FilterState;
          return filters[label];
        }).map((recall) => (
          <AlertEntry key = { recall.id} data = { recall } />
        ))}
      </ScrollView>
      <BottomFilterBar filters={filters} setFilters={setFilters}/>
    </View>
  );
}
