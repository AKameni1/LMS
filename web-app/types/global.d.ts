import NutrientViewer from '@nutrient-sdk/viewer';
import en from '../messages/en.json';

type Messages = typeof en;

// This is a global declaration to make TypeScript happy
declare global {
  interface Window {
    // Nutrient Web SDK will be available on window.NutrientViewer once loaded
    NutrientViewer?: typeof NutrientViewer;
  }
  interface IntlMessages extends Messages {}
}
