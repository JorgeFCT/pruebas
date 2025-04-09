import { Image, StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SocialIcons from '@/components/logos';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface ExchangeRates {
  [key: string]: number;
}

interface CryptoPrices {
  [key: string]: number;
}

export default function CScreen() {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [divisa, setDivisa] = useState('EUR');
  const [cripto, setCripto] = useState('BTC');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrices>({});

  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest/USD')
      .then(response => {
        setExchangeRates(response.data.rates || {});
      })
      .catch(error => console.error('Error fetching exchange rates:', error));

    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,polygon,iota,tether,dai,binance-usd&vs_currencies=usd')
      .then(response => {
        setCryptoPrices({
          BTC: response.data.bitcoin?.usd || 0,
          ETH: response.data.ethereum?.usd || 0,
          BNB: response.data.binancecoin?.usd || 0,
          MATIC: response.data.polygon?.usd || 0, 
          MIOTA: response.data.iota?.usd || 0,
          USDT: response.data.tether?.usd || 0,
          DAI: response.data.dai?.usd || 0,
          BUSD: response.data['binance-usd']?.usd || 0,
        });
      })
      .catch(error => console.error('Error fetching crypto prices:', error));
  }, []);

  useEffect(() => {
    const amountNum = parseFloat(amount);
    const exchangeRate = exchangeRates[divisa] || 0;
    const cryptoPrice = cryptoPrices[cripto] || 0;

    if (!isNaN(amountNum) && amountNum > 0 && exchangeRate > 0 && cryptoPrice > 0) {
      const amountInUSD = amountNum / exchangeRate;
      const amountInCrypto = amountInUSD / cryptoPrice;
      setConvertedAmount(amountInCrypto.toFixed(8));
    } else {
      setConvertedAmount('');
    }
  }, [amount, divisa, cripto, exchangeRates, cryptoPrices]);

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
        <Text style={styles.chiquito}>Precio calculado en tiempo</Text>
        <Text style={styles.chiquito}>real sobre Binance.</Text>
        <Text style={styles.chiquito}>Actualizado cada 30 segundos.</Text>
        <View style={styles.espacio} />
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={divisa}
            onValueChange={(itemValue) => setDivisa(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="JPY" value="JPY" />
          </Picker>
          <TextInput
            style={styles.input}
            onChangeText={setAmount}
            value={amount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>      
          <Picker
            selectedValue={cripto}
            onValueChange={(itemValue) => setCripto(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="BTC" value="BTC" />
            <Picker.Item label="ETH" value="ETH" />
            <Picker.Item label='BNB' value='BNB' />
            <Picker.Item label="MATIC" value="MATIC" />
            <Picker.Item label="MIOTA" value="MIOTA" />
            <Picker.Item label="USTD" value="USTD" />
            <Picker.Item label="DAI" value="DAI" />
            <Picker.Item label="BUSD" value="BUSD" />
          </Picker>
          <TextInput
            style={styles.input}
            value={convertedAmount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.espacio} />
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
  espacio:{
    height: 15
  }
  ,
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
  },
  picker: { height: '80%', width: '25%' },
  pickerContainer:{height: 50, width: '10%', backgroundColor:'black'},
  contIm:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  imgHead:{
    height:200,
    width:200
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
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
    height: 50,
    margin: 5,
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white',
    flex:1,
    width:'80%'
  },
  inputContainer: {
    flexDirection: 'row', // Poner los inputs en línea
    justifyContent: 'space-around',
    alignItems:'center',
    alignSelf:'center', // Espaciado uniforme
    backgroundColor:'transparent',
    width: 300, // Usar todo el ancho disponible
    paddingHorizontal: 10, // Espaciado lateral
  },
  boton:{
    width:'100%',
    alignItems:'center',
    backgroundColor:'transparent',
    padding: 10
  },
  criptoCon:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    flexWrap: 'wrap',
    paddingTop:15,
    paddingLeft:17
  },
  criptoIm:{
    width:50,
    height:50
  }
});