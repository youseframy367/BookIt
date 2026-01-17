export interface nextAndBackPage {
    nextPage?: boolean;
    backPage?: string;
    title?: string;
    image?: string;
    isShowGallery?: boolean;
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
    onSubmit?: () => {};
}

export interface ChildRegister {
    children?: React.ReactNode;
    padding: string;
}

export interface HeaderItem {
    title: string;
    subTitle: string;
}

export interface RestaurantItem {
    img: string;
    name: string;
    Relative: number;
    des: string;
    lick: boolean;
}

export interface DataObject {
    header: HeaderItem;
    items: RestaurantItem[];
}

export type DataRealtied = DataObject[];

export interface Props {
    dataRealtiedAndBooked: DataRealtied;
}

export interface Header {
    title: string,
    subTitle: string
}

export interface GalleryItem {
    title: string;
    icon: string;
}

export interface GalleryProps {
    gallery: string[] | GalleryItem[];
}