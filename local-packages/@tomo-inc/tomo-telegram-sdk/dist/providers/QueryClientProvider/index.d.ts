import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { PropsWithChildren } from 'react';
export declare const queryClient: QueryClient;
declare function BaseQueryClientProvider({ children }: PropsWithChildren): React.JSX.Element;
export default BaseQueryClientProvider;
