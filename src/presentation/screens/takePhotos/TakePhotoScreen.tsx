import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Image, Pressable, Text, View } from 'react-native';
import { launchCamera, ImagePickerResponse, CameraOptions } from 'react-native-image-picker';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'TakePhoto'> { }

export const TakePhotoScreen = ({ navigation }: Props) => {

    const [image, setImage] = useState<string>('https://placehold.co/300');

    //permitira la toma de fotos cancelacion  de estas
    const takePhoto = async (): Promise<void> => {
        const options: CameraOptions = {
            mediaType: 'photo',
            includeBase64: true,
        };

        launchCamera(options, (response: ImagePickerResponse) => {
            if (response.errorCode) {
                console.log(response.errorMessage);
            } else if (response.didCancel) {
                console.log('El usuario cancelo la fotografia');
            } else {
                const uri = response.assets?.[0]?.uri;
                if (uri) {
                    setImage(uri);
                }
            }
        });
    };

    //peticion para enviar la foto al backend 
    const savePhoto = async (): Promise<void> => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            const response = await axios.post('http://192.168.1.4:7122/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Imagen subida exitosamente: ', response.data);
        } catch (error) {
            console.log('Error al subir la imagen: ', error);
        }
        navigation.navigate('ShowPhotos');
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#708871',
            }}
        >
            <Pressable
                style={{
                    justifyContent: 'center',
                    backgroundColor: '#1A3636',
                    width: 110,
                    height: 50,
                    borderRadius: 10,
                }}
                onPress={takePhoto}
            >
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        color: 'white',
                    }}
                >
                    Tomar Foto
                </Text>
            </Pressable>

            <Image
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    height: 300,
                    width: 300,
                    marginTop: 15,
                }}
                source={{ uri: image }}
            />

            <Pressable
                style={{
                    justifyContent: 'center',
                    backgroundColor: '#1A3636',
                    width: 110,
                    height: 50,
                    borderRadius: 10,
                    marginTop: 20,
                }}
                onPress={savePhoto}
            >
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        color: 'white',
                    }}
                >
                    Guardar
                </Text>
            </Pressable>
        </View>
    );
};