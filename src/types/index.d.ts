export declare namespace TelegramWebApps {
  interface SDK {
    Webapp: WebApp;
  }
}

interface WebApp {
  ready(): void;
  MainButton: MainButton;
  BackButton: BackButton;
}

interface MainButton {
  text: string;
  isVisible: boolean;
}
interface BackButton {
  isVisible: boolean;
}

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK;
  }
}
