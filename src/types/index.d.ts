export declare namespace TelegramWebApps {
  interface SDK {
    Webapp: WebApp;
  }
}

interface WebApp {
  ready(): void;
  BackButton: BackButton;
}

interface BackButton {
  isVisible: boolean;
}

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK;
  }
}
