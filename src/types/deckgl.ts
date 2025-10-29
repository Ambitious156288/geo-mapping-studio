export interface DeckGLViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface DeckGLViewStateChangeEvent {
  viewState: DeckGLViewState;
  interactionState?: unknown;
  oldViewState?: DeckGLViewState;
}

export interface EditableLayerEditEvent {
  updatedData?: {
    type: "FeatureCollection";
    features: unknown[];
  };
  editType?: string;
  featureIndex?: number;
}

export interface LayerAccessorInfo {
  index?: number;
  data?: unknown;
  [key: string]: unknown;
}

export interface ScatterplotDataPoint {
  position: [number, number];
}

export interface MapClickEvent {
  features?: Array<{
    index?: number | string;
    [key: string]: unknown;
  }>;
  lngLat?: { lng: number; lat: number };
  point?: { x: number; y: number };
  [key: string]: unknown;
}
