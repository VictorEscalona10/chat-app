import { Pressable, Image, View, Text, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ContactSelectedGroup({ contact, selectContact }) {
    return (
        <Pressable onPress={()=> selectContact(contact)}>
            <View style={styles.contactButton}>
                <Image
                    source={{ uri: contact.avatar }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View style={{ borderColor: '#fff', borderWidth: 1, width: 18, height: 18, backgroundColor: '#928585ff', justifyContent: 'center', alignItems: 'center', borderRadius: 50, position: 'absolute', bottom: 0, right: 0 }}>
                    <Ionicons name="close-outline" size={15} color="#fff" />
                </View>
            </View>
            <View><Text style={{ marginTop: 2, fontSize: 10, textAlign: 'center' }}>Nombre</Text></View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    contactButton: {
        marginRight: 10,
        position: 'relative',
        width: 50,
        height: 50
    }
})

