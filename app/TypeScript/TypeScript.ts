export interface nextAndBackPage {
    nextPage?: boolean;
    backPage?: string;
    title?: string;
    image?: string;
    isShowGallery?: boolean;
    isActiveButtonHero?: boolean;
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
    loading?: boolean;
    isColor?: string;
}

export interface ChildRegister {
    children?: React.ReactNode;
    padding: string;
}

export interface RestaurantItem {
    img: string;
    name: string;
    rating: number;
    des: string;
    like: boolean;
    area: string;
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

interface itemsProducts {
    id: number;
    active: boolean;
    icon: string;
    title: string;
    subTitle: string;
    amount: string;
    rating: string;
}

export interface isProducts {
    products: itemsProducts[];
    marginTop?: string;
}

interface Item {
    id: number;
    title: string;
    content: string;
};

export interface questionsAndAnswaer {
    items: Item[];
}

export interface isFilter {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export interface layoutLoginOrRegister {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    bg: string;
    width?: string;
    isActiveLogo?: boolean;
}

export interface dataCards {
    toggleExpand: (index: number) => void;
    index: number;
    item: RestaurantItem;
}

interface itemsReivews {
    title: string;
    rating: number;
    name: string;
    job: string;
}

export interface reivews {
    item: itemsReivews;
}

export interface passSearchData {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    showSearch: boolean;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>
}

export interface dataHero {
    title: string;
    backgroundImage: string;
    paddingMobile: string;
}

export interface dataSidBar {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setActiveComponent: (component: "control" | "customers") => void;
}

export interface remove {
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface myFilter {
    filter?: string;
}

interface ProductItem {
    image: string;
    name: string;
    price: number;
    rating: number;
    quantity: number;
}

export interface Category {
    title: string;
    icon: string;
    active: boolean;
    items: ProductItem[];
}