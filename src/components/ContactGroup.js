import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function ContactGroup({ contact, selectContact }) {


    

    return (
        <Pressable style={styles.contactItem} onPress={()=> selectContact(contact)}>
            <View style={{ position: 'relative' }}>
                <Image source={{ uri: contact.avatar }} style={styles.avatar} />
            </View>
            <View style={styles.contactTextContainer}>
                <View style={styles.contactTopRow}>
                    <Text style={styles.contactName}>{contact.nombre}</Text>
                    <Text style={styles.contactEmail}>{contact.email}</Text>
                </View>

                <Pressable onPress={()=> selectContact(contact)} style={[contact.isSelected ? styles.checkActive : styles.checkDisabled]}>
                    {contact.isSelected && <FontAwesome6 name="check" size={10} color="#fff" />}
                </Pressable>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    // contact items

    checkDisabled: {
        width: 25,
        height: 25,
        borderRadius: 50,
        borderColor: '#eee',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    checkActive: {
        width: 25,
        height: 25,
        borderRadius: 50,
        borderColor: '#4CD137',
        backgroundColor: '#4CD137',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    checkDisabled: {
        width: 25,
        height: 25,
        borderRadius: 50,
        borderColor: '#848282ff',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },


    contactItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    contactTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contactTopRow: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    contactBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    contactEmail: {
        fontSize: 14,
        color: '#555',
    },
    contactTime: {
        fontSize: 12,
        color: '#888',
    },
    contactMessage: {
        fontSize: 14,
        color: '#555',
        flex: 1,
    },

    badge: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});