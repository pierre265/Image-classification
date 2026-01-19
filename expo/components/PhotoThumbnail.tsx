import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { styles } from '../styles';
import type { PhotoThumbnailProps } from '../types';

/**
 * Thumbnail component to display the last captured photo
 * 
 * Shows a small preview of the last captured image
 * positioned in the bottom-right corner
 * 
 * @param props - Component props
 * @param props.uri - The URI of the photo to display
 */
export const PhotoThumbnail = memo<PhotoThumbnailProps>(({ uri }) => {
    if (!uri) {
        return null;
    }

    return (
        <View style={styles.thumbnailContainer}>
            <Image
                source={{ uri }}
                style={styles.thumbnail}
                accessibilityLabel="Dernière photo capturée"
                accessibilityRole="image"
            />
        </View>
    );
});

PhotoThumbnail.displayName = 'PhotoThumbnail';

export default PhotoThumbnail;
