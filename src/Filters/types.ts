type Item = {
    link: string;
    model: string;
    status: boolean;
}
type Props = {
    items: Item[];
    updateFilters: (checked: boolean, selectedItem: Item) => void;
    setPriceRange: (range: [number, number]) => void;
    priceRange: number[];
    setSpsRange: (range: [number, number]) => void;
    spsRange: number[];
    handleSortByPrice: () => void;
    sortByPrice: string;
    handleSortByDiscount: () => void;
    sortByDiscount: string;
    handleSortByFinal: () => void;
    sortByFinal: string;
    handleSliderPriceChange: (values: number[] | number) => void;
    handleSliderSpsChange: (values: number[] | number) => void;
}

export type { Item, Props }