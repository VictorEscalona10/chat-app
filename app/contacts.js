import { View, ScrollView, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import HeaderChat from '../src/components/HeaderChat';
import Contact from '../src/components/Contact';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

export default function Contacts() {
    const contacts = [
        {
            id: 1,
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            nombre: 'Ana López',
            email: 'ana@gmail.com',
            isSelected: false
        },
        {
            id: 2,
            avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
            nombre: 'Carlos Martínez',
            email: 'carlos@gmail.com',
            isSelected: false
        },
        {
            id: 3,
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            nombre: 'María García',
            email: 'maria@gmail.com',
            isSelected: false
        },
        {
            id: 4,
            avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
            nombre: 'José Fernández',
            email: 'jose@gmail.com',
            isSelected: false
        },
        {
            id: 5,
            avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
            nombre: 'Lucía Torres',
            email: 'lucia@gmail.com',
            isSelected: false
        },
        {
            id: 6,
            avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
            nombre: 'Miguel Ramírez',
            email: 'miguel@gmail.com',
            isSelected: false
        },
        {
            id: 7,
            avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
            nombre: 'Sofía Herrera',
            email: 'sofia@gmail.com',
            isSelected: false
        },
        {
            id: 8,
            avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
            nombre: 'Andrés González',
            email: 'andres@gmail.com',
            isSelected: false
        },
        {
            id: 9,
            avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
            nombre: 'Paula Díaz',
            email: 'paula@gmail.com',
            isSelected: false
        },
        {
            id: 10,
            avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
            nombre: 'Fernando Castro',
            email: 'fernando@gmail.com',
            isSelected: false
        },
        {
            id: 11,
            avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
            nombre: 'Claudia Rivas',
            email: 'claudia@gmail.com',
            isSelected: false
        },
        {
            id: 12,
            avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
            nombre: 'Ricardo Morales',
            email: 'ricardo@gmail.com',
            isSelected: false
        },
        {
            id: 13,
            avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
            nombre: 'Patricia Vega',
            email: 'patricia@gmail.com',
            isSelected: false
        },
        {
            id: 14,
            avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
            nombre: 'Javier Suárez',
            email: 'javier@gmail.com',
            isSelected: false
        },
        {
            id: 15,
            avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
            nombre: 'Gabriela Méndez',
            email: 'gabriela@gmail.com',
            isSelected: false
        }
    ];


    const renderItem = ({ item }) => <Contact contact={item} />;

    return (
        <View style={styles.container}>
            <HeaderChat title="Contactos" placeholder="Busca un contacto" />
            <Pressable onPress={() => router.push('addContact')} style={{ paddingHorizontal: 15, paddingVertical: 10, marginTop: 150, flexDirection: 'row', gap: 10, alignItems: 'center', borderBottomColor: '#f1f2f3ff', borderBottomWidth: 1 }}>
                <View style={{ backgroundColor: '#007AFF', width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                    <AntDesign name="user-add" size={24} color="#fff" />
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Agregar contacto</Text>
            </Pressable>
            <View style={{ flex: 1 }}>

                <FlatList
                    data={contacts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});