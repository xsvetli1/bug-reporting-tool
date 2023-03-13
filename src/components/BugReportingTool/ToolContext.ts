import { createContext } from 'react';
import { UseStateSetter } from '../../models/UseStateSetter';

export const ToolContext = createContext<{
    screenshots: string[];
    setScreenshots: UseStateSetter<string[]>;
    isOngoingAnnotation: boolean;
    setIsOngoingAnnotation: UseStateSetter<boolean>;
}>({
    screenshots: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setScreenshots: () => {},
    isOngoingAnnotation: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsOngoingAnnotation: () => {}
});
