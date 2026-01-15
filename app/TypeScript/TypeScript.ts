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

// interface Items {
//     title: string;
//     subTitle: string;
// }

// export interface Realted {
//     dataRealtiedAndBooked: Items[];
// }