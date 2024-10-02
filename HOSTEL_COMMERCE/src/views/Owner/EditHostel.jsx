import React from "react";


function EditHostel() {
  return (
    <div className="container">
        <h1 className="text-xl font-medium mt-8 ml-8">EDIT HOSTEL</h1>
      <div className="flex flex-col md:flex-row gap-24 mt-8">
        <div className="flex-1">
            <form className="space-y-4 mt-1 ml-44 w-3/4 h-full">
                <div className="">
                   <label className="text-sm font-medium ">NAME</label>
                   <input type="text" value="" onChange="" placeholder=""
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                   <label className="block text-sm font-medium">DESCRIPTION</label>
                   <textarea value="" onChange="" placeholder=""
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                   <label className="block text-sm font-medium">ADDRESS LINE 1</label>
                   <input type="textarea" value="" onChange="" placeholder=""
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                
                <div>
                   <label className="block text-sm font-medium">ADDRESS LINE 2</label>
                   <input type="text" value="" onChange="" placeholder=""
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                   <label className="block text-sm font-medium">CITY</label>
                   <input type="text" value="" onChange="" placeholder=""
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                   <label className="block text-sm font-medium">PINCODE</label>
                   <input type="text" value="" onChange="" placeholder=""
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                   <label className="block text-sm font-medium">STATE</label>
                   <input type="text" value="" onChange="" placeholder=""
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                </div>

            </form>
        </div>

    <div className="h-screen flex-1 space-y-6 relative">
      <div className="mb-8">
          <div>
            <label className="text-sm font-medium">HOSTEL PICS</label>
            <div className="mt-2 w-96 h-48 bg-gray-200 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <p>Upload Image</p>
            </div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input class="block w-96 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400" id="file_input" type="file" />
          </div>
        
        <p className="mt-8 block text-sm font-medium">TYPE</p>
        <div className="flex items-center space-x-6 mt-2">
           <label className="flex items-center">
           <input
            type="radio"
            name="type"  // Same name for both radio buttons
            value="HOSTEL"
            checked={true}  // Check this if value matches state
            onChange=""  // Handle state change
            className="h-4 w-4 text-black-500 focus:ring-blue-400"
            />
           <span className="ml-2 text-sm">HOSTEL</span>
           </label>


          <label className="flex items-center">
          <input
            type="radio"
            name="type"  // Same name for both radio buttons
            value="PG"
            checked={true}  // Check this if value matches state
            onChange="" // Handle state change
            className="h-4 w-4 focus:ring-black-800"
          />
          <span className="ml-2 text-sm">PG</span>
          </label>
        </div>
      </div>
      <div>
          <p className="block text-sm font-medium">GENDER</p>
          <div className="flex items-center space-x-6 mt-2">
            <label className="flex items-center">
            <input
                type="radio"
                name="gender"
                value="BOYS"
                checked={true}
                onChange=""
                className="h-4 w-4  focus:ring-blue-400"
            />
            <span className="ml-2 text-sm">BOYS</span>
            </label>
            <label className="flex items-center">
            <input
                type="radio"
                name="gender"
                value="GIRLS"
                checked={true}
                onChange=""
                className="h-4 w-4  focus:ring-blue-400"/>
            <span className="ml-2 text-sm">GIRLS</span>
            </label>
            <label className="flex items-center">
            <input
                type="radio"
                 name="gender"
                value="MIXED"
                 checked={true}
                onChange=""
                className="h-4 w-4 focus:ring-blue-400"
            />
            <span className="ml-2 text-sm">MIXED</span>
            </label>
          </div>
      </div>
      <div className="bg-black">
      <button className= "absolute bottom-18 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-60">
            EDIT ROOMS
        </button>
        <button className= "absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-60">
            UPDATE HOSTEL
        </button>
      </div>
    </div>
</div>
</div>
    
  )
}

export default EditHostel;

