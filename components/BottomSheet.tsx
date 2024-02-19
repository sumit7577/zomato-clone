import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import BottomSheet, {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Constant } from '../Utils';
import { Button } from 'galio-framework';

interface BottomSheetProps{
    children:React.ReactNode
}
const BottomSheets = (props:BottomSheetProps) => {
    const {children} = props;
    // hooks
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["50%"], []);

    // callbacks
    const handleSheetChange = useCallback((index: any) => {
        // eslint-disable-next-line no-console
        console.log('handleSheetChange', index);
    }, []);
    const handleSnapPress = useCallback((index: number) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);
    const handleExpandPress = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const handleCollapsePress = useCallback(() => {
        bottomSheetRef.current?.collapse();
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    // renders
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                animateOnMount={true}
                enablePanDownToClose={true}
                detached={true}
                onChange={handleSheetChange}
            >
                {children}
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        zIndex:1000,
        height:Constant.height,
        position:"absolute",
        width:Constant.width,
    },
});


export default BottomSheets;