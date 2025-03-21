declare module '*.svg?react'{
    import * as React from 'react';
    export const ReactComponent:React.FunctionComponent<
    React.ComponentProps<'svg'>&{title?:string}
    >;
    export default ReactComponent
}