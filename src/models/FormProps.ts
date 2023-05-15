/**
 * Type holding report form fields properties, such as its value, required flag,
 * and error flag.
 */
export type FormProps = {
    [key in FormFields]?: { value: string; required: boolean; error: boolean };
};

export type FormFields = 'email' | 'title' | 'description';
