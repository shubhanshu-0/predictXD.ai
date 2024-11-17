declare module 'react-native-image-crop-picker' {
  export interface Image {
    path: string;
    width: number;
    height: number;
    mime: string;
  }

  export interface Options {
    width?: number;
    height?: number;
    cropping?: boolean;
    multiple?: boolean;
    includeBase64?: boolean;
    compressImageQuality?: number;
    cropperCircleOverlay?: boolean;
    freeStyleCropEnabled?: boolean;
  }

  export default class ImagePicker {
    static openPicker(options?: Options): Promise<Image>;
    static openCamera(options?: Options): Promise<Image>;
    static clean(): Promise<void>;
    static cleanSingle(path: string): Promise<void>;
  }
}
