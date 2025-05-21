import Header from '@/Components/Header'
import React from 'react'

const page = async ({ params }: SearchParams) => {
    const { id } = await params
    return (
        <section className='bg-homePage'>
            <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-[89.4vh] pt-12.5 pb-20 gap-9'>
                <Header subHeader='Kshitiz Saxena' title="SoftWare Developer" userImg='https://placehold.co/66x66' />
                user id {id}
            </div>
        </section>
    )
}

export default page