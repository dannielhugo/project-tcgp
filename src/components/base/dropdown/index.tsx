'use client';

import Btn from '@/components/base/btn';
import Checkbox from '@/components/base/checkbox';
import useOutsideClick from '@/hooks/useOutsideClick';
import { DropdownOption } from '@/lib/types/dropdown';
import { useRef, useState } from 'react';

export default function Dropdown({ options, title, isOpen }: { options?: DropdownOption[]; title: string; isOpen?: boolean; }) {
  const [open, setOpen] = useState<boolean>(isOpen || false);
  
  function handleClick() {
    setOpen(!open);
  }

  function handleItemChange(item: DropdownOption) {
    item.checked = !item.checked;
  }

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setOpen(false),
  });

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <Btn
        id="dropdownBgHoverButton"
        onClick={handleClick}
      >
        {title}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </Btn>

      <div id="dropdownBgHover" className={`absolute overflow-y-auto mt-2 z-10 w-48 bg-white rounded-lg shadow-sm dark:bg-gray-700 ${open ? 'block' : 'hidden'}`} >
        <ul className="p-3 max-h-[600px] space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
          {options?.map((item, index) => (
            <li key={index}>
              <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                <Checkbox
                  id={`checkbox-${index}`}
                  value={item.value}
                  checked={item.checked}
                  onChange={() => handleItemChange(item)}
                  label={item.label}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}