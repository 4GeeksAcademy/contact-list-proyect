
// getStore => Devuelve el objeto Store   // Por ejm: para llegar a urlBase usamos getStore
// getActions => Devuelve todas las acciones para usarlas // Por ejm: Modificar estados ?
// setStore  => Unica foram de  modificar el store  (Recibe un objeto con el nuevo Store)

// Hasta ahora de alguna forma Context, su valor es toda esta funcion o.O
 const getState = ({ getStore, getActions, setStore }) => {
	return {
		// Store es un objeto que puede recibir cualquier tipo de key , keys con arrays y objetos o 
		// simplemente keys con valores )?
		store: {
			user: "ricardou",
			urlBaseTodos: "https://playground.4geeks.com/todo",
			urlBaseRick: "https://rickandmortyapi.com/api",
			todos: [],
			products: JSON.parse(localStorage.getItem("products")) || [],
			cart: JSON.parse(localStorage.getItem("cart")) || [], // Solo esta línea es necesaria
		  },
		actions: {
			// En esta funcion hacemos todo lo necesario para modificar mi Key Todos de Store
			// Y asi evita tengamos que modificarla en un tal componente por separado
			getAllTask: async () => {
				try {
					// Ves como para acceder mencionar a un key de mi Store tengo que decir 
					// getStore(), luego esto lo simplificamos 
					const response = await fetch(`${getStore().urlBaseTodos}/users/ricardou`)
					const data = await response.json()
					// En este momento data seria toda la info de tal usuario como su name, todos, etc 
					// En este caso data tiene 2 objetos, el name y el todo de tal usuario
					console.log(data);

					
					if (response.ok) {
						setStore({
							// Aca agregamos escribiendo lo que queremos modificar como "todos"
							// Luego queremos acceder al segundo objeto de "Data`"
							todos: data.todos || []  // Asegura que "todos" siempre sea un array
						});
					} //Aqui un Else creando el nuevo USUARIO ??????
				} catch (error) {
					console.log(error);
				}
			},
			createUser : async () => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBaseTodos}/users/ricardou`, {
						method: "POST"
					})
					// Si la respuesta fue buena quiero usar una accion con getActions y la acccion que eligo 
					// para ejecutar es getAllTask
					if (response.ok) {
						// La unica forma de usar un objeto de ACTIONS, dentro de un objeto ACTIONS es 
						// con getActions()
						getActions().getAllTask()
					} 
		
				} catch (error) {
					console.log(error)
				}
			},
			// En parametros pondremos la tarea que vamos a guardar )?
			addTask : async (task) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBaseTodos}/todos/ricardou`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(task)
					})
					if (response.ok) {
						getActions().getAllTask()
						return true 
					}
					print(response)
				} catch (error) {
					console.log(error)
				}

			},
			deleteTask : async (id) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBaseTodos}/todos/${id}`, {
						method: "DELETE"
					});
					if (response.ok) {
						getActions().getAllTask()
						// Backup Usalo en emergencia 
						// Filtrar la tarea eliminada del estado local (taskList)
						// setTaskList(taskList.filter((item) => item.id !== id));
					}
				} catch (error) {
					console.log(error);
				}
			},
			editTask : async (item) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBaseTodos}/todos/${item.id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							label: item.label,
							is_done: !item.is_done
						})
					});
					if (response.ok) {
						// Actualizar taskList después de editar
						getActions().getAllTask()
					}
				} catch (error) {
					console.log(error);
				}
			},
			getAllCharacter: async () => {
				const store = getStore();
			
				// Verifica si los productos ya están almacenados en el localStorage
				if (localStorage.getItem("products")) {
					console.log("Se usa el almacenamiento de localStorage");
					console.log(JSON.parse(localStorage.getItem("products"))); // Mostrar los productos en consola
					setStore({
						products: JSON.parse(localStorage.getItem("products"))
					});
				} else {
					console.log("Consultamos a la API");
			
					try {
						const response = await fetch(`${store.urlBaseRick}/character`);
						const data = await response.json();
						console.log("Datos obtenidos de la API:", data); // Verifica los datos recibidos
			
						setStore({
							products: data.results
						});
			
						// Guardar los productos en el localStorage
						localStorage.setItem("products", JSON.stringify(data.results));
					} catch (error) {
						console.log(error);
					}
				}
			},
			addProductCart: (product) => {
				const store = getStore();
				const newCart = [...store.cart, product];
			  
				setStore({
				  cart: newCart,
				});
			  
				// Guardar el carrito en el localStorage para persistencia
				localStorage.setItem("cart", JSON.stringify(newCart));
			  }
 		}
	};
};

export default getState;


