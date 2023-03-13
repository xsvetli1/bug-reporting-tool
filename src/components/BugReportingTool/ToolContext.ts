import { createContext } from 'react';
import { UseStateSetter } from '../../models/UseStateSetter';

export const ToolContext = createContext<{
    screenshots: string[];
    setScreenshots: UseStateSetter<string[]>;
}>({
    screenshots: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setScreenshots: () => {}
});
