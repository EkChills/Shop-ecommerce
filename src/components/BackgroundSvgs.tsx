import Image from 'next/image'
import React from 'react'
// import dyn1 from '/dyn-1.svg';

export default function BackgroundSvgs() {

  return (
    <div className='absolute grid grid-cols-4  gap-96 gap-y-[31rem] max-h-screen overflow-hidden'>
        {
            Array.from({length:10}, (_, idx) => idx).map((item, idx) => {
                return <Image className='opacity-50' width={100} height={100} src={`/dyn-${idx + 1}.svg`} alt='dynamic image' key={item} />
            })
        }
    </div>
  )
}
