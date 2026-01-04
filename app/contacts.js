import { View, ScrollView, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import HeaderChat from '../src/components/HeaderChat';
import Contact from '../src/components/Contact';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import useContact from '../src/server/contacts';
import { useEffect, useState } from 'react';

export default function Contacts() {
    const [contacts, setcontacts] = useState(null)

    const { getAllcontacts } = useContact()

    useEffect(() => {
        const fetchContacts = async () => {
            const result = await getAllcontacts();
            console.log('📥 Resultado del servidor:', result);

            if (result.success && result.data) {
                setcontacts(result.data)
            } else {
                console.log('⚠️ Error cargando contactos:', result.error);
            }
            setLoading(false);
        };

        fetchContacts();
    }, []);



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
                {contacts && contacts.length > 0 ?
                    (
                        <FlatList
                            data={contacts}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )

                    :

                    (
                        <View style={{ flex: 1, marginTop: 70, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>No tienes contactos.</Text>
                        </View>
                    )
                }

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
