import { TokenType } from '../api/type';
export default function useOnRamp({ type, rampType, token, }: {
    type: 'buy' | 'sell';
    rampType: 'ramp' | 'mercuryo';
    token: TokenType | undefined;
}): {
    onContinue: () => any;
    title: string;
};
