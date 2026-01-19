import React, { memo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from '../styles';
import { UI_TEXT } from '../constants';
import type { CaptureButtonProps } from '../types';

/**
 * Capture button component for the camera interface
 * 
 * Features:
 * - Visual feedback for loading state
 * - Disabled state handling
 * - Accessible press target
 * 
 * @param props - Component props
 * @param props.onPress - Callback when button is pressed
 * @param props.disabled - Whether the button is disabled
 * @param props.isLoading - Whether classification is in progress
 */
export const CaptureButton = memo<CaptureButtonProps>(({
    onPress,
    disabled,
    isLoading
}) => {
    const isButtonDisabled = disabled || isLoading;

    return (
        <View style={styles.captureArea}>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={onPress}
                disabled={isButtonDisabled}
                accessibilityLabel={isLoading ? UI_TEXT.capture.analyzing : UI_TEXT.capture.hint}
                accessibilityRole="button"
                accessibilityState={{ disabled: isButtonDisabled }}
                style={[
                    styles.captureButton,
                    isButtonDisabled
                        ? styles.captureButtonDisabled
                        : styles.captureButtonActive,
                ]}
            >
                <View
                    style={[
                        styles.captureButtonInner,
                        isButtonDisabled
                            ? styles.captureButtonInnerDisabled
                            : styles.captureButtonInnerActive,
                    ]}
                />
            </TouchableOpacity>
            <Text style={styles.captureHint}>
                {isLoading ? UI_TEXT.capture.analyzing : UI_TEXT.capture.hint}
            </Text>
        </View>
    );
});

CaptureButton.displayName = 'CaptureButton';

export default CaptureButton;
