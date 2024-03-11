import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';

function Loader(props: { show: boolean }) {
    const { show } = props;
    return (
        <View>
            <Modal transparent={true} animationType={'none'} visible={show == true}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator color="#0000ff" size="large" spinner={show === true} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 45,
        width: 45,
        borderRadius: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})