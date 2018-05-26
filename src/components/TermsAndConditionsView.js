import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View,Container, ScrollView, WebView} from 'react-native';

export default class TermsAndConditionsComponent extends Component {
    constructor() {
        super();

    }

    render() {
      return (
        <View style={styles.container}>
          <WebView
            bounces={false}
            scrollEnabled={false} 
            source={{ uri: 'https://drive.google.com/open?id=1odRVUJecQoNzjDYjY0rxAGt0b7zpYFq5' }} />
        </View>
      );
  }
}
AppRegistry.registerComponent('TermsAndConditionsComponent', () => TermsAndConditionsComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
