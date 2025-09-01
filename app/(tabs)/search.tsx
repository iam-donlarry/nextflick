import { View, Text , Image, FlatList, ActivityIndicator} from 'react-native'
import React, { useEffect } from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import SearchBar from '@/components/SearchBar';
import {useState} from 'react'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { 
      data: movies, 
      loading, 
      error,
      refetch: loadingMovies,
      reset,
    }  = useFetch(() => fetchMovies({ 
      query: searchQuery
  }), false)

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
        if (searchQuery.trim()) {
          await loadingMovies();
        } else {
          reset()
        }
      }, 500); // Adjust the delay as neededfunc();

      return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>

      <FlatList 
          data={movies} 
          renderItem={({item}) => <MovieCard {...item}/>}
          keyExtractor={(item) => item.id.toString()}
          className='px-5'
          numColumns={3}
          columnWrapperStyle={{ 
            justifyContent: 'flex-start', 
            gap: 16, 
            marginVertical: 16 
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>  
              <View className='w-full flex-row justify-center mt-20 items-center'>  
                <Image source={icons.logo} className='w-12 h-10' resizeMode='contain'/>
              </View>
              <View className='w-full flex-row justify-center mt-5 items-center mb-10'>
                   <SearchBar 
                    placeholder='what do you want to watch?'
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    />
              </View>

              {loading && (
               <ActivityIndicator size="large" color="#0000ff" className="my-3"/>
              )}
              {error && (
                <Text className='text-red-500 px-5 my-3'>Error: {error.message}</Text> 
              )}

              {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                <Text className='text-white text-lg font-bold mb-3'>
                    Search Results for {' '}
                    <Text className='text-accent'>{searchQuery}</Text>
                </Text>
              )}

            </>
          }

          ListEmptyComponent={
            !loading && !error ? (
              <View className='mt-10 px-5'>
                <Text className='text-white  text-center'>
                  {searchQuery.trim() ? 'No movies found' : 'Start typing to search for movies'}
                </Text>
              </View>
            ) : null
          }
      />
    </View>
  )
}

export default search