import React from 'react'
import SavanaLogo from '../../assets/savanaLogo.png'
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='min-h-[110px] w-full'>
      <div className='w-full flex justify-between items-center px-[100px]'>
        <img src={SavanaLogo} alt="Savana Logo" />
        <div>
          <Link to="/pasar">Pasar</Link>
          <Link to="/berita">Berita</Link>
          <Link to="/karir">Karir</Link>
          <Link to="/about">Tentang Kami</Link>
        </div>
      </div>
    </div>
  )
}

export default Header