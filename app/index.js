import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Chat from '../src/components/Chat';
import HeaderChat from '../src/components/HeaderChat';
import { useEffect, useState } from 'react';

const chats = [
  {
    id: '1',
    nombre: 'María González',
    mensaje: 'Perfecto, nos vemos mañana entonces',
    hora: '10:30',
    unread: 2,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    online: true,
  },
  {
    id: '2',
    nombre: 'Equipo de Desarrollo',
    mensaje: 'Carlos: He subido los cambios al repositorio',
    hora: '09:45',
    unread: 5,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    online: false,
  },
  {
    id: '3',
    nombre: 'Juan Pérez',
    mensaje: '👍',
    hora: 'Ayer',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    online: true,
  },
  {
    id: '4',
    nombre: 'Familia',
    mensaje: 'Mamá: No olviden la reunión del domingo',
    hora: 'Ayer',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    online: false,
  },
  {
    id: '5',
    nombre: 'Proyecto Alpha',
    mensaje: 'Laura: Actualicé el cronograma',
    hora: 'Dom',
    unread: 1,
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    online: false,
  },
  {
    id: '6',
    nombre: 'Pedro Ramírez',
    mensaje: '¿Confirmamos la reunión del viernes?',
    hora: '08:20',
    unread: 3,
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    online: true,
  },
  {
    id: '7',
    nombre: 'Grupo de Estudio',
    mensaje: 'Andrea: Recuerden traer los apuntes',
    hora: '07:50',
    unread: 4,
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    online: false,
  },
  {
    id: '8',
    nombre: 'Claudia Torres',
    mensaje: 'Gracias por la ayuda 🙌',
    hora: 'Ayer',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    online: true,
  },
  {
    id: '9',
    nombre: 'Marketing Team',
    mensaje: 'Luis: La campaña ya está lista',
    hora: 'Vie',
    unread: 2,
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    online: false,
  },
  {
    id: '10',
    nombre: 'Sofía Méndez',
    mensaje: 'Nos vemos en la tarde',
    hora: 'Hoy',
    unread: 1,
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    online: true,
  }
];

export default function Index() {

  const [userData, setUserData] = useState(null)

  const readData = async () => {
    try {
      const token = await AsyncStorage.getItem('userData');
      if (token !== null) {
        setUserData(token)
      }
    } catch (error) {
      console.log('Error al leer', error);
    }
  };


  useEffect(() => {
    readData()
  }, [])

  console.log(userData)


  const renderItem = ({ item }) => <Chat chat={item} />;

  return (
    <View style={styles.container}>
      {/* Header con buscador */}
      <HeaderChat />

      {/* Lista de chats */}
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingTop: 160 }} // deja espacio para el header fijo
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
