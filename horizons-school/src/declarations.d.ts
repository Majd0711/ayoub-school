declare module 'aos' {
  interface AosOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    offset?: number;
    delay?: number;
    startEvent?: string;
    disable?: boolean | (() => boolean);
    throttleDelay?: number;
    debounceDelay?: number;
    disableMutationObserver?: boolean;
  }

  interface AOS {
    init(options?: AosOptions): void;
    refresh(force?: boolean): void;
    refreshHard(): void;
  }

  const aos: AOS;
  export default aos;
} 