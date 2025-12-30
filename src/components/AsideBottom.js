import { StyleSheet, Text, View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { useState } from 'react';



export default function AsideBottom() {
    const [activeTab, setActiveTab] = useState('chats');
    return (

        <View style={styles.asideBottom}>
            <Pressable onPress={() => {
                router.push('/');
                setActiveTab('chats');
            }} style={styles.buttonChat}>
                <Ionicons name="chatbox-ellipses-outline" size={26} color={activeTab === 'chats' ? '#007AFF' : 'black'} />
                <Text style={{position: 'absolute', top: 5, right: 20, backgroundColor: '#FF3B30', color: 'white', borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2, fontSize: 10}}>30</Text>
                <Text style={[styles.titleLink, activeTab === 'chats' && styles.titleLinkActive]}>Chats</Text>
            </Pressable>
            <Pressable onPress={() => {
                router.push('/group')
                setActiveTab('create-group');
            }} style={styles.button}>
                <Ionicons name="add-circle-outline" size={26} color={activeTab === 'create-group' ? '#007AFF' : 'black'} />
                <Text style={[styles.titleLink, activeTab === 'create-group' && styles.titleLinkActive]}>Crear grupo</Text>
            </Pressable>

            <Pressable onPress={() => {
                router.push('/contacts');
                setActiveTab('contacts')
            }} style={styles.button}>
                <AntDesign name="usergroup-add" size={26} color={activeTab === 'contacts' ? '#007AFF' : 'black'} />
                <Text style={[styles.titleLink, activeTab === 'contacts' && styles.titleLinkActive]}>Contactos</Text>
            </Pressable>

            <Pressable onPress={() => {
                router.push('/register');
                setActiveTab('profile')
            }} style={styles.button}>
                <FontAwesome6 name="circle-user" size={24} color={activeTab === 'profile' ? '#007AFF' : 'black'} />
                <Text style={[styles.titleLink, activeTab === 'profile' && styles.titleLinkActive]}>Perfil</Text>
            </Pressable>
        </View>
    )
}



const styles = StyleSheet.create({
    titleLink: {
        marginTop: 3,
        fontSize: 12
    },
    titleLinkActive: {
        marginTop: 3,
        fontSize: 12,
        color: '#007AFF',
    },


    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#eee',
    },

    buttonChat: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#eee',
        position: 'relative',
    },


    asideBottom: {
        height: 70,
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row',
        zIndex: 1,
    },
})