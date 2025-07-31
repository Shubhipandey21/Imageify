import React from 'react'
import { assets } from '../assets/assets';

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI images</h1>
      <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center '>
        <img src= {assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg' />
      
      <div>
        <h2>Introducing the AI-Powered Text to Image Generator</h2>
      <p>Easily Bring your ideas to life with our free AI image generator. Weather you need stunning visulas or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
      <p>Simple type the text prompt, and out cutting edge AI will generate high quality images in seconds. From product visuals to character designs and portraits , even concepts that don't yet exists cn be visualized effortlessly. Powered by advance AI technology, the creative possibilities are limitless!</p>
        </div>
    
      </div>
    </div>
  )
}

export default Description
