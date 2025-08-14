import { Bot , Sun } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='nav flex items-center justify-between  h-[90px] bg-zinc-900' style={{padding:"0px 150px"}}>
      <div className="logo flex items-center gap-[10px]">
        <Bot size={40} style={{color:"#00FFFF"}} />
        <span className='text-2xl font-bold text-white ml-2'>RevuCode</span>
      </div>

      <div className="icons flex items-center gap-[20px]">
        <i className='cursor-pointer transition-all hover:text-cyan-300'><Sun /></i>
      </div>
    </div>
  )
}

export default Navbar
