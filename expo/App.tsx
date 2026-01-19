import React, { useRef, useState, useCallback } from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Components
import { CaptureButton, ResultBadge, PhotoThumbnail } from './components';

// Hooks
import { useClassification } from './hooks/useClassification';

// Styles & Constants
import { styles } from './styles';
import { UI_TEXT, CAMERA_CONFIG } from './constants';

/**
 * Main App Component
 * 
 * A React Native application that uses TensorFlow.js and MobileNet
 * to perform real-time image classification using the device camera.
 * 
 * Features:
 * - Camera capture with permission handling
 * - MobileNet image classification
 * - Visual feedback during classification
 * - Thumbnail preview of captured images
 * 
 * @returns The main application UI
 */
const App: React.FC = () => {
  // Camera permissions
  const [permission, requestPermission] = useCameraPermissions();

  // Camera reference
  const cameraRef = useRef<CameraView | null>(null);

  // Photo state
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Classification hook
  const { isReady, isClassifying, result, classifyImage } = useClassification();

  /**
   * Takes a photo and classifies it using MobileNet
   */
  const handleCaptureAndClassify = useCallback(async () => {
    try {
      const camera = cameraRef.current;
      if (!camera) {
        console.warn('[App] Camera reference not available');
        return;
      }

      console.log('[App] Taking photo...');
      const photo = await (camera as any).takePictureAsync({
        skipProcessing: CAMERA_CONFIG.skipProcessing,
        quality: CAMERA_CONFIG.quality,
      });

      if (photo?.uri) {
        console.log('[App] Photo captured:', photo.uri);
        setPhotoUri(photo.uri);
        await classifyImage(photo.uri);
      }
    } catch (error) {
      console.error('[App] Error capturing photo:', error);
    }
  }, [classifyImage]);

  // Permission check - loading state
  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>
          {UI_TEXT.loading.permission}
        </Text>
      </View>
    );
  }

  // Permission denied - request state
  if (!permission.granted) {
    return (
      <View style={styles.centeredWithGap}>
        <Text style={styles.permissionText}>
          {UI_TEXT.permission.request}
        </Text>
        <Button
          title={UI_TEXT.permission.button}
          onPress={requestPermission}
        />
      </View>
    );
  }

  // Main camera view
  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="light-content" />

      <CameraView ref={cameraRef} style={styles.camera}>
        {/* Top overlay for readability */}
        <View style={styles.topOverlay} />

        {/* Status area - loading or result */}
        <View style={styles.statusArea}>
          {!isReady && (
            <Text style={styles.loadingText}>
              {UI_TEXT.loading.model}
            </Text>
          )}
          <ResultBadge result={result} visible={result !== ''} />
        </View>

        {/* Last photo thumbnail */}
        <PhotoThumbnail uri={photoUri} />

        {/* Capture button */}
        <CaptureButton
          onPress={handleCaptureAndClassify}
          disabled={!isReady}
          isLoading={isClassifying}
        />
      </CameraView>
    </View>
  );
};

export default App;
