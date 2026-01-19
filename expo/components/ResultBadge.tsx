import React, { memo } from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from '../styles';
import type { ResultBadgeProps } from '../types';

/**
 * Badge component to display classification results
 * 
 * Shows the classification result in a semi-transparent badge
 * positioned at the top of the screen
 * 
 * @param props - Component props
 * @param props.result - The classification result text
 * @param props.visible - Whether the badge should be visible
 */
export const ResultBadge = memo<ResultBadgeProps>(({ result, visible }) => {
    if (!visible || !result) {
        return null;
    }

    return (
        <View style={styles.resultBadge}>
            <Text
                style={styles.resultText}
                accessibilityLiveRegion="polite"
                accessibilityLabel={`Résultat de classification: ${result}`}
            >
                {result}
            </Text>
        </View>
    );
});

ResultBadge.displayName = 'ResultBadge';

export default ResultBadge;
