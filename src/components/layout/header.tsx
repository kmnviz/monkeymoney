'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ChevronDown, ExternalLink, Dot} from 'lucide-react';

interface NavItem {
  label: string
  href: string
  dropdownItems?: {
    label: string;
    href: string,
    blank?: boolean;
  }[]
}

const navItems: NavItem[] = [
  {
    label: 'Projects',
    href: '/projects',
    dropdownItems: [
      {
        label: 'Mintcamp',
        href: 'https://app.mintcamp.xyz',
        blank: true,
      },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Chat',
    href: '/chat',
  },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="flex items-center h-16 px-4 border-b border-gray-100">
      <div className="flex items-center gap-8">
         {/*Logo*/}
        <Link href="/" className="flex items-center">
          {/*<Image*/}
          {/*  src="/placeholder.svg"*/}
          {/*  alt="Logo"*/}
          {/*  width={24}*/}
          {/*  height={24}*/}
          {/*  className="w-6 h-6"*/}
          {/*/>*/}
          <Dot className="w-4 h-4" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.dropdownItems ? (
                <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown Menu */}
              {item.dropdownItems && openDropdown === item.label && (
                <div className="absolute left-0 z-10 bg-white border border-gray-100 rounded-lg shadow-lg">
                  {item.dropdownItems.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.label}
                      href={dropdownItem.href}
                      target={dropdownItem.blank ? '_blank' : '_self'}
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {dropdownItem.label}
                      {dropdownItem.blank && <ExternalLink className="w-4 h-4 ml-3" />}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}
