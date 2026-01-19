# Image Classification Mobile App

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo)](https://expo.dev/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22-FF6F00?logo=tensorflow)](https://www.tensorflow.org/js)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Application mobile React Native de **classification d'images en temps réel** utilisant TensorFlow.js et le modèle MobileNet. L'application permet de capturer des photos avec la caméra du téléphone et d'identifier automatiquement les objets présents dans l'image.

## Fonctionnalités

- **Classification en temps réel** : Identification d'objets parmi 1000+ catégories ImageNet
- **Interface intuitive** : Capture photo simple avec aperçu de la dernière image
- **Inférence on-device** : Traitement 100% local, aucune donnée envoyée vers le cloud
- **Performance optimisée** : Gestion mémoire des tenseurs et modèle léger MobileNet
- **Support multi-plateforme** : iOS et Android via Expo

## Architecture

```
expo/
├── App.tsx                 # Composant principal
├── constants.ts            # Configuration et constantes
├── styles.ts               # Styles et design tokens
├── types.ts                # Définitions TypeScript
├── components/
│   ├── index.ts            # Exports centralisés
│   ├── CaptureButton.tsx   # Bouton de capture
│   ├── ResultBadge.tsx     # Affichage du résultat
│   └── PhotoThumbnail.tsx  # Vignette de la photo
└── hooks/
    └── useClassification.ts # Logique de classification
```

## Stack Technique

| Technologie | Version | Rôle |
|------------|---------|------|
| **React Native** | 0.81.5 | Framework mobile cross-platform |
| **Expo** | SDK 54 | Plateforme de développement |
| **TensorFlow.js** | 4.22.0 | Runtime ML JavaScript |
| **MobileNet** | 2.1.1 | Modèle de classification pré-entraîné |
| **TypeScript** | 5.9 | Typage statique |

## Prérequis

- **Node.js** >= 18.x
- **npm** ou **yarn**
- **Expo Go** app sur votre téléphone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Installation

### 1. Cloner le repository

```bash
git clone <repository-url>
cd image-classification
```

### 2. Installer les dépendances

```bash
# Avec npm
cd image-classification

# Ou avec yarn
yarn install
```

### 3. Lancer l'application

```bash
# Démarrer le serveur de développement Expo
npx expo start
```

### 4. Tester sur votre appareil

1. Ouvrez l'app **Expo Go** sur votre téléphone
2. Scannez le QR code affiché dans le terminal
3. L'application se charge automatiquement

## Utilisation

1. **Autoriser la caméra** : Acceptez la permission d'accès à la caméra au premier lancement
2. **Pointer vers un objet** : Dirigez la caméra vers l'objet à identifier
3. **Capturer** : Appuyez sur le bouton de capture central
4. **Voir le résultat** : La classification s'affiche en haut de l'écran avec le score de confiance

## Configuration

Les paramètres du modèle sont configurables dans `constants.ts` :

```typescript
// Configuration MobileNet
export const MODEL_CONFIG = {
  inputSize: 224,      // Taille d'entrée du modèle
  version: 2,          // Version MobileNet (1 ou 2)
  alpha: 1.0,          // Largeur du modèle (0.25 à 1.0)
};

// Configuration classification
export const CLASSIFICATION_CONFIG = {
  topK: 3,             // Nombre de prédictions
  confidenceThreshold: 0.1, // Seuil de confiance minimum
};
```

## Tests

```bash
# Lancer les tests unitaires
npm test

# Vérifier le typage TypeScript
npx tsc --noEmit
```

## Structure des Composants

### `useClassification` Hook

Hook personnalisé encapsulant la logique de classification :

```typescript
const { isReady, isClassifying, result, classifyImage } = useClassification();
```

| Propriété | Type | Description |
|-----------|------|-------------|
| `isReady` | `boolean` | Modèle chargé et prêt |
| `isClassifying` | `boolean` | Classification en cours |
| `result` | `string` | Résultat de la classification |
| `classifyImage` | `(uri: string) => Promise<void>` | Fonction de classification |

### Composants UI

| Composant | Props | Description |
|-----------|-------|-------------|
| `CaptureButton` | `onPress`, `disabled`, `isLoading` | Bouton de capture photo |
| `ResultBadge` | `result`, `visible` | Badge affichant le résultat |
| `PhotoThumbnail` | `uri` | Vignette de la dernière photo |

## Développement

### Modifier les styles

Les styles utilisent des design tokens définis dans `styles.ts` :

```typescript
export const COLORS = {
  primary: '#007AFF',
  background: '#000000',
  // ...
};

export const SPACING = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
};
```

### Ajouter une nouvelle fonctionnalité

1. Créer le composant dans `components/`
2. Exporter depuis `components/index.ts`
3. Ajouter les types dans `types.ts`
4. Intégrer dans `App.tsx`

## Performance

| Métrique | Valeur |
|----------|--------|
| Temps de chargement modèle | ~2-3s |
| Temps d'inférence | ~100-300ms |
| Taille du bundle | ~15 MB |
| Catégories supportées | 1000+ (ImageNet) |

## 🔗 Ressources

- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [MobileNet Model](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)
- [Expo Camera Documentation](https://docs.expo.dev/versions/latest/sdk/camera/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

---

**Développé pour monter en compétences sur Reactjs**
