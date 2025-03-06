
 const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: "ricardou",
			urlBaseTodos: "https://playground.4geeks.com/todo",
			urlBaseRick: "https://rickandmortyapi.com/api",
			todos: [],
			products: JSON.parse(localStorage.getItem("products")) || [],
			cart: JSON.parse(localStorage.getItem("cart")) || [], 
		  },
		actions: {
			getAllTask: async () => {
				try {
					const response = await fetch(`${getStore().urlBaseTodos}/users/ricardou`)
					const data = await response.json()
					
					console.log(data);

					if (response.ok) {
						setStore({
							
							todos: data.todos || [] 
						});
					} 
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
					
					if (response.ok) {
						getActions().getAllTask()
					} 
		
				} catch (error) {
					console.log(error)
				}
			},
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
						getActions().getAllTask()
					}
				} catch (error) {
					console.log(error);
				}
			},
			getAllCharacter: async () => {
				const store = getStore();
			
				if (localStorage.getItem("products")) {
					console.log("Se usa el almacenamiento de localStorage");
					console.log(JSON.parse(localStorage.getItem("products"))); 
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


