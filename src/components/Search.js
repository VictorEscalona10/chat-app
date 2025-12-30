import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';


export default function Search({ placeholder = 'Busca un chat' }) {
    const [onFocused, setOnFocused] = useState(false);
    return (
        <View
            style={styles.searchContainer}
        >
            <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 12 }}>
                <Feather name="search" size={24} color="#636363" />
            </TouchableOpacity>
            <TextInput placeholder={placeholder} style={styles.searchInput} />
        </View>

    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f2f3ff',
        borderRadius: 10,
    },

    searchContainerFocused: {
        borderColor: '#000000ff',
        borderWidth: 2
    },

    searchInput: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 5,
    },
});