import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Search from './Search';

export default function HeaderChat({ title = 'Mensajes', placeholder }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Search placeholder={placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 150,
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        zIndex: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15
    },

});