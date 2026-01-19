import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Design tokens for consistent theming across the app
 */
export const COLORS = {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#000000',
    surface: 'rgba(0, 0, 0, 0.55)',
    surfaceLight: 'rgba(0, 0, 0, 0.25)',
    text: '#FFFFFF',
    textMuted: '#A0A0A0',
    success: '#34C759',
    error: '#FF3B30',
    white: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.6)',
} as const;

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 20,
    full: 999,
} as const;

export const FONT_SIZE = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
} as const;

/**
 * Camera button dimensions
 */
export const CAPTURE_BUTTON = {
    outerSize: 78,
    innerSize: 62,
} as const;

/**
 * Thumbnail dimensions
 */
export const THUMBNAIL = {
    size: 72,
    borderWidth: 2,
} as const;

/**
 * Main application styles
 */
export const styles = StyleSheet.create({
    // Layout
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredWithGap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.md,
    },

    // Camera
    camera: {
        flex: 1,
    },

    // Overlays
    topOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 140,
        backgroundColor: COLORS.surfaceLight,
    },

    // Status bar area
    statusArea: {
        position: 'absolute',
        top: SPACING.xxl,
        left: SPACING.md,
        right: SPACING.md,
        alignItems: 'center',
    },

    // Result badge
    resultBadge: {
        backgroundColor: COLORS.surface,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
    },
    resultText: {
        color: COLORS.text,
        fontSize: FONT_SIZE.md,
        fontWeight: '600',
        textAlign: 'center',
    },

    // Loading text
    loadingText: {
        color: COLORS.text,
        fontSize: FONT_SIZE.md,
    },
    permissionText: {
        color: COLORS.text,
        fontSize: FONT_SIZE.md,
        textAlign: 'center',
        paddingHorizontal: SPACING.lg,
    },

    // Thumbnail
    thumbnailContainer: {
        position: 'absolute',
        bottom: 110,
        right: SPACING.lg,
    },
    thumbnail: {
        width: THUMBNAIL.size,
        height: THUMBNAIL.size,
        borderRadius: BORDER_RADIUS.md,
        borderColor: COLORS.white,
        borderWidth: THUMBNAIL.borderWidth,
    },

    // Capture button area
    captureArea: {
        position: 'absolute',
        bottom: 36,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureButton: {
        width: CAPTURE_BUTTON.outerSize,
        height: CAPTURE_BUTTON.outerSize,
        borderRadius: BORDER_RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureButtonActive: {
        backgroundColor: COLORS.white,
    },
    captureButtonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    captureButtonInner: {
        width: CAPTURE_BUTTON.innerSize,
        height: CAPTURE_BUTTON.innerSize,
        borderRadius: BORDER_RADIUS.full,
    },
    captureButtonInnerActive: {
        backgroundColor: '#f3f3f3',
    },
    captureButtonInnerDisabled: {
        backgroundColor: '#ddd',
    },
    captureHint: {
        color: COLORS.text,
        marginTop: SPACING.sm + 2,
        fontSize: FONT_SIZE.sm,
    },

    // Error state
    errorContainer: {
        backgroundColor: COLORS.error,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        margin: SPACING.md,
    },
    errorText: {
        color: COLORS.white,
        fontSize: FONT_SIZE.sm,
        textAlign: 'center',
    },
});

export default styles;
