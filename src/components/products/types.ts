export interface IProductCreate {
    name: string;
    price: number;
    category_id: number;
    description: string;
    files: Array<File>;
};

export interface IProductItem {
    id: number,
    name: string,
    files: string[],
    price: number,
    category_id:string,
    description: string
}

export interface IProductEdit {
    name: string,
    price: number,
    description: string,
    category_id: string,
    files: Array<File>,
    removeFiles: string[]
}