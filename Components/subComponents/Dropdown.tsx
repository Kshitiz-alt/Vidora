import Image from 'next/image'
import React from 'react'

const Dropdown = () => {
    return (
        <div className='flex items-center gap-1 p-2 bg-white rounded-4xl hover:cursor-pointer'>
            <Image src="/DropDown.svg" width={20} height={20} alt='DropdownImg' />
            <p className='max-sm:hidden font-Julius'>Most Viewed</p>
            <Image src="/Drop.svg" width={20} height={20} alt='' />
        </div>
    )
}

export default Dropdown