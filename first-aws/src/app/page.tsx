import Header from "@/layout/header";
import '../globals.css'

export default function Home() {
  return (
       <div className='flex flex-col justify-center items-center'>
          <Header /> 
          <div className='text-red-500 text-lg'>Strange</div>
          <div>Home</div>
       </div>
  )
}
