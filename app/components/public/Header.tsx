import Image from 'next/image';
import Link from 'next/link';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Header() {
    const navigation = [
        { name: 'About Us', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'FAQ', href: '#' },
    ]

    const linksNav = [
        {
            name: "Home",
            href: "/",
            active: true
        },
        {
            name: "Most Booked",
            href: "/",
            active: false
        },
        {
            name: "Popular Dishes",
            href: "/",
            active: false
        },
        {
            name: "Liked Restaurants",
            href: "/",
            active: false
        }
    ]

    return (
        <Disclosure
            as="nav"
        >
            <div className="flex flex-col">
                <div className="bg-[var(--color-navbar)]">
                    <div className="container">
                        <div className="flex py-3 items-center justify-between">
                            <div className="absolute right-0 flex items-center lg:hidden">
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                                </DisclosureButton>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Image src="/assets/icons/map.svg" alt='map' width={24} height={24} />
                                <span className="mt-1 text-sm font-light">Mansoura, Dakahlia, Egypt</span>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="hidden sm:ml-6 lg:block">
                                    <div className="flex space-x-7">
                                        {navigation.map((item) => (
                                            <Link
                                                title={item.name}
                                                key={item.name}
                                                href={item.href}
                                                className='hover:text-[var(--color-red)] text-lg font-normal'
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="container">
                        <div className="flex py-3 items-center justify-between">
                            <div className='w-full lg:w-[unset] flex gap-3'>
                                <Link href="/" title='BOOK IT'>
                                    <Image src="/assets/icons/logo.svg" alt='logo' width={139} height={54} />
                                </Link>
                                <div className="w-full lg:w-[440px] bg-[var(--color-search)] rounded-full relative flex items-center">
                                    <Image src="/assets/icons/search.svg" alt='search' width={20} height={20} className='absolute start-5' />
                                    <input type="text" className='w-full h-full rounded-full ps-14' placeholder='Search restaurants or choose your area' />
                                    <Image src="/assets/icons/map.svg" alt='map' width={24} height={24} className='hidden lg:flex absolute end-5 filter invert sepia saturate-500 hue-rotate-[200deg]' />
                                </div>
                            </div>
                            <div className='gap-3 items-center hidden lg:flex'>
                                <ul className='hidden xl:flex gap-5'>
                                    {
                                        linksNav.map((item, index) => {
                                            return <li key={index} className={`${item.active && 'before:w-full text-[var(--color-red)]'} hover:text-[var(--color-red)] pb-1 relative transition-all before:duration-400 before:content-[''] before:absolute before:bottom-0 before:bg-[var(--color-red)] hover:before:w-full before:w-[0] before:h-[2px]`}>
                                                <Link href={item.name} className='font-normal text-[15px]'>{item.name}</Link>
                                            </li>
                                        })
                                    }
                                </ul>
                                <Link href="/new-account" className="border-2 border-[var(--color-red)] bg-white px-8 py-3 text-[var(--color-red)] hover:text-white before:bg-[var(--color-red)] before:bottom-0 before:rounded-t-[50%] relative group rounded-full cursor-pointer overflow-hidden before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:z-1 before:bottom-0 before:transition-all before:duration-800 hover:before:h-[180%]" title="sign up">
                                    <span className="text-center relative z-1 text-base font-medium transition-all duration-800">
                                        sign up
                                    </span>
                                </Link>
                                <Link href="/login" className="border-2 border-[var(--color-red)] bg-[var(--color-red)] px-8 py-3 text-white hover:text-[var(--color-red)] before:bg-white before:bottom-0 before:rounded-t-[50%] relative group rounded-full cursor-pointer overflow-hidden before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:z-1 before:bottom-0 before:transition-all before:duration-800 hover:before:h-[180%]" title="sign in">
                                    <span className="text-center relative z-1 text-base font-medium transition-all duration-800">
                                        sign in
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DisclosurePanel className="lg:hidden bg-white pb-3">
                <div className="container">
                    <div className="flex gap-3 flex-wrap">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className='hover:bg-white/5 hover:text-[var(--color-red)] rounded-md py-2 text-sm font-medium'
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                    <div className='gap-3 items-center flex flex-wrap'>
                        <ul className='flex flex-wrap gap-3'>
                            {
                                linksNav.map((item, index) => {
                                    return <li key={index}>
                                        <Link href={item.name} className='font-normal text-[15px]'>{item.name}</Link>
                                    </li>
                                })
                            }
                        </ul>
                        <Link href="/" className="border-2 border-[var(--color-red)] bg-white px-8 py-3 text-[var(--color-red)] hover:text-white before:bg-[var(--color-red)] before:bottom-0 before:rounded-t-[50%] relative group rounded-full cursor-pointer overflow-hidden before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:z-1 before:bottom-0 before:transition-all before:duration-800 hover:before:h-[180%]" title="sign up">
                            <span className="text-center relative z-1 text-base font-medium transition-all duration-800">
                                sign up
                            </span>
                        </Link>
                        <Link href="/login" className="border-2 border-[var(--color-red)] bg-[var(--color-red)] px-8 py-3 text-white hover:text-[var(--color-red)] before:bg-white before:bottom-0 before:rounded-t-[50%] relative group rounded-full cursor-pointer overflow-hidden before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:z-1 before:bottom-0 before:transition-all before:duration-800 hover:before:h-[180%]" title="sign in">
                            <span className="text-center relative z-1 text-base font-medium transition-all duration-800">
                                sign in
                            </span>
                        </Link>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}

export default Header;