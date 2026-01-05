import React, { useState } from 'react'
import folder from "../assets/folder.png";
import axios from "axios"
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [size, setSize] = useState([]);

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('old_price', oldPrice)
      formData.append('new_price', price)
      formData.append('category', category)
      formData.append('size', JSON.stringify(size))


      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      console.log('Posting product to', backendUrl + "/api/product/add");
      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { Authorization: `Bearer ${token}` } })
      console.log('Add product response:', response.status, response.data?.message || 'no message');
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/*IMAGE SECTION */}
      <div>
        <p className='mb-2'>folder image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <p>ADD IMAGE 1</p>
            <img className='w-20' src={!image1 ? folder : URL.createObjectURL(image1)} alt="Logo" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <p>ADD IMAGE 2</p>
            <img className='w-20' src={!image2 ? folder : URL.createObjectURL(image2)} alt="Logo" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <p>ADD IMAGE 3</p>
            <img className='w-20' src={!image3 ? folder : URL.createObjectURL(image3)} alt="Logo" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <p>ADD IMAGE 4</p>
            <img className='w-20' src={!image4 ? folder : URL.createObjectURL(image4)} alt="Logo" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>

        </div>

        {/*PRODUCT  NAME */}

      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      {/* DESCRIPTION */}

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Description  here' required />
      </div>

      {/* CATEGORY */}

      <div>
        <p> Product Category </p>
        <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="kids">kids</option>
        </select>
      </div>

      {/* PRICE */}

      <div className="flex gap-4 flex-wrap">
        {/* Old Price */}
        <div>
          <p className="text-sm font-medium">Old Price</p>
          <input
            type="number"
            placeholder="50"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            className="w-full px-3 py-2 sm:w-[120px] border rounded line-through text-gray-500"
          />
        </div>

        {/* New Price */}
        <div>
          <p className="text-sm font-medium">New Price</p>
          <input
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 sm:w-[120px] border rounded text-green-600 font-semibold"
          />
        </div>
      </div>


      {/* SIZE */}

      <div>
        <p className='mb-2'> Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() =>
            setSize(prev =>
              prev.includes("S")
                ? prev.filter(item => item !== "S")
                : [...prev, "S"]
            )
          }>
            <p className={`${size.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
              S
            </p>
          </div>

          <div onClick={() =>
            setSize(prev =>
              prev.includes("M")
                ? prev.filter(item => item !== "M")
                : [...prev, "M"]
            )
          }>
            <p className={`${size.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
              M
            </p>
          </div>

          <div onClick={() =>
            setSize(prev =>
              prev.includes("L")
                ? prev.filter(item => item !== "L")
                : [...prev, "L"]
            )
          }>
            <p className={`${size.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
              L
            </p>
          </div>

          <div onClick={() =>
            setSize(prev =>
              prev.includes("XL")
                ? prev.filter(item => item !== "XL")
                : [...prev, "XL"]
            )
          }>
            <p className={`${size.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
              XL
            </p>
          </div>
        </div>
      </div >

      {/* BUTTON */}

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'> ADD</button>
    </form>
  )
}

export default Add