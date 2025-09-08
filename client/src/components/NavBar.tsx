
import { Crown } from 'lucide-react'
import ThemeToggleButton from './ui/theme-toggle-button'
import { ConnectButton } from 'thirdweb/react'
import { Button } from './ui/button'

import { client } from "../client";



export const NavBar = () => {



  return (
     <nav className='flex justify-between items-center py-4 px-4 sm:px-10 md:px-20'>
      
      <div className='flex flex-row text-4xl gap-2'>
        <Crown className='size-10'/>CrowFund
      </div>
      <ConnectButton client={client} />
      

      {/* wallet connect button */}
      <ThemeToggleButton />
    </nav>
  )
}
