import { Image, StyleSheet, Button, TextInput, FlatList, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ThemedView } from '@/components/ThemedView';
import { Text, View } from '@/components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/navigation/AppNavigation';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SocialIcons from '@/components/logos';


// Hook para manejar el debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


type NavigationProp = StackNavigationProp<StackParamList, 'Mapa'>;

export default function ListaScreen() {
  const [searchText, setSearchText] = useState("");
  const [texto, onChangeTexto] = React.useState('Cosas');
  const debouncedSearchText = useDebounce(searchText, 1500);

type cripto= {
  nombre: string,
  imagen: ImageSourcePropType
}

type Negocio = {
  nombre:string;
  direccion: string;
  criptos: string [];
}
const listaCriptos: cripto[]=[
  { nombre: 'BTC', imagen: require('@/assets/images/btc-logo.png') },
  { nombre: 'ETH', imagen: require('@/assets/images/eth-logo.png') },
  { nombre: 'MATIC', imagen: require('@/assets/images/matic-logo.png') },
  { nombre: 'BNB', imagen: require('@/assets/images/bnb-logo.png') },
  { nombre: 'MIOTA', imagen: require('@/assets/images/iota-logo.png') },
  { nombre: 'USDT', imagen: require('@/assets/images/usdt-logo.png') },
  { nombre: 'DAI', imagen: require('@/assets/images/dai-logo.png') },
  { nombre: 'BUSD', imagen: require('@/assets/images/dai-logo.png') }
]

const listaNegocios: Negocio[]=[
{nombre: 'Ferreteria Manuel', direccion:'C/ falsa 123', criptos: ['BTC', 'ETH', 'USTD']},
{nombre: 'Kebab amigo', direccion:'C/ abajo 22', criptos: ['BTC', 'ETH', 'DAI']},
{nombre: 'Peluqueria Raul', direccion:'Plaza mayor 3', criptos: ['ETH', 'USTD', 'BNB']},
{nombre: 'Bar Paco', direccion:'C/ falsa 1', criptos: ['BTC', 'ETH', 'USTD']},
{nombre: 'Parque de atracciones', direccion:'Av. Principal 45', criptos: ['BTC', 'ETH', 'MIOTA']},
{nombre: 'Casa rural', direccion:'C/ piedra 12', criptos: ['BTC', 'ETH', 'MATIC']},
{ nombre: 'Tech Solutions', direccion: 'Av. Innovación 99', criptos: ['BTC', 'ETH', 'USDT'] },
{ nombre: 'Green Market', direccion: 'C/ Ecológica 12', criptos: ['BTC', 'ETH', 'DAI'] },
{ nombre: 'Luxury Barber', direccion: 'Plaza Central 7', criptos: ['ETH', 'USDT', 'BNB'] },
{ nombre: 'Café Express', direccion: 'C/ Gourmet 25', criptos: ['BTC', 'ETH', 'MATIC'] },
{ nombre: 'Adventure Park', direccion: 'Ronda Aventura 55', criptos: ['BTC', 'ETH', 'MIOTA'] },
{ nombre: 'Rural Escape', direccion: 'Camino Verde 4', criptos: ['BTC', 'ETH', 'BUSD'] }

]


const filteredList = listaNegocios.filter((negocio) =>
  negocio.nombre.toLowerCase().includes(debouncedSearchText.toLowerCase())
);
const handleSelect = (nombre: string) => {
  setSearchText(nombre);
};

  return (
    <ParallaxScrollView
    headerBackgroundColor={{light: 'white', dark: 'transparent'}}
    headerImage={
      <View style={styles.contIm}>
      <Image source={require('@/assets/images/image.png')} style={styles.imgHead}/>
      <Text style={styles.title}>Bitcoin21</Text>
      </View>
    }>
    <ThemedView style={styles.container}>
    <View style={styles.bandaRoja}>
    <Text style={styles.chiquito}>El buscador de negocios</Text>
    <Text style={styles.chiquito}>que aceptan crypto</Text>
    <Text style={styles.chiquito}>Empieza a usar tus criptomonedas</Text>
    <Text style={styles.chiquito}>en el mundo real</Text>
  <View style={styles.inputContainer}>
    <TextInput
          style={styles.input}
          onChangeText={setSearchText}
          value={searchText}
          />
          </View> 
   <View style={styles.inputContainer}>      
          <TextInput
          style={styles.input}
          onChangeText={onChangeTexto}
          value={texto}
          />
    </View>
    <View style={styles.boton}>
      <Button title="Buscar" color='pink'></Button>
    </View>
    </View>
    <View>
    {searchText.length > 0 && (
    <FlatList
    data={filteredList}
    keyExtractor={(item) => item.nombre}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => handleSelect(item.nombre)}>
        <View style={styles.criptoItem}>
          <View style={styles.cont}>
          <Text style={styles.textito}>{item.nombre}</Text>
          <Text style={styles.textito}>{item.direccion}</Text>
          </View>
          
          <View style={styles.criptoIcons}>
            {item.criptos.map((criptoNombre) => {
              const cripto = listaCriptos.find((c) => c.nombre === criptoNombre);
              return cripto ? (
                <Image key={cripto.nombre} source={cripto.imagen} style={styles.criptoIm} />
              ) : null;
            })}
          </View>
        </View>
      </TouchableOpacity>
    )}
  />
    )}
    </View>
    
    <SocialIcons/>
    </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   
  },
  cont:{
    width:'70%',
    backgroundColor:'transparent'
  },
  mapaCont:{
    flex: 1,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contIm:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  criptoItem: {
    flexDirection:'row',
    margin: 10,
    backgroundColor: 'white',
    width:300,
    padding:20
  },
  criptoIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'transparent'
  },
  criptoIm: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  mapa:{
    height:300,
    width:350
  },
  imgHead:{
    height:200,
    width:200
  },
  logo:{
    height: 100,
    width: 100
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textito:{
    fontSize:18
  },
  bandaRoja:{
    backgroundColor:'red',
    width:300,
  },
  lineaTextF:{
  flexDirection: 'row',
  width:'100%'
  },
  chiquito:{
    fontSize: 16,
    color:'white',
    paddingLeft:15
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white',
    flex:1,
    width:'100%'
  },
  inputContainer: {
    flexDirection: 'row', // Poner los inputs en línea
    justifyContent: 'space-around', // Espaciado uniforme
    backgroundColor:'transparent',
    width: 300, // Usar todo el ancho disponible
    paddingHorizontal: 10, // Espaciado lateral
  },
  boton:{
    width:'100%',
    alignItems:'center',
    backgroundColor:'transparent',
    padding: 10
  }
});