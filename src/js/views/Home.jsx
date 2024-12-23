import React, {useContext} from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

// Pasos para usar el global State  (Store)
// 1- Importamos useContext from react
// 2- Importamos el context y se lo pasamos a useContext por que asi Dios lo quiso 
// 3- Destrcuturar el Context mientras lo usamos con useContext, Ejm:  useContext(Context)
// 4- Usar el context mas punto ... ya que context es un objeto 
export const Home = () => {
	// como context es un objeto destructuramos para solo usar algo de context, que es el Store
	const {store} = useContext(Context)

	// console.log(store);
	
	// Con todos los imports ahora fijate el valor de context (Importante)
	// Pero haz esto cuando no le des destructuracion
	// Tiene los 2 objetos, Store y Actions, que se encuentran en archivo Flux
	// console.log(context);
	
	
	return (
	<div className="text-center mt-5">
		{/* Ahora podemos usar cosas de mi Store Global a mi componente  */}
		<h1>Hello {store.user}</h1>
		<p>
			<img src={rigoImage} />
		</p>
		<a href="#" className="btn btn-success">
			If you see this green button, bootstrap is working
		</a>
	</div>
	)}

