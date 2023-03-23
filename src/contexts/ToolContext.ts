import { createContext } from 'react';
import { UseStateSetter } from '../models/UseStateSetter';
import { AnnotationPropsObject } from '../components/annotations/tools/AllAnnotationProps';
import { ScreenshotInfo } from '../models/ScreenshotInfo';
import { ConsoleOutput } from '../models/ConsoleOutput';

export const ToolContext = createContext<{
    annotations: AnnotationPropsObject;
    setAnnotations: UseStateSetter<AnnotationPropsObject>;
    screenshots: ScreenshotInfo[];
    setScreenshots: UseStateSetter<ScreenshotInfo[]>;
    isOngoingAnnotation: boolean;
    setIsOngoingAnnotation: UseStateSetter<boolean>;
    consoleOutput: ConsoleOutput;
}>({
    annotations: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setAnnotations: () => {},
    screenshots: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setScreenshots: () => {},
    isOngoingAnnotation: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsOngoingAnnotation: () => {},
    consoleOutput: { log: [], debug: [], info: [], warn: [], error: [] }
});
