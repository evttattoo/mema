import React from 'react';

interface Settings {
    currentPage: number;
    totalPages: number;
    onPageChange: Function;
}

const Pagination: React.FC<Settings> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
        const extraClass = number === currentPage ? 'on-page' : '';
        if (totalPages > 5) {
            if (number === currentPage || number === 1 || number === totalPages || (number >= currentPage - 2 && number <= currentPage + 2)) {
                return (
                    <li
                        className={`pagination-Ul-Li ${extraClass}`}
                        key={number}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </li>
                );
            } else if (number === 2 || number === totalPages - 1) {
                return <li
                    className='tri-tochki'
                    key={number}>...</li>;
            } else {
                return null;
            }
        } else {
            return (
                <li
                    className='pagination-Ul-Li'
                    key={number}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </li>
            );
        }
    });

    return (
        <ul className='pagination-Ul'>
            <li
                className='pagination-Ul-Li'
                onClick={() => onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1)}
            >
                Назад
            </li>
            {renderPageNumbers}
            <li
                className='pagination-Ul-Li'
                onClick={() => onPageChange(currentPage + 1 <= totalPages ? currentPage + 1 : totalPages)}
            >
                Вперед
            </li>
        </ul>
    );
};

export default Pagination;