import React from 'react'
import Input from '../../components/Input'
import Office from '../../assets/Office.png'
import Button from '../../components/Button'

const ContactUs = () => {
  return (
    <div className="w-full px-[30px] flex justify-center md:justify-between md:items-center md:px-[110px] flex-col">
        <img className='rounded-lg object-cover mt-8' src={Office} alt="" />
        <form className='w-full border p-3 rounded-lg mt-6'>
            <label className='mt-3' htmlFor="email">Email</label>
            <Input id="email" type='text' />
            <label className='mt-3' htmlFor="subject">Subject</label>
            <Input id="subject" type='text' />
            <label className='mt-3' htmlFor="body">Email</label>
            <textarea className='w-full rounded' name="" id="body" cols="30" rows="10"></textarea>
            <Button type='orange' className="w-full p-4 mt-3">Submit</Button>
        </form>
    </div>
  )
}

export default ContactUs