type Product = {
    link: string;
    info: string;
    price: string;
    sps: string;
    model: string;
    discount: number;
    finalPrice: number;
};

type TableProps = {
    sortedProducts: Product[];
};
export type { Product, TableProps }