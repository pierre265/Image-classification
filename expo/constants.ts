/**
 * Application configuration constants
 * Centralized configuration for easy customization
 */

/**
 * MobileNet model configuration
 */
export const MODEL_CONFIG = {
    /** Input image size expected by MobileNet */
    inputSize: 224,
    /** Model version (1 or 2) */
    version: 2,
    /** Alpha value for model width (0.25, 0.5, 0.75, 1.0) */
    alpha: 1.0,
} as const;

/**
 * Classification configuration
 */
export const CLASSIFICATION_CONFIG = {
    /** Number of top predictions to return */
    topK: 3,
    /** Minimum confidence threshold to display a prediction */
    confidenceThreshold: 0.1,
} as const;

/**
 * Camera configuration
 */
export const CAMERA_CONFIG = {
    /** Skip image processing for faster capture */
    skipProcessing: true,
    /** Image quality (0-1) */
    quality: 0.8,
} as const;

/**
 * UI Text strings (French)
 * Easily translatable to other languages
 */
export const UI_TEXT = {
    loading: {
        model: 'Chargement du modèle TFJS…',
        permission: 'Vérification des permissions caméra…',
        classifying: 'Analyse…',
    },
    permission: {
        request: 'Nous avons besoin de votre permission pour utiliser la caméra.',
        button: 'Autoriser la caméra',
    },
    capture: {
        hint: 'Appuyez pour capturer et reconnaître',
        analyzing: 'Analyse…',
    },
    results: {
        none: 'Aucune prédiction',
        error: 'Erreur lors de la prédiction',
    },
} as const;

/**
 * Supported image extensions
 */
export const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'] as const;
