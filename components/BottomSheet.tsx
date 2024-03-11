import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import BottomSheet, {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Constant } from '../Utils';
import { Button } from 'galio-framework';

interface BottomSheetProps {
    children: React.ReactNode,
    onChange: React.Dispatch<React.SetStateAction<number>>;
}
const BottomSheets = (props: BottomSheetProps) => {
    const { children, onChange } = props;
    // hooks
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["70%","90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index: any) => {
        // eslint-disable-next-line no-console
        onChange(() => index)
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
                index={0}
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
        position: "absolute",
        height: Constant.height,
        width: Constant.width,
        zIndex: 2
    },
});


export default BottomSheets;