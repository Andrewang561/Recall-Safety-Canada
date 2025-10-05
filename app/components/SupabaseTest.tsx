import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { supabase } from './supabase';

type Recall = {id: string; title: string; additional_info: string | null;};

function SupabaseTest() {
    const [recall, setRecall] = useState<Recall | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect (()=>{
        const load = async () => {
        const {data, error} = await supabase
        .from('StaticTestData')
        .select('*')
        .eq("id", "6a3b1b2a-4e23-4d9e-b02f-8a0c9b91a1f5")
        .single();

        if (error) setError(error.message);
        else setRecall(data);
        };

        load();
    },[]);

    if (error) return <Text>Error: {error}</Text>;
    if (!recall) return <Text>Loading...</Text>;

  return (
    <View>
        <Text>{recall.title}</Text>
        <Text>{recall.additional_info}</Text>
    </View>
  );
}

export default SupabaseTest