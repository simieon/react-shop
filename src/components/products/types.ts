export interface IProductCreate {
    name: string;
    price: number;
    category_id: number;
    description: string;
    files: Array<File>;
};