import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';

import Voice, {
    SpeechRecognizedEvent,
    SpeechResultsEvent,
    SpeechErrorEvent,
} from '@react-native-voice/voice';
import HeroIcon from './HeroIcon';

type Props = {
    setVoiceResult?: React.Dispatch<React.SetStateAction<string>>
};
type State = {
    recognized: string;
    pitch: string;
    error: string;
    end: string;
    started: string;
    results: string[];
    partialResults: string[];
};

class VoiceTest extends Component<Props, State> {
    state = {
        recognized: '',
        pitch: '',
        error: '',
        end: '',
        started: '',
        results: [],
        partialResults: [],
    };

    constructor(props: Props) {
        super(props);
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }

    onSpeechStart = (e: any) => {
        console.log('onSpeechStart: ', e);
        this.setState({
            started: '√',
        });
    };

    onSpeechRecognized = (e: SpeechRecognizedEvent) => {
        console.log('onSpeechRecognized: ', e);
        this.setState({
            recognized: '√',
        });
    };

    onSpeechEnd = (e: any) => {
        console.log('onSpeechEnd: ', e);
        this.setState({
            end: '√',
        });
    };

    onSpeechError = (e: SpeechErrorEvent) => {
        console.log('onSpeechError: ', e);
        this.setState({
            error: JSON.stringify(e.error),
        });
    };

    onSpeechResults = (e: SpeechResultsEvent) => {
        console.log('onSpeechResults: ', e);
        this.props.setVoiceResult && this.props.setVoiceResult(e.value[0] ?? "");
        this.setState({
            results: e.value,
        });
        return e.value;
    };

    onSpeechPartialResults = (e: SpeechResultsEvent) => {
        console.log('onSpeechPartialResults: ', e);
        this.setState({
            partialResults: e.value,
        });
    };

    onSpeechVolumeChanged = (e: any) => {
        console.log('onSpeechVolumeChanged: ', e);
        this.setState({
            pitch: e.value,
        });
    };

    _startRecognizing = async () => {
        const data = await Voice.isAvailable()
        const voices = await Voice.getSpeechRecognitionServices()
        console.log(voices)
        this.setState({
            recognized: '',
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });

        try {
            const resp = await Voice.start('en-US');
        } catch (e) {
            console.error("eror", e);
        }
    };

    _stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };

    _cancelRecognizing = async () => {
        try {
            await Voice.cancel();
        } catch (e) {
            console.error(e);
        }
    };

    _destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            console.error(e);
        }
        this.setState({
            recognized: '',
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
                <Text style={styles.instructions}>
                    Press the button and start speaking.
                </Text>
                <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
                <Text style={styles.stat}>{`Recognized: ${this.state.recognized
                    }`}</Text>
                <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
                <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
                <Text style={styles.stat}>Results</Text>
                {this.state.results.map((result, index) => {
                    return (
                        <Text key={`result-${index}`} style={styles.stat}>
                            {result}
                        </Text>
                    );
                })}
                <Text style={styles.stat}>Partial Results</Text>
                {this.state.partialResults.map((result, index) => {
                    return (
                        <Text key={`partial-result-${index}`} style={styles.stat}>
                            {result}
                        </Text>
                    );
                })}
                <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
                <HeroIcon name='microphone' family="Foundation" onClick={this._startRecognizing} />
                <TouchableHighlight onPress={this._stopRecognizing}>
                    <Text style={styles.action}>Stop Recognizing</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._cancelRecognizing}>
                    <Text style={styles.action}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._destroyRecognizer}>
                    <Text style={styles.action}>Destroy</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    action: {
        textAlign: 'center',
        color: '#0000FF',
        marginVertical: 5,
        fontWeight: 'bold',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    stat: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
    },
});

export default VoiceTest;