"use client";
import React from 'react';
import { SidebarSeparator, SidebarTrigger } from './ui/sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { usePathname } from 'next/navigation';
// import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Search } from 'lucide-react';
// import { Button } from './ui/button';
import UserNameSession from './UserNameSession';
// import { ModeToggle } from './DartMode';

const Header = () => {
    const path = usePathname();

    // Extraire et formater les segments
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0]?.replace(/_/g, ' ') || 'Accueil';
    const lastSegment = segments.pop()?.replace(/_/g, ' ') || 'Page';

    return (
        <header className="flex sticky top-0 bg-white h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <SidebarSeparator orientation="vertical" className="mr-2 h-4" />
            <div className="flex justify-between items-center w-full">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                {firstSegment}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{lastSegment}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {/* <form className="relative w-[20%]">
                    <Input placeholder='Recherche' className='w-full' />
                    <Button className='absolute right-0 bottom-2 top-0'><Search /></Button>
                </form> */}
                <div className="flex gap-2 items-center">
                    {/* <ModeToggle /> */}
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='text-primary'><UserNameSession /></span>
                </div>
            </div>
        </header>
    );
}

export default Header;
