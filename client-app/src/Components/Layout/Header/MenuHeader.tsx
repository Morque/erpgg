import React, { useEffect, useRef, useState } from 'react';
import { left_arrow, right_arrow } from '../../../Assets/images';
import './Header.css';

interface MenuLayout {
    displayText: string,
    children: Array<MenuLayout> | string
}

interface MenuHeaderProps {
    listMenus?: Array<MenuLayout>
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ listMenus }) => {

    const [menuSections, setMenusSections] = useState<Array<Array<MenuLayout>>>();
    const [currentMenuSectionDisplayed, setCurrentMenuSectionDisplayed] = useState<Array<MenuLayout>>();
    const [indexMenuSectionDisplayed, setIndexMenuSectionDisplayed] = useState<Number>(0);

    const menuCenterContainerRef = useRef<HTMLDivElement>(null);

    function chunkArray(array: Array<MenuLayout>, chunkSize: number) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            result.push(chunk);
        }

        if (result[result.length - 1].length < 5) {
            console.log(result[1].length)
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
            }
            else {
                var _menusSection = chunkArray(listMenus, 5);
                setMenusSections(_menusSection);
                setIndexMenuSectionDisplayed(0);
                setCurrentMenuSectionDisplayed(_menusSection[0]);
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
        menuCenterContainerRef.current?.classList.remove('menu-anim-fadein-reverse');
        menuCenterContainerRef.current?.classList.add('menu-anim-fadeout-reverse');

        setTimeout(() => {
            menuCenterContainerRef.current?.classList.remove('menu-anim-fadeout-reverse');
            menuCenterContainerRef.current?.classList.add('menu-anim-fadein-reverse');
        }, 200);

        setTimeout(() => {
            setIndexMenuSectionDisplayed(indexMenuSectionDisplayed as number - 1);
            if (menuSections) setCurrentMenuSectionDisplayed(menuSections[indexMenuSectionDisplayed as number - 1]);
        }, 250);
    }

    useEffect(() => {
        buildMenusSections();
    }, [listMenus])

    return (
        <div className='h-full w-full flex flex-row justify-around border-l border-r border-gray-400 '>
            {
                menuSections && menuSections?.length > 1 &&
                (
                    <div className='flex justify-center items-center my-auto'>
                        <img onClick={handleLeftMenuClick} src={left_arrow} className='w-5/12' />
                    </div>
                )
            }
            <div className='flex flex-row justify-around w-full menu-header' ref={menuCenterContainerRef}>
                {
                    currentMenuSectionDisplayed?.map((menu, index) => {
                        const _key = (+indexMenuSectionDisplayed * 5) + index;

                        return (
                            <p
                                className='text-slate-600 hover:text-slate-400 cursor-pointer'
                                key={_key}>
                                {menu.displayText}
                            </p>
                        )
                    })}
            </div>
            {
                menuSections && menuSections?.length > 1 &&
                (
                    <div className='flex justify-center items-center'>
                        <img onClick={handleRightMenuClick} src={right_arrow} className='w-5/12' />
                    </div>
                )
            }
        </div >
    );
}

export default MenuHeader;