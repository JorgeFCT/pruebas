import { Image, StyleSheet, Platform, Pressable, Switch, Touchable, Button} from 'react-native';
import { Text, View } from '@/components/Themed';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/navigation/AppNavigation';
import SocialIcons from '@/components/logos';


export default function Menu() {

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <ThemedView style={styles.container}>
      <Image source={require('@/assets/images/image.png')} style={styles.logo}/>
      <Text style={styles.title}>Bitcoin21</Text>
        <View style={styles.contenedor}>
      <Button title="Start" color='red' onPress={()=>navigation.navigate('Mapa')}></Button>
        <View style={styles.espacio}></View>
      <Button title="Calculate" color='red' onPress={()=>navigation.navigate('Calculadora')}></Button>
      <View style={styles.espacio}></View>
      <Button title="Settings" color='red'></Button>
        </View>
        <SocialIcons/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contRow:{
  flexDirection: 'row',
  }
  ,
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logo:{
    height: 200,
    width: 200
  },
  contenedor:{
    padding:20,
    justifyContent:'center',
    
  },
  espacio:{
    height:15,
    width: 15
  },
  peque: {
    height:40,
    width:40
  }

});
