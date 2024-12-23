import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom"

import Todos from "./Todos.jsx";

const urlBase = "https://rickandmortyapi.com/api"

//create your first component
const RickAndMorty = () => {
    const {store, actions} = useContext(Context)


    return (
        <>

            <div className="container">
                <div className="row">
                    <h1>Rick and morty</h1>

                    {
                        store.products.map((item) => (
                            <div key={item.id} className="col-md-4 mb-3">
                                <div className="card">
                                    <img src={item.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        {/* <Link to={`/rick-and-morty/${item.id}`} className="btn btn-primary">Agregar al carrito</Link> */}
                                        <button className="btn btn-primary" onClick={()=> actions.addProductCart(item)}>Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                
            </div>
            
        </>

    );
};

export default RickAndMorty;