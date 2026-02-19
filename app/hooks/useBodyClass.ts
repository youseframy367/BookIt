import { useEffect, useRef, useState } from "react";

export function useMenuSearch() {
    const [openMenu, setOpenMenu] = useState(false);
    const [show, setShow] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isActive = openMenu || show;

        if (isActive) {
            document.body.classList.add("search-active");
            document.body.style.overflow = "hidden";
        } else {
            document.body.classList.remove("search-active");
            document.body.style.overflow = "";
        }

        return () => {
            document.body.classList.remove("search-active");
            document.body.style.overflow = "";
        };
    }, [openMenu, show]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            if (
                openMenu &&
                menuRef.current &&
                !menuRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setOpenMenu(false);
            }

            if (
                show &&
                searchRef.current &&
                !searchRef.current.contains(target)
            ) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenu, show]);

    return {
        openMenu,
        setOpenMenu,
        show,
        setShow,
        menuRef,
        buttonRef,
        searchRef,
    };
}