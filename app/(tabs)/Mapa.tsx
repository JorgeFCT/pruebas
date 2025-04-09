import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Text, View } from '@/components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/navigation/AppNavigation';
import { useNavigation } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SocialIcons from '@/components/logos';


export default function MapaScreen() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const [text, onChangeText] = useState('Useless Text');
  const [texto, onChangeTexto] = useState('Cosas');
  const { width } = Dimensions.get('window');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'white', dark: 'transparent' }}
      headerImage={
        <View style={styles.contIm}>
          <Image source={require('@/assets/images/image.png')} style={styles.imgHead} />
          <Text style={styles.title}>Bitcoin21</Text>
        </View>
      }
    >
      <ThemedView style={styles.container}>
        <View style={styles.bandaRoja}>
          <Text style={styles.chiquito}>El buscador de negocios</Text>
          <Text style={styles.chiquito}>que aceptan crypto</Text>
          <Text style={styles.chiquito}>Empieza a usar tus criptomonedas</Text>
          <Text style={styles.chiquito}>en el mundo real</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Buscar por ubicación"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTexto}
              value={texto}
              placeholder="Buscar por categoría"
            />
          </View>

          <View style={styles.boton}>
            <Button title="Buscar" color="pink" />
          </View>
        </View>
        <Text>IMPLEMENTA EL MAPA AQUI</Text>
        <SocialIcons />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contIm: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
    imgHead:{
      height:200,
      width:200
    },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  bandaRoja: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  chiquito: {
    fontSize: 14,
    marginBottom: 4,
  },
  inputContainer: {
    marginTop: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  boton: {
    marginTop: 16,
  },
});