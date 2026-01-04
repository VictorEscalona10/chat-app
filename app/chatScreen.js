import React, { useState, useEffect, useRef } from 'react';
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
  Keyboard,
  TouchableWithoutFeedback,
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
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardOffset(e.endCoordinates.height);
      // Scroll to bottom when keyboard appears
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
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
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* INPUT - Ahora con ajuste dinámico para el teclado */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={[styles.inputWrapper, { bottom: keyboardOffset }]}
        >
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <TextInput
                placeholder="Escribe un mensaje..."
                value={inputText}
                onChangeText={setInputText}
                style={styles.textInput}
                multiline
                maxLength={500}
              />

              <Pressable 
                onPress={handleSend}
                style={({ pressed }) => [
                  styles.sendButton,
                  pressed && styles.sendButtonPressed,
                  !inputText.trim() && styles.sendButtonDisabled
                ]}
                disabled={!inputText.trim()}
              >
                <Ionicons 
                  name="send" 
                  size={22} 
                  color={inputText.trim() ? "#007AFF" : "#999"} 
                />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
    paddingBottom: 80, // Espacio para el input
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
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderBottomLeftRadius: 4,
  },
  textMe: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },
  textOther: {
    color: '#333',
    fontSize: 15,
    lineHeight: 20,
  },
  time: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f2f3',
    borderRadius: 25,
    paddingHorizontal: 12,
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonPressed: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});