import React from "react";


function  AddNewRoom() {
  return (
    <div className="container">
        <h1 className="text-xl font-medium mt-4 ml-8">ADD NEW ROOM TYPE</h1>
      <div className="flex flex-col md:flex-row gap-24 mt-6">
        <div className="flex-1">
            <form className="space-y-4 mt-4 ml-44 w-3/4 h-full">
                <div className="">
                   <label className="text-sm font-medium ">NO.OF ROOMS OF THIS TYPE</label>
                   <input type="text" value="" onChange="" placeholder=""
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div className="">
                   <label className="block text-sm font-medium">DESCRIPTION</label>
                   <textarea value="" onChange="" placeholder=""
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                   <label className="block text-sm font-medium">CAPACITY</label>
                   <input type="textarea" value="" onChange="" placeholder=""
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                
                <div>
                   <label className="block text-sm font-medium">CURRENT VACANCY</label>
                   <input type="text" value="" onChange="" placeholder=""
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <p className="mt-2 block text-sm font-medium">TYPE</p>
        <div className="flex items-center space-x-6 ">
           <label className="flex items-center">
           <input
            type="radio"
            name="type"  // Same name for both radio buttons
            value="SINGLE"
            checked={true}  // Check this if value matches state
            onChange=""  // Handle state change
            className="h-4 w-4 text-black-900"
            />
           <span className="ml-2 text-sm">SINGLE</span>
           </label>


          <label className="flex items-center">
          <input
            type="radio"
            name="type"  // Same name for both radio buttons
            value="DOUBLE"
            checked={true}  // Check this if value matches state
            onChange="" // Handle state change
            className="h-4 w-4 focus:ring-black-800"
          />
          <span className="ml-2 text-sm">DOUBLE</span>
          </label>
          <label className="flex items-center">
          <input
            type="radio"
            name="type"  // Same name for both radio buttons
            value="TRIPLE"
            checked={true}  // Check this if value matches state
            onChange="" // Handle state change
            className="h-4 w-4 "
          />
          <span className="ml-2 text-sm">TRIPLE</span>
          </label>
          <label className="flex items-center">
          <input
            type="radio"
            name="type"  // Same name for both radio buttons
            value="QUADRUPLE"
            checked={true}  // Check this if value matches state
            onChange="" // Handle state change
            className="h-4 w-4 focus:ring-black-800"
          />
          <span className="ml-2 text-sm">QUADRUPLE</span>
          </label>
        </div>
        <p className="mt-8 block text-sm font-medium">AC/NON-AC</p>
        <div className="flex items-center space-x-6 mt-2">
           <label className="flex items-center">
           <input
            type="radio"
            name="AC/NON-AC"  // Same name for both radio buttons
            value="AC"
            checked={true}  // Check this if value matches state
            onChange=""  // Handle state change
            className="h-4 w-4 text-black-500 focus:ring-blue-400"
            />
           <span className="ml-2 text-sm">AC</span>
           </label>


          <label className="flex items-center">
          <input
            type="radio"
            name="AC/NON-AC"  // Same name for both radio buttons
            value="NON-AC"
            checked={true}  // Check this if value matches state
            onChange="" // Handle state change
            className="h-4 w-4 focus:ring-black-800"
          />
          <span className="ml-2 text-sm">NON-AC</span>
          </label>
        </div>
            </form>
        </div>

    <div className="h-screen flex-1 space-y-4 relative mt-4">
      <div className="">
      <div>
            <label className="text-sm font-medium">HOSTEL PICS</label>
            <div className="mt-2 w-96 h-48 bg-gray-200 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <p>Upload Image</p>
            </div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
            <input class="block w-96 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400" id="file_input" type="file" />
          </div>
          <div className="mt-8">
                   <label className="text-sm font-medium ">RENT/HEAD</label>
                   <input type="text" value="" onChange="" placeholder=""
            className="mt-1 w-96 block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        </div>
        
      <div className="">
        <button className= "absolute bottom-8 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-60">
            ADD ROOM
        </button>
      </div>
    </div>
</div>
</div>

    
  )
}

export default AddNewRoom;

