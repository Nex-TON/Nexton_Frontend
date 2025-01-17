import { ClassValue } from 'clsx';
export declare const setPassKey: (key: string) => void;
export declare const removePassKey: () => void;
export declare function generateRandomString(length: number): string;
export declare function hashWithWebCrypto(message: string): Promise<string>;
export declare function sleep(ms: number): Promise<unknown>;
export declare function cn(...inputs: ClassValue[]): string;
export declare function validEmail(str: string): boolean;
