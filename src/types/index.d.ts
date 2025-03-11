export declare namespace TelegramWebApps {
  interface SDK {
    WebApp: WebApp;
  }
}

interface WebApp {
  ready(): void;
  MainButton: MainButton;
  BackButton: BackButton;
  enableClosingConfirmation(): void;
  close(): void;
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
