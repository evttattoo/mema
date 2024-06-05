import React, { useState } from "react";
import Pagination from './pagination';

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

const Table: React.FC<TableProps> = ({ sortedProducts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 14;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="items">
            {/* <h2>Таблица товаров:</h2> */}
            <table
                className="table"
            >
                <thead className="thead-dark">
                    <tr>
                        <th className="thName">Товар</th>
                        <th>Начальная цена</th>
                        <th>Кэшбек</th>
                        <th>Кэшбек, %</th>
                        <th>Итоговая цена</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product: Product) => (
                        <tr key={product.link} className="table-row">
                            <td
                                className="td-name"
                            >
                                <a href={product.link} target="_blank" rel="noopener noreferrer">
                                    {product.info}
                                </a>
                            </td>
                            <td>{product.price} ₽</td>
                            <td>{product.sps}</td>
                            <td>{product.discount} %</td>
                            <td>{product.finalPrice} ₽</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <div className="pagination">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                <span className="products-Count">Кол-во товаров: {sortedProducts.length}</span>
            </div>
        </div>
    );
}

export default Table;