import { View, Text, StyleSheet,Button } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Constant } from '../Utils';



export default function BottomSheets() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%',"50%"], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    useEffect(()=>{
        bottomSheetModalRef.current?.present()
    },[])
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    animateOnMount
                >
                    <View style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        borderWidth:1,
        position:"absolute",
        flex:1
        
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});