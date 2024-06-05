import React, { useState, useMemo } from "react";
import { isUnique } from "./utils";
import "rc-slider/assets/index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import result from "./result.json";
import items from "./data.json";
import Table from "./table"
import Filters from "./filters"

interface CategoryFilter {
  model: string;
}
function App() {
  const products = result.filter(isUnique);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [spsRange, setSpsRange] = useState<[number, number]>([0, 150]);
  const [sortByPrice, setSortByPrice] = useState("OFF");
  const [sortByDiscount, setSortByDiscount] = useState("DESC");
  const [sortByFinal, setSortByFinal] = useState("OFF")
  const [categoryFilters, setCategoryFilters] = useState(new Set());

  function updateFilters(checked: boolean, categoryFilter: CategoryFilter) {
    const updatedFilters = new Set(categoryFilters);
    if (checked) {
      updatedFilters.add(categoryFilter.model);
    } else {
      updatedFilters.delete(categoryFilter.model);
    }
    setCategoryFilters(updatedFilters);
  }


  const sortedProducts = useMemo(() => {
    const filteredProducts =
      categoryFilters.size === 0
        ? products.filter(
          (p) =>
            Number(p.price) >= Number(priceRange[0]) &&
            Number(p.price) <= Number(priceRange[1]) &&
            Number(p.discount) >= Number(spsRange[0]) &&
            Number(p.discount) <= Number(spsRange[1]),
        )
        : products.filter(
          (p) =>
            categoryFilters.has(p.model) &&
            Number(p.price) >= Number(priceRange[0]) &&
            Number(p.price) <= Number(priceRange[1]) &&
            Number(p.discount) >= Number(spsRange[0]) &&
            Number(p.discount) <= Number(spsRange[1]),
        );

    if (sortByPrice === "ASC") {
      return filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortByPrice === "DESC") {
      return filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortByDiscount === "ASC") {
      return filteredProducts.sort((a, b) => Number(a.discount) - Number(b.discount));
    } else if (sortByDiscount === "DESC") {
      return filteredProducts.sort((a, b) => Number(b.discount) - Number(a.discount));
    }

    if (sortByFinal === "ASC") {
      return filteredProducts.sort((a, b) => Number(a.finalPrice) - Number(b.finalPrice));
    } else if (sortByFinal === "DESC") {
      return filteredProducts.sort((a, b) => Number(b.finalPrice) - Number(a.finalPrice));
    }
    return [];
  }, [categoryFilters, sortByPrice, sortByDiscount, sortByFinal, priceRange, spsRange]);

  const handleSortByPrice = () => {
    setSortByDiscount("OFF");
    setSortByFinal("OFF")
    setSortByPrice((prevValue) => {
      if (prevValue === "ASC") {
        return "DESC";
      }
      if (prevValue === "DESC" || prevValue === "OFF") {
        return "ASC";
      }
      return "OFF"
    });
  };

  const handleSortByDiscount = () => {
    setSortByPrice("OFF");
    setSortByFinal("OFF")
    setSortByDiscount((prevValue) => {
      if (prevValue === "ASC") {
        return "DESC";
      }
      if (prevValue === "DESC" || prevValue === "OFF") {
        return "ASC";
      }
      return "OFF"
    });
  };

  const handleSortByFinal = () => {
    setSortByPrice("OFF");
    setSortByDiscount("OFF");
    setSortByFinal((prevValue) => {
      if (prevValue === "ASC") {
        return "DESC";
      }
      if (prevValue === "DESC" || prevValue === "OFF") {
        return "ASC";
      }
      return "OFF"
    });
  };

  return (
    <div>
      {/* <h1 className="text-center mt-4">Me Ma</h1>
      <p className="text-center grey">га ркет</p> */}
      <div className="container ">
        <Filters
          items={items}
          updateFilters={updateFilters}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          setSpsRange={setSpsRange}
          spsRange={spsRange}
          handleSortByPrice={handleSortByPrice}
          sortByPrice={sortByPrice}
          handleSortByDiscount={handleSortByDiscount}
          sortByDiscount={sortByDiscount}
          handleSortByFinal={handleSortByFinal}
          sortByFinal={sortByFinal}
        />
        <Table sortedProducts={sortedProducts} />
      </div>
    </div>
  );
}
export default App;
