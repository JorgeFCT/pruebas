import { View, Image, StyleSheet, Platform, Pressable, Switch, Touchable, Button} from 'react-native';

const SocialIcons = () => {
    return (
      <>
        <View style={styles.contRow}>
          <Image source={require('@/assets/images/google_icon.png')} style={styles.peque} />
          <View style={styles.espacio} />
          <Image source={require('@/assets/images/facebook_icon.png')} style={styles.peque} />
          <View style={styles.espacio} />
          <Image source={require('@/assets/images/x_icon.png')} style={styles.peque} />
        </View>
        <View style={styles.espacio} />
        <View style={styles.contRow}>
          <Image source={require('@/assets/images/CryptoSpace-logo.png')} style={styles.peque} />
        </View>
      </>
    );
  };
  

  const styles = StyleSheet.create({
    contRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    espacio: {
      width: 15,
      height: 15,
    },
    peque: {
      width: 40,
      height: 40,
    },
  });
  export default SocialIcons;