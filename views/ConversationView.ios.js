'use strict';
let React = require('react-native');
let {
  Component,
  ListView,
  View,
  Text,
  DeviceEventEmitter,
  StyleSheet,
  Animated,
  TextInput
} = React;

var _keyboardWillShowSubscription, _keyboardWillHideSubscription;

let styles = {
  container: {
    flex: 1,
  },
  messageList: {
    flex: 7
  },
  inputContainer: {
    backgroundColor: 'lightgray',
    height: 50,
    padding: 10,
    flexDirection: 'row'
  },
  textInput: {
    flex: 3
  },
  sendButton: {
    padding: 5,
    color: 'blue',
    textAlign: 'center'
  },
  baseText: {
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  },
  selfText: {
    backgroundColor: 'blue',
    color: 'white',
    alignSelf: 'flex-end'
  },
  otherText: {
    backgroundColor: 'gray',
    color: 'black',
    alignSelf: 'flex-start'
  }
};

class ConversationView extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [
      {sender: 'self', body: 'wuts ^', time:12},
      {sender: props.person.username, body: 'nm u?', time: 13},
      {sender: 'self', body: 'jc lol', time: 14},
      {sender: 'self', body: '?', time: 15}
    ];
    this.state = {
      dataSource: ds.cloneWithRows(data),
      keyboardOffset: new Animated.Value(0)
    };
  }

  _keyboardWillShow(e) {
    Animated.spring(this.state.keyboardOffset, {
      toValue: e.endCoordinates.height - 42,
      friction: 6
    }).start();
  }

  _keyboardWillHide(e) {
    Animated.spring(this.state.keyboardOffset, {
      toValue: 0,
      friction: 6
    }).start();
  }

  componentDidMount() {
    _keyboardWillShowSubscription = DeviceEventEmitter.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
    _keyboardWillHideSubscription = DeviceEventEmitter.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
  }

  componentWillUnmount() {
    _keyboardWillShowSubscription.remove();
    _keyboardWillHideSubscription.remove();
  }

  _renderRow(rowData, sectionID, rowID) {
    let textStyle = rowData.sender === 'self' ? styles.selfText : styles.otherText;
    return (
      <Text style={[styles.baseText, textStyle]}>{rowData.body}</Text>
    );
  }

  render() {
    return (
      <Animated.View style={[styles.container, {marginBottom: this.state.keyboardOffset}]}>
        <ListView
          style={styles.messageList}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}>
        </ListView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            multiline={false}
            autoFocus={false} />
          <Text style={styles.sendButton}>Send</Text>
        </View>
      </Animated.View>
      );
  }
}

module.exports = ConversationView;
