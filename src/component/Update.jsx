import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const URL = 'https://dummyjson.com'

function Update() {
    const [product,setProduct] = useState({
        title:'' ,
        price:0,
        description:''
    })

    const navigate = useNavigate() //used for redirecting path inside logic
    const params = useParams()
    console.log('params =', params)

    const getSingleProduct = async () => {
        await axios.get(`${URL}/products/${params.id}`)
        .then( res => {
            console.log('single =', res.data)
            setProduct(res.data)
        }).catch(err => toast.error(err.message))
    }

    useEffect(() => {
        getSingleProduct()
    },[])

    const readValue=(e) => {
        const  { name, value } = e.target;
        setProduct({ ...product, [name]:value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            console.log('updated product =',product)
            await axios.post(`${URL}/product/${params.id}`,product)
            .then(res => {
                toast.success("Product updated Successfully")
                navigate(`/`)
            }).catch(err => toast.error(err.message))
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (

            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="display-3 text-danger">Update</h3>  
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form autoComplete="off" onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" value={product.title} onChange={readValue} className="form-control" required/>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="price">Price</label>
                                <input type="number" name="price" id="price" value={product.price} onChange={readValue} className="form-control" required/>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="description">description</label>
                                <textarea  name="description" id="description" value={product.description} onChange={readValue} cols="30" rows="5" className="form-control" required/>
                            </div>
                            <div className="form-group mt-2">
                                <input  type="submit" value="Create Product" className="btn btn-outline-success"/>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
}
export default Update