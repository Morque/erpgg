import React, { useEffect, useRef, useState } from 'react';
import { left_arrow, right_arrow } from '../../../Assets/images';
import './Header.css';

interface MenuLayout {
    iconUrl?: string,
    displayText: string,
    children: Array<MenuLayout> | string
}

interface MenuHeaderProps {
    listMenus?: Array<MenuLayout>
}

const useMenuSectionContext = () => {
    const [_indexMenuSectionDisplayed, _setIndexMenuSectionDisplayed] = useState<number>(0);

    return ({
        indexMenuSectionDisplayed: _indexMenuSectionDisplayed,
        setIndexMenuSectionDisplayed: _setIndexMenuSectionDisplayed,
    })
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ listMenus }) => {

    const [menuSections, setMenusSections] = useState<Array<Array<MenuLayout>>>();
    const [currentMenuSectionDisplayed, setCurrentMenuSectionDisplayed] = useState<Array<MenuLayout>>();

    const { indexMenuSectionDisplayed, setIndexMenuSectionDisplayed } = useMenuSectionContext();
    const menuCenterContainerRef = useRef<HTMLDivElement>(null);

    const menusRefs = useRef<{ [key: number]: HTMLUListElement | null }>({});

    function chunkArray(array: Array<MenuLayout>, chunkSize: number) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            result.push(chunk);
        }

        if (result[result.length - 1].length < 5) {
            for (let i = result[result.length - 1].length; i < 6; i++) {
                result[result.length - 1].push({ displayText: '', children: [] });
            }
        }

        return result;
    }

    const buildMenusSections = () => {
        if (listMenus) {
            if (listMenus?.length <= 5) {
                setMenusSections([[...listMenus]]);
                setCurrentMenuSectionDisplayed(listMenus);
                setIndexMenuSectionDisplayed(0);
            }
            else {
                var _menusSection = chunkArray(listMenus, 5);
                setMenusSections(_menusSection);
                if (_menusSection.length >= indexMenuSectionDisplayed) {
                    setCurrentMenuSectionDisplayed(_menusSection[indexMenuSectionDisplayed]);
                }
                else {
                    setCurrentMenuSectionDisplayed(_menusSection[0]);
                    setIndexMenuSectionDisplayed(0);
                }
            }
        }
    }

    const handleRightMenuClick = () => {
        if (menuSections && indexMenuSectionDisplayed == menuSections?.length - 1) return
        menuCenterContainerRef.current?.classList.remove('menu-anim-fadein-reverse');
        menuCenterContainerRef.current?.classList.remove('menu-anim-fadeout-reverse');
        menuCenterContainerRef.current?.classList.remove('menu-header-fade-in');
        menuCenterContainerRef.current?.classList.add('menu-header-fade-out');

        setTimeout(() => {
            menuCenterContainerRef.current?.classList.remove('menu-header-fade-out');
            menuCenterContainerRef.current?.classList.add('menu-header-fade-in');
        }, 200);

        setTimeout(() => {
            setIndexMenuSectionDisplayed(indexMenuSectionDisplayed as number + 1);
            if (menuSections) setCurrentMenuSectionDisplayed(menuSections[indexMenuSectionDisplayed as number + 1]);
        }, 250);

    }

    const handleLeftMenuClick = () => {
        if (indexMenuSectionDisplayed == 0) return
        menuCenterContainerRef.current?.classList.remove('menu-header-fade-in');
        menuCenterContainerRef.current?.classList.remove('menu-header-fade-out');
        menuCenterContainerRef.current?.classList.remove('menu-anim-fadeout-reverse');
        menuCenterContainerRef.current?.classList.add('menu-anim-fadein-reverse');

        setTimeout(() => {
            menuCenterContainerRef.current?.classList.remove('menu-anim-fadein-reverse');
            menuCenterContainerRef.current?.classList.add('menu-anim-fadeout-reverse');
        }, 200);

        setTimeout(() => {
            setIndexMenuSectionDisplayed(indexMenuSectionDisplayed as number - 1);
            if (menuSections) setCurrentMenuSectionDisplayed(menuSections[indexMenuSectionDisplayed as number - 1]);
        }, 250);
    }

    const handleMenuClick = (displayText: string) => {
        const subMenu = document.getElementById(`subMenu${displayText}`);

        const otherSubMenus = document.querySelectorAll("[id*='subMenu']");

        otherSubMenus.forEach(element => {
            if (!element.classList.contains('hidden')) {
                element.classList.add('hidden');
            }
        })

        if (subMenu?.classList.contains('hidden')) {
            subMenu?.classList.remove("hidden");
        }
        else {
            subMenu?.classList.add("hidden");
        }
    }

    const closeSubMenus = (event: MouseEvent): any => {
        Object.values(menusRefs.current).forEach(menu => {
            if (!menu?.contains(event.target as Node)) {
                const htmlMenu = menu as HTMLUListElement | null;
                if (htmlMenu && !htmlMenu.classList.contains('hidden')) {
                    htmlMenu.classList.add('hidden');
                }
            }
        })
    }

    const ComponentLeftArrow = (
        <>
            {
                menuSections && menuSections?.length > 1 &&
                (
                    <div
                        className={`flex justify-center items-center my-auto ${indexMenuSectionDisplayed === 0 ? 'opacity-0' : ''}`}
                        onClick={handleLeftMenuClick}
                    >
                        {/* <img  src={left_arrow} className='w-5/12' /> */}
                        <span className="material-icon material-symbols-outlined text-white text-sm  pr-2 pl-6 cursor-pointer" >
                            arrow_back_ios
                        </span>

                    </div>
                )
            }
        </>
    )

    const componentRightArrow = (
        <>
            {
                menuSections && menuSections?.length > 1 &&
                (
                    <div
                        className={`flex justify-center items-center ${indexMenuSectionDisplayed === menuSections.length - 1 ? 'opacity-0' : ''}`}
                        onClick={handleRightMenuClick}
                    >
                        {/* <img  src={right_arrow} className='w-5/12' /> */}
                        <span className="material-icon material-symbols-outlined text-white text-sm pl-2 pr-6 cursor-pointer" >
                            arrow_forward_ios
                        </span>
                    </div>
                )
            }
        </>
    )

    useEffect(() => {
        buildMenusSections();

        document.addEventListener('mousedown', closeSubMenus)
        return () => {
            document.removeEventListener('mousedown', closeSubMenus)
        }

    }, [listMenus])

    return (
        <div className='h-full w-full flex flex-row justify-around border-l border-r border-gray-400 '>
            {ComponentLeftArrow}
            <div
                className='flex flex-row justify-around w-full menu-header'
                ref={menuCenterContainerRef}
            >
                {
                    currentMenuSectionDisplayed?.map((menu, index) => {
                        const _key = (+indexMenuSectionDisplayed * 5) + index;

                        return (
                            <div
                                className='text-white cursor-pointer'
                                onClick={() => { handleMenuClick(menu.displayText); }}
                                key={_key}>
                                {/* <span className='material-icon material-symbols-outlined px-2'>
                                bar_chart_4_bars
                                </span> */}
                                <span className='hover:text-slate-400 text-nowrap font-semibold text-sm'>
                                    {menu.displayText}
                                </span>
                                {
                                    Array.isArray(menu.children) && (
                                        <ul
                                            id={`subMenu${menu.displayText}`}
                                            ref={element => menusRefs.current[index] = element}
                                            className='block text-black border border-gray-200 bg-white rounded-lg mt-3 shadow-md absolute hidden'>
                                            {
                                                menu.children.map((menuChildren, iKey) => (
                                                    <li
                                                        className='px-3 py-2  hover:bg-slate-100 rounded-md'
                                                        key={iKey}
                                                    >
                                                        <a href='#'>{menuChildren.displayText}</a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )
                                }
                            </div>
                        )
                    })}
            </div>
            {componentRightArrow}
        </div >
    );
}

export default MenuHeader;