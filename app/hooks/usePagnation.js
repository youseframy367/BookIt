import { useState, useMemo, useRef } from "react";

export function usePagnation(data, searchTerm) {
    const [filterData, setFilterData] = useState({
        site: "",
        type: "",
        date: "",
    });

    const numbersRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numRow, setNumRow] = useState(13);

    const filteredCustomers = useMemo(() => {
        return data.filter((customer) => {
            const lowerSearch = searchTerm?.toLowerCase() || "";

            const searchMatch =
                !searchTerm ||
                Object.values(customer).some((val) =>
                    val?.toString().toLowerCase().includes(lowerSearch)
                );

            const siteMatch =
                !filterData.site ||
                customer.numBerson.toString() === String(filterData.site);

            const timeMatch = (() => {
                if (!filterData.type) return true;

                const custTime24 = to24Hour(customer.time);
                const filterTime = String(filterData.type).slice(0, 5);
                return custTime24 === filterTime;
            })();

            const dateMatch = (() => {
                if (!filterData.date) return true;
                if (!customer.Date) return false;

                const parts = customer.Date.split("/");
                if (parts.length !== 3) return false;

                const [d, m, y] = parts;
                const formattedDate = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;

                return formattedDate === filterData.date;
            })();

            return searchMatch && siteMatch && timeMatch && dateMatch;
        });
    }, [data, searchTerm, filterData]);

    function to24Hour(timeStr) {
        if (!timeStr) return "";
        timeStr = timeStr.trim();


        const hhmm24Regex = /^\d{1,2}:\d{2}$/;
        if (hhmm24Regex.test(timeStr)) {

            const [h, m] = timeStr.split(":");
            return `${String(h).padStart(2, "0")}:${m}`;
        }


        const match = timeStr.match(/^(\d{1,2}:\d{2})\s*([AaPp][Mm])$/);
        if (!match) {

            return timeStr;
        }

        let [, timePart, modifier] = match;
        let [hours, minutes] = timePart.split(":").map(s => s.padStart(2, "0"));
        modifier = modifier.toUpperCase();

        let hNum = parseInt(hours, 10);
        if (modifier === "PM" && hNum !== 12) hNum += 12;
        if (modifier === "AM" && hNum === 12) hNum = 0;

        return `${String(hNum).padStart(2, "0")}:${minutes}`;
    }

    const numPages = Math.ceil(filteredCustomers.length / numRow);
    const displayedCustomers = filteredCustomers.slice(
        (currentPage - 1) * numRow,
        currentPage * numRow
    );

    const scroll = (direction) => {
        if (!numbersRef.current) return;
        const scrollAmount = 120;
        numbersRef.current.scrollBy({
            left: direction === "right" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    return {
        setFilterData,
        currentPage,
        setCurrentPage,
        numPages,
        setNumRow,
        displayedCustomers,
        scroll,
        numRow,
        numbersRef
    };
}