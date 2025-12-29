import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function Chat({ chat }) {

    return (
        <Pressable style={styles.chatItem}>
            <View style={{ position: 'relative' }}>
                <Image source={{ uri: chat.avatar }} style={styles.avatar} />
                {chat.online && (
                    <View style={{
                        position: 'absolute',
                        bottom: 2,
                        right: 10,
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        backgroundColor: '#4CD137',
                        borderWidth: 1.5,
                        borderColor: '#fff',
                    }} />
                )}
            </View>
            <View style={styles.chatTextContainer}>
                <View style={styles.chatTopRow}>
                    <Text style={styles.chatName}>{chat.nombre}</Text>
                    <Text style={styles.chatTime}>{chat.hora}</Text>
                </View>
                <View style={styles.chatBottomRow}>
                    <Text style={styles.chatMessage} numberOfLines={1}>{chat.mensaje}</Text>
                    {chat.unread > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{chat.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    // Chat items
    chatItem: {
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
    chatTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    chatTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chatBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chatName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    chatTime: {
        fontSize: 12,
        color: '#888',
    },
    chatMessage: {
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
})