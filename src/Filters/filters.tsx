import React from "react";
import Multiselect from "multiselect-react-dropdown";
import Slider from "rc-slider";
import { Item, Props } from "./types";
import "rc-slider/assets/index.css";
import "./filters.css"

const Filters: React.FC<Props> = ({
    items,
    updateFilters,
    setPriceRange,
    priceRange,
    setSpsRange,
    spsRange,
    handleSortByPrice,
    sortByPrice,
    handleSortByDiscount,
    sortByDiscount,
    handleSortByFinal,
    sortByFinal,
    handleSliderPriceChange,
    handleSliderSpsChange
}) => {
    return (
        <div className="filters">
            <h2>Фильтры:</h2>
            <div className="models">
                <Multiselect
                    displayValue="model"
                    onKeyPressFn={function noRefCheck() { }}
                    onSelect={(selectedList, selectedItem) =>
                        updateFilters(true, selectedItem)
                    }
                    onRemove={(selectedList, removedItem) =>
                        updateFilters(false, removedItem)
                    } // onSearch={function noRefCheck() { }}
                    options={items.filter((item) =>
                        item.model.toLowerCase().includes("iphone"),
                    )}
                    showCheckbox
                    placeholder="Модели Iphone"
                    className="selector"
                />
                <Multiselect
                    displayValue="model"
                    onKeyPressFn={function noRefCheck() { }}
                    onSelect={(selectedList, selectedItem) =>
                        updateFilters(true, selectedItem)
                    }
                    onRemove={(selectedList, removedItem) =>
                        updateFilters(false, removedItem)
                    } // onSearch={function noRefCheck() { }}
                    options={items.filter((item) =>
                        item.model.toLowerCase().includes("macbook"),
                    )}
                    showCheckbox
                    placeholder="Модели Macbook"
                    className="selector"
                />
                <Multiselect
                    displayValue="model"
                    onKeyPressFn={function noRefCheck() { }}
                    onSelect={(selectedList, selectedItem) =>
                        updateFilters(true, selectedItem)
                    }
                    onRemove={(selectedList, removedItem) =>
                        updateFilters(false, removedItem)
                    } // onSearch={function noRefCheck() { }}
                    options={items.filter((item) =>
                        item.model.toLowerCase().includes("apple watch"),
                    )}
                    showCheckbox
                    placeholder="Модели Apple Watch"
                    className="selector"
                />
            </div>
            <div className="price">
                <p>Цена</p>
                <div className="slider">
                    <Slider
                        range
                        min={10000}
                        max={300000}
                        defaultValue={[50000, 100000]}
                        onChange={handleSliderPriceChange}
                    />
                </div>
                <div className="priceHolders">
                    <label className="priceHolderLabel">
                        <span className="prefix">от</span>
                        <input
                            id="price1"
                            className="priceHolderInput"
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) =>
                                setPriceRange([Number(e.target.value), priceRange[1]])
                            }
                        />
                        <span className="postfix">₽</span>
                    </label>
                    <label className="priceHolderLabel">
                        <span className="prefix">до</span>
                        <input
                            id="price2"
                            className="priceHolderInput"
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) =>
                                setPriceRange([priceRange[0], Number(e.target.value)])
                            }
                        />
                        <span className="postfix">₽</span>
                    </label>
                </div>
            </div>
            <div className="price">
                <p>Кэшбек, %</p>
                <div className="slider">
                    <Slider
                        range
                        min={0}
                        max={110}
                        defaultValue={[5, 90]}
                        onChange={handleSliderSpsChange}
                    />
                </div>
                <div className="priceHolders">
                    <label className="priceHolderLabel">
                        <span className="prefix">от</span>
                        <input
                            id="1"
                            className="spsHolderInput"
                            type="number"
                            value={spsRange[0]}
                            onChange={(e) =>
                                setSpsRange([Number(e.target.value), spsRange[1]])
                            }
                        />
                        <span className="postfix">%</span>
                    </label>
                    <label className="priceHolderLabel">
                        <span className="prefix">до</span>
                        <input
                            id="2"
                            className="spsHolderInput"
                            type="number"
                            value={spsRange[1]}
                            onChange={(e) =>
                                setSpsRange([spsRange[0], Number(e.target.value)])
                            }
                        />
                        <span className="postfix">%</span>
                    </label>
                </div>
            </div>
            <div className="price">
                <p>Сортировать по:</p>
                <div className="sort">
                    <button onClick={handleSortByPrice}
                        className={"btnSort " + (sortByPrice === "ASC" ? "btnEnabled" : "btnDisabled")}
                    >
                        Начальной цене
                    </button>
                    <button onClick={handleSortByDiscount}
                        className={"btnSort " + (sortByDiscount === "DESC" ? "btnEnabled" : "btnDisabled")}
                    >
                        Проценту кэшбека

                    </button>
                    <button onClick={handleSortByFinal}
                        className={"btnSort " + (sortByFinal === "ASC" ? "btnEnabled" : "btnDisabled")}
                    >
                        Итоговой цене
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Filters;