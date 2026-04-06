import React, { useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName]=useState("")
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
   
  const imgHandler =(e)=>{
    
    const myfile = e.target.files[0];
    if(myfile){
      setImage (URL.createObjectURL(myfile))
    }
    else{
      console.log("choose a file")
    }
    
  }
const deletehandler = (index) => {
    setProducts((prev)=>{
      const updated = [ ...prev]
      updated.splice(index,1);
      return (updated)
    
    })
};
const edithandler =(index)=>{
  const product = products[index];
  setName(product.name);
  setDescription(product.description);
  setPrice(product.price);
  setImage(product.image);
  setIsEditing(true);
  setEditingIndex(index);
}
  const handleSubmit = (e)=>{
    e.preventDefault();
    const myarr = {
      name,
      description,
      price,
      image,
    }
    if(!price || !description || !image || !name){return}
       
    if(isEditing) {
      const updated = [...products];
      updated[editingIndex] = myarr;
      setProducts(updated);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      const newdata = [...products, myarr]
      setProducts(newdata)
    }
 
    setImage(null);
    setDescription("");
    setPrice("");
    setName("");
    e.target.reset(); 
  }


  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div>
          <div className="input-group">
            <label>Image</label>
            <input type="file" accept="image/*" onChange={imgHandler} />
          </div>
            <div className="input-group">
            <label>Name</label>
            <input type="text" accept="image/*" onChange={e=> setName(e.target.value)} />
          </div>          
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
  
            onChange={e=> setDescription(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            
            onChange={e=>setPrice(e.target.value)}
            
          />
        </div>
        <button type="submit">{isEditing ? "Update Product" : "Add Product"}</button>
        {isEditing && <button type="button" onClick={() => {
          setIsEditing(false);
          setEditingIndex(null);
          setName("");
          setDescription("");
          setPrice("");
          setImage(null);
        }}>Cancel</button>}
      </form>

      <div className="product-list">
        {
          products.map((e, index)=>(
          <div key={index} className="product-card">
            <img className="cardimg" src={e.image} alt="" />
            <div className="buttomwrapp">
              <h2>{e.name}</h2>
              <h3>{e.description}</h3>
              <div className="delwrap">
                <p>$ {e.price}</p>
                <div>
                  <button className="editbtn" onClick={()=> edithandler(index)}> Edit</button>
                <button
                  className="delbtn"
                  onClick={() => deletehandler(index)}
                >
                  Delete
                </button>                    
                </div>
              
              </div>

              </div>
        </div>            
          )
        )}

      </div>
    </div>
  );
};

export default Admin;