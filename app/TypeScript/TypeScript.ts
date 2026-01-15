export interface nextPage {
    nextPage?: string;
    title?: string;
    image?: string;
}

interface typeData {
    title: string;
    active: boolean
}

export interface filterTitle {
    data: typeData[];
    onChange: (index: number) => void;
}

export interface btn {
    title: string;
    width: string;
}

export interface ChildRegister {
    children?: React.ReactNode;
}