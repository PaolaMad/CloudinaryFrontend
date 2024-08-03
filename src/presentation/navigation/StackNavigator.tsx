import { createStackNavigator } from '@react-navigation/stack';
import { TakePhotoScreen } from '../screens/takePhotos/TakePhotoScreen';
import { ShowPhotosScreen } from '../screens/showPhotos/ShowPhotosScreen';

export type RootStackParams = {
    TakePhoto: undefined,
    ShowPhotos: undefined,
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='TakePhoto'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
            <Stack.Screen name="ShowPhotos" component={ShowPhotosScreen} />
        </Stack.Navigator>
    );
}
