export type FormProps = {
    [key in FormFields]?: { value: string; required: boolean; error: boolean };
};

export type FormFields = 'email' | 'title' | 'description';
