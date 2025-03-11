export declare namespace TelegramWebApps {
  interface SDK {
    Webapp: WebApp;
  }
}

interface WebApp {
  close(): void;
  ready(): void;
  MainButton: MainButton;
  BackButton: BackButton;
  enableClosingConfirmation(): void;
}

interface MainButton {
  text: string;
  isVisible: boolean;
  show(): void;
}
interface BackButton {
  isVisible: boolean;
  show(): void;
}

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK;
  }
}
