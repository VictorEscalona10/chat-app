import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

const messagesData = [
  {
    id: '1',
    text: '¡Hola! ¿Cómo estás?',
    sender: 'other',
    time: '10:20',
  },
  {
    id: '2',
    text: 'Todo bien 😄 ¿y tú?',
    sender: 'me',
    time: '10:21',
  },
];

export default function ChatUI() {
  const [messages, setMessages] = useState(messagesData);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'me',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);

    setInputText('');
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === 'me';

    return (
      <View
        style={[
          styles.messageWrapper,
          isMe ? styles.messageMe : styles.messageOther,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isMe ? styles.bubbleMe : styles.bubbleOther,
          ]}
        >
          <Text style={isMe ? styles.textMe : styles.textOther}>
            {item.text}
          </Text>
        </View>

        <Text style={styles.time}>{item.time}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff' }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </Pressable>

          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.name}>María González</Text>
            <Text style={styles.status}>En línea</Text>
          </View>

          <View style={{ flex: 1 }} />

          <Pressable>
            <Feather name="more-vertical" size={20} color="#007AFF" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* MENSAJES */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* INPUT */}
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            placeholder="Escribe un mensaje..."
            value={inputText}
            onChangeText={setInputText}
            style={styles.textInput}
            multiline
          />

          {inputText.length > 0 && (
            <Pressable onPress={handleSend}>
              <Ionicons name="send" size={22} color="#007AFF" />
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  status: {
    fontSize: 12,
    color: '#34C759',
  },
  list: {
    padding: 15,
    paddingBottom: 100,
  },
  messageWrapper: {
    marginBottom: 10,
    maxWidth: '80%',
  },
  messageMe: {
    alignSelf: 'flex-end',
  },
  messageOther: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: 12,
    borderRadius: 18,
  },
  bubbleMe: {
    backgroundColor: '#007AFF',
  },
  bubbleOther: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  textMe: {
    color: '#fff',
    fontSize: 15,
  },
  textOther: {
    color: '#333',
    fontSize: 15,
  },
  time: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f2f3',
    borderRadius: 25,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
  },
});
