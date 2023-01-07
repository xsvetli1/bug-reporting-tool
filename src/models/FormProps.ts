export type FormProps = {
    [key in FormFields]?: string;
};

export type FormFields = 'email' | 'title' | 'description';
