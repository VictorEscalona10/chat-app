import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function Contact({ contact }) {

    return (
        <Pressable style={styles.contactItem}>
            <View style={{ position: 'relative' }}>
                <Image source={{ uri: contact.avatar }} style={styles.avatar} />
            </View>
            <View style={styles.contactTextContainer}>
                <View style={styles.contactTopRow}>
                    <Text style={styles.contactName}>{contact.nombre}</Text>
                    <Text style={styles.contactEmail}>{contact.email}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    // contact items
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
        justifyContent: 'center',
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