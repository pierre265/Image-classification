/**
 * TypeScript type definitions for the Image Classification app
 */

/**
 * Represents a single classification prediction
 */
export interface Prediction {
    className: string;
    probability: number;
}

/**
 * Represents the complete result of a classification
 */
export interface ClassificationResult {
    predictions: Prediction[];
    timestamp: number;
    imageUri: string;
}

/**
 * App loading states
 */
export type LoadingState =
    | 'initializing'
    | 'loading_model'
    | 'ready'
    | 'classifying'
    | 'error';

/**
 * Error types for the app
 */
export interface AppError {
    type: 'model_load' | 'classification' | 'camera' | 'permission';
    message: string;
    originalError?: Error;
}

/**
 * Camera permission states
 */
export type PermissionState =
    | 'undetermined'
    | 'granted'
    | 'denied';

/**
 * Hook return type for classification logic
 */
export interface UseClassificationReturn {
    isReady: boolean;
    isClassifying: boolean;
    result: string;
    error: AppError | null;
    classifyImage: (uri: string) => Promise<void>;
}

/**
 * Props for the CaptureButton component
 */
export interface CaptureButtonProps {
    onPress: () => void;
    disabled: boolean;
    isLoading: boolean;
}

/**
 * Props for the ResultBadge component
 */
export interface ResultBadgeProps {
    result: string;
    visible: boolean;
}

/**
 * Props for the PhotoThumbnail component
 */
export interface PhotoThumbnailProps {
    uri: string | null;
}
