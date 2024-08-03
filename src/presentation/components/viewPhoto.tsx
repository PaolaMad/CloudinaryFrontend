import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

export const ViewPhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://192.168.1.4:7122/api');
        setPhotos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <View>
      {photos.map((photo, index) => (
        <View
          key={index}
          style={{
            height: 200,
            width: 200,
            margin: 10,
          }}
        >
          <Image
            style={{
              flex: 1,
            }}
            source={{ uri: photo }}
          />
        </View>
      ))}
    </View>
  );
};