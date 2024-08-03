import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ViewPhotos } from '../../components/viewPhoto';

export const ShowPhotosScreen = () => {
    return (
        <ScrollView>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                <ViewPhotos />
            </View>
        </ScrollView>
    );
};
