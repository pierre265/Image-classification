import { useState, useRef, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { MODEL_CONFIG, CLASSIFICATION_CONFIG, UI_TEXT } from '../constants';
import type { UseClassificationReturn, AppError } from '../types';

/**
 * Custom hook for handling image classification with MobileNet
 * 
 * Features:
 * - Automatic TensorFlow.js initialization
 * - MobileNet model loading
 * - Image classification with tensor cleanup
 * - Error handling with typed errors
 * - Memory management
 * 
 * @returns Classification state and methods
 * 
 * @example
 * ```tsx
 * const { isReady, isClassifying, result, classifyImage } = useClassification();
 * 
 * const handleCapture = async (uri: string) => {
 *   await classifyImage(uri);
 * };
 * ```
 */
export function useClassification(): UseClassificationReturn {
    const [isReady, setIsReady] = useState(false);
    const [isClassifying, setIsClassifying] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState<AppError | null>(null);

    const modelRef = useRef<mobilenet.MobileNet | null>(null);
    const isInitializedRef = useRef(false);

    /**
     * Initialize TensorFlow.js and load the MobileNet model
     */
    const initialize = useCallback(async () => {
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        try {
            console.log('[Classification] Initializing TensorFlow.js...');
            await tf.ready();
            console.log('[Classification] TensorFlow.js ready, backend:', tf.getBackend());

            console.log('[Classification] Loading MobileNet model...');
            modelRef.current = await mobilenet.load({
                version: MODEL_CONFIG.version as 1 | 2,
                alpha: MODEL_CONFIG.alpha as 0.25 | 0.5 | 0.75 | 1.0,
            });
            console.log('[Classification] Model loaded successfully');

            setIsReady(true);
            setError(null);
        } catch (err) {
            console.error('[Classification] Initialization error:', err);
            setError({
                type: 'model_load',
                message: 'Échec du chargement du modèle',
                originalError: err instanceof Error ? err : new Error(String(err)),
            });
            isInitializedRef.current = false;
        }
    }, []);

    /**
     * Classify an image from its URI
     * @param uri - The URI of the image to classify
     */
    const classifyImage = useCallback(async (uri: string) => {
        if (!modelRef.current) {
            console.warn('[Classification] Model not loaded, skipping classification');
            return;
        }

        setIsClassifying(true);
        setResult('');
        setError(null);

        // Track tensors for cleanup
        const tensorsToDispose: tf.Tensor[] = [];

        try {
            console.log('[Classification] Fetching image:', uri);
            const response = await fetch(uri, {}, { isBinary: true });
            const imageDataArrayBuffer = await response.arrayBuffer();
            const imageData = new Uint8Array(imageDataArrayBuffer);

            console.log('[Classification] Decoding JPEG...');
            const imageTensor = decodeJpeg(imageData);
            tensorsToDispose.push(imageTensor);

            console.log('[Classification] Resizing image to', MODEL_CONFIG.inputSize);
            const resizedImageTensor = tf.image.resizeBilinear(
                imageTensor,
                [MODEL_CONFIG.inputSize, MODEL_CONFIG.inputSize]
            );
            tensorsToDispose.push(resizedImageTensor);

            console.log('[Classification] Running prediction...');
            const predictions = await modelRef.current.classify(
                resizedImageTensor,
                CLASSIFICATION_CONFIG.topK
            );

            console.log('[Classification] Predictions:', predictions);

            if (predictions && predictions.length > 0) {
                const topPrediction = predictions[0];
                if (topPrediction.probability >= CLASSIFICATION_CONFIG.confidenceThreshold) {
                    const confidence = (topPrediction.probability * 100).toFixed(1);
                    setResult(`${topPrediction.className} (${confidence}%)`);
                } else {
                    setResult(UI_TEXT.results.none);
                }
            } else {
                setResult(UI_TEXT.results.none);
            }
        } catch (err) {
            console.error('[Classification] Error:', err);
            setResult(UI_TEXT.results.error);
            setError({
                type: 'classification',
                message: 'Erreur lors de la classification',
                originalError: err instanceof Error ? err : new Error(String(err)),
            });
        } finally {
            // Clean up tensors to prevent memory leaks
            console.log('[Classification] Disposing tensors...');
            tensorsToDispose.forEach(tensor => {
                if (tensor && !tensor.isDisposed) {
                    tensor.dispose();
                }
            });
            setIsClassifying(false);
        }
    }, []);

    // Initialize on mount
    useEffect(() => {
        initialize();
    }, [initialize]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            console.log('[Classification] Cleanup: disposing model...');
            modelRef.current = null;
        };
    }, []);

    return {
        isReady,
        isClassifying,
        result,
        error,
        classifyImage,
    };
}

export default useClassification;
