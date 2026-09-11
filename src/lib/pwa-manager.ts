// PWA helper and event coordination
import { useSyncExternalStore } from 'react';
import { registerSW } from 'virtual:pwa-register';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

class PWAManager {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private listeners: Set<() => void> = new Set();
  private isUpdateAvailable = false;
  private updateSWHandler: ((reloadPage?: boolean) => Promise<void>) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    // Listen for beforeinstallprompt event (Chromium browsers)
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.notify();
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.notify();
    });

    // Register VitePWA Service Worker
    try {
      this.updateSWHandler = registerSW({
        immediate: true,
        onNeedRefresh: () => {
          this.isUpdateAvailable = true;
          this.notify();
        },
        onOfflineReady: () => {
          // Ready for 100% offline usage
          this.notify();
        },
      });
    } catch {
      // SW not supported in current environment or dev mode
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public isStandalone(): boolean {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  }

  public isIOS(): boolean {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua);
  }

  public canPromptInstall(): boolean {
    return this.deferredPrompt !== null;
  }

  public async promptInstall(): Promise<'accepted' | 'dismissed' | 'unsupported'> {
    if (!this.deferredPrompt) {
      return 'unsupported';
    }

    try {
      await this.deferredPrompt.prompt();
      const choice = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null;
      this.notify();
      return choice.outcome;
    } catch {
      this.deferredPrompt = null;
      this.notify();
      return 'dismissed';
    }
  }

  public hasUpdate(): boolean {
    return this.isUpdateAvailable;
  }

  public async applyUpdate() {
    if (this.updateSWHandler) {
      await this.updateSWHandler(true);
    }
  }
}

export const pwaManager = new PWAManager();

export function useIsStandalone(): boolean {
  return useSyncExternalStore(
    (cb) => pwaManager.subscribe(cb),
    () => pwaManager.isStandalone(),
    () => false
  );
}

export function useCanPromptInstall(): boolean {
  return useSyncExternalStore(
    (cb) => pwaManager.subscribe(cb),
    () => pwaManager.canPromptInstall(),
    () => false
  );
}

export function useHasUpdate(): boolean {
  return useSyncExternalStore(
    (cb) => pwaManager.subscribe(cb),
    () => pwaManager.hasUpdate(),
    () => false
  );
}

export function useIsIOS(): boolean {
  return useSyncExternalStore(
    (cb) => pwaManager.subscribe(cb),
    () => pwaManager.isIOS(),
    () => false
  );
}
