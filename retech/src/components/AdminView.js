import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProducts from './EditProducts'
import ArchiveProduct from './ArchiveProduct';


export default function AdminView({ fetchData }) {
	// b. Add state to store all products 
	const [products, setProducts] = useState([])


	//Getting the productsData from the products page
	useEffect(() => {
		const productsArr = (product => {
			// Log each product to inspect is structure to pass the correct product information on the table
			console.log("product: ", product);

			// Return a table row (tr) with the relevant product information
			return (
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>
					{product.isActive ? "Available" : "Unavailable"}
					</td>
					<td><EditProducts product={product._id}/></td>	
					<td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>
				</tr>
				)
		})

		setProducts(productsArr)

	}, [])


	return(
		<>
			<h1 className="text-center my-4"> Admin Dashboard</h1>

			<Table striped bordered hover responsive>
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th colSpan="2">Actions</th>
					</tr>
				</thead>

				<tbody>
					{products}
				</tbody>
			</Table>	
		</>

		)
}