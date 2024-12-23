// COMO SIEMPRE si queremos usar el flux importamos useContext con el Context y luego 
// un detructurador no estaria mal (para acceder a Store o Actions mas facil)

import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../store/appContext";
export const Navbar = () => {
  const [links, setLinks] = useState([
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/todos",
      name: "Todos",
    },
    {
      href: "/rick-and-morty",
      name: "Rick And Morty",
    },
  ]);

  const {store} = useContext(Context)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between px-3"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {/* <NavLink
						// className="nav-link active"
						className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"}
						aria-current="page"
						to="/"
					>Home</NavLink>
					<NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="/rick-and-morty">Rick And Morty</NavLink>
					<NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="/todos">Todos</NavLink>
					<NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="/contact">Contact</NavLink> */}
            {links.map((item, index) => {
              return (
                <NavLink
                  key={`navlink-${index}`}
                  className={({ isActive }) =>
                    isActive ? "nav-link text-danger bg-green" : "nav-link"
                  }
                  to={`${item.href}`}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>
          {/* MI VENTANA DE CARRITO CON DROPDOWN  */}
          <div class="dropdown show">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button"   data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-cart-shopping">{store.cart.length}</i>
			</a>

            <div class="dropdown-menu" >
              {/* Aca en vez de mostrar contenido estaticos podriamos usar un map 
              para mostrar varios Li iterandose con el map , iterando que ? 
              pues  store.cart.map  */}
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
};
