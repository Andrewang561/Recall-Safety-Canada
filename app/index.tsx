import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { AlertEntry } from './components/AlertEntry';
import BottomFilterBar, { FilterState } from './components/BottomFilterBar';
import { supabase } from './components/supabase';
import { recallData } from './type/recall';

export default function HomeScreen() {
  const [recalls, setRecalls] = useState<recallData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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
   <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
     <ScrollView
       style={{ flex: 1 }}
       contentContainerStyle={{ paddingBottom: 60 }}
     >
       {/* 🧭 HEADER SECTION */}
       <View
         style={{
           paddingTop: 70,
           paddingBottom: 28,
           backgroundColor: "#0a3d62",
           shadowColor: "#000",
           shadowOpacity: 0.2,
           shadowOffset: { width: 0, height: 2 },
           shadowRadius: 5,
           elevation: 3,
         }}
       >
         <Text
           style={{
             color: "#ffffff",
             fontSize: 30,
             fontWeight: "600",
             letterSpacing: 0.8,
             textAlign: "center",
           }}
         >
           Recall Safety Canada
         </Text>
         <Text
           style={{
             color: "#cce4ff",
             fontSize: 15,
             textAlign: "center",
             marginTop: 6,
             opacity: 0.9,
           }}
         >
           Stay updated on the latest recalls
         </Text>
       </View>

       {/* 🇨🇦 CANADA FLAG + SUBTEXT */}
       <View style={{ alignItems: "center", marginVertical: 18 }}>
         <Image
           source={require("../assets/images/canada-flag.png")}
           style={{ width: 65, height: 42, resizeMode: "contain" }}
         />
         <Text style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
           Data from Government of Canada Recalls
         </Text>
       </View>

       {/* Search Bar */}
       <View
         style={{
           marginHorizontal: 20,
           backgroundColor: "#fff",
           borderRadius: 12,
           paddingHorizontal: 18,
           paddingVertical: 12,
           shadowColor: "#000",
           shadowOpacity: 0.08,
           shadowRadius: 4,
           marginBottom: 20,
         }}
       >
         <TextInput
           placeholder="Search..."
           value={searchQuery}
           onChangeText={setSearchQuery}
           style={{ fontSize: 15, color: "#333" }}
         />
       </View>

       {/* 🔔 ALERT LIST */}
       <View style={{ alignItems: "center", paddingBottom: 20 }}>
         {(() => {
           const filteredRecalls = recalls.filter((recall) => {
             const label = recall.label as keyof FilterState;
             const matchesCategory = filters[label];
             const matchesSearch =
               recall.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               recall.product
                 .toLowerCase()
                 .includes(searchQuery.toLowerCase()) ||
               (recall.issue &&
                 recall.issue
                   .toLowerCase()
                   .includes(searchQuery.toLowerCase()));
             return matchesCategory && matchesSearch;
           });

           if (filteredRecalls.length === 0) {
             return (
               <Text style={{ color: "#777", marginTop: 30 }}>
                 No entries found
               </Text>
             );
           }

           return filteredRecalls.map((recall) => (
             <AlertEntry key={recall.id} data={recall} />
           ));
         })()}
       </View>
     </ScrollView>

     {/* ⚙️ Bottom Filter Bar */}
     <BottomFilterBar filters={filters} setFilters={setFilters} />
   </View>
 );
}