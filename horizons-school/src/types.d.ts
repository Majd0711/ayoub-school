// Type declarations for components
declare module './components/Header' {
  const Header: React.FC;
  export default Header;
}

declare module './components/Footer' {
  const Footer: React.FC;
  export default Footer;
}

// Type declarations for pages
declare module './pages/Home' {
  const Home: React.FC;
  export default Home;
}

declare module './pages/About' {
  const About: React.FC;
  export default About;
}

declare module './pages/Programs' {
  const Programs: React.FC;
  export default Programs;
}

declare module './pages/Contact' {
  const Contact: React.FC;
  export default Contact;
}

declare module '@testing-library/react' {
  export interface RenderResult {
    container: HTMLElement;
    baseElement: HTMLElement;
    debug: (baseElement?: HTMLElement | DocumentFragment) => void;
    rerender: (ui: React.ReactElement) => void;
    unmount: () => void;
    asFragment: () => DocumentFragment;
  }

  export function render(
    ui: React.ReactElement,
    options?: any
  ): RenderResult;

  export const screen: {
    getByText: (text: string | RegExp) => HTMLElement;
    queryByText: (text: string | RegExp) => HTMLElement | null;
    getByRole: (role: string, options?: { name: string | RegExp }) => HTMLElement;
  };

  export function waitFor<T>(
    callback: () => T | Promise<T>,
    options?: {
      timeout?: number;
      interval?: number;
      onTimeout?: (error: Error) => Error;
    }
  ): Promise<T>;
}

declare module '@testing-library/jest-dom' {
  export {};
}

declare module '@testing-library/user-event' {
  const userEvent: any;
  export default userEvent;
}

declare module 'react-dom/test-utils' {
  export function act(callback: () => Promise<void> | void): Promise<undefined> | undefined;
}

declare namespace jest {
  interface Mock<T = any, Y extends any[] = any> {
    mockResolvedValue: (value: T) => Mock<T, Y>;
  }
} 