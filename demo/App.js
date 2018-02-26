'use strict';

import React, { Component } from 'react';

import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import AutoHeightWebView from 'react-native-autoheight-webview';

export default class Explorer extends Component {
  constructor(props) {
    super(props);
    this.html0 = `<p style="font-weight: 400;font-style: normal;font-size: 21px;line-height: 1.58;letter-spacing: -.003em;">Tags are great for describing the essence of your story in a single word or phrase, but stories are rarely about a single thing. <span style="background-color: transparent !important;background-image: linear-gradient(to bottom, rgba(146, 249, 190, 1), rgba(146, 249, 190, 1));">If I pen a story about moving across the country to start a new job in a car with my husband, two cats, a dog, and a tarantula, I wouldn’t only tag the piece with “moving”. I’d also use the tags “pets”, “marriage”, “career change”, and “travel tips”.</span></p>`;
    this.html1 = `Tags are great for describing the essence of your story in a single word or phrase, but stories are rarely about a single thing. If I pen a story about moving across the country to start a new job in a car with my husband, two cats, a dog, and a tarantula, I wouldn’t only tag the piece with “moving”. I’d also use the tags “pets”, “marriage”, “career change”, and “travel tips”.`;
    this.script0 = '';
    this.script1 = `document.body.style.background = 'cornflowerblue';`;
    this.state = {
      html: this.html0,
      script: this.script0,
      height: 0
    };
  }

  changeSource = () => {
    this.setState(prevState => ({
      html: prevState.html === this.html0 ? this.html1 : this.html0
    }));
  };

  changeScript = () => {
    this.changeSource();
    this.setState(prevState => ({
      script: prevState.script === this.script0 ? this.script1 : this.script0
    }));
  };

  render() {
    const { html, script, height } = this.state;
    return (
      <ScrollView
        style={{
          backgroundColor: 'lightyellow'
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <AutoHeightWebView
          onError={() => console.log('on error')}
          onLoad={() => console.log('on load')}
          onLoadStart={() => console.log('on load start')}
          onLoadEnd={() => console.log('on load end')}
          onShouldStartLoadWithRequest={result => {
            console.log(result);
            return true;
          }}
          onHeightUpdated={height => this.setState({ height })}
          source={{ html }}
          customScript={script}
        />
        <TouchableOpacity onPress={this.changeSource} style={styles.button}>
          <Text>change source</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.changeScript} style={styles.button}>
          <Text>change script (have to change source to reload on android)</Text>
        </TouchableOpacity>
        <Text style={{ padding: 5 }}>{height}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    backgroundColor: 'aliceblue',
    borderRadius: 5,
    padding: 5
  }
});
