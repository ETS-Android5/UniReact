import React from 'react';
import {
  Header,
} from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

function RNScreen(props) {
  const navigation = useNavigation();

 

  return (
    <SafeAreaView >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Header />
      </ScrollView>
        <View style={styles.button}>
          <Button
            title="Go to Unity"
            onPress={() => navigation.navigate('Unity')}
          />
        </View>
    </SafeAreaView>
  );
}

RNScreen.propTypes = {};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  button: {
    margin: 20,
    backgroundColoe: 'red'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default RNScreen;
