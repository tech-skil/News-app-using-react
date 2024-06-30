import React, { Component } from 'react'
import defaultaimg from "../assets/defult.avif"
import Switcher from "../Component/Switcher";
export default class Article extends Component {

  render() {
    let {title , description , urlimg  , url ,author,date} = this.props;
    return (
<>
<div>
  <div >
      <div className='container mx-auto  w-auto sm:w-auto sm:max-w-[28rem] lg:w-auto my-5 pb-4 bg-gray-50 border-2  dark:bg-[#172b48] dark:text-white  '>
        <div className="  w-auto sm:w-auto sm:max-w-[28rem] lg:w-auto flex  justify-start flex-col ">
          <img src={urlimg?urlimg:defaultaimg} className='w-auto h-64 sm:h-48  xl:h-56' alt="..."  />
          <hr  />
          <div className='flex flex-col justify-start px-6 mb-4'>
            <h3 className=' text-2xl font-medium my-2 '>{title}</h3>
            <p className='text-lg text-justify' >
            {description}
            </p> 
            <p className='my-2 text-sm font-light'>  By {!author ?'Unknown':author } on {new Date (date).toUTCString()}</p>
          </div>
        </div>
          <a  href={url} target='_blanck' className='rounded-md cursor-pointer  px-4 ml-6 py-1  hover:bg-blue-500 bg-blue-600  text-white'>See more</a>
      </div>
      </div>
      </div>
      </>
    )
  }
}
