import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {
	
	const { user } = useContext(UserContext);
	// This "useParams" hook allows us to retrieve the courseId passed via the URL
	const { productId } = useParams();

	// Allows us to gain access to methods that will allow us to redirect a user to a different page after encorolling a course
	// an object with methods to redirect the user
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	const order = (courseId) => {
		fetch(`http://localhost:4002/b2/users/order`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				orderedProducts: [ {productId} ],
				totalPrice: price
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data.message);

			if(data.error === 'Admin is forbidden') {
				Swal.fire({
					title: "Admin order error",
					icon: 'error',
					text: "You are an administrator you cannot submit an order."
				})
			} else if (data.message === 'Successfully Ordered') {
				Swal.fire({
					title: "Successfully ordered",
					icon: 'success',
					text: "You have successfully ordered."
				})

				// The "navigate" method allows us to redirect the user to a different page and is an easier approach rather than using the "Navigate" component
				navigate("/products");
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
			}

		})
	}

	useEffect(() => {
		console.log(productId);
		
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		});
	}, [productId]);

	return (
		<Container className="mt-5">
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body className="text-center">
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>PhP {price}</Card.Text>
							<Card.Subtitle>Class Schedule</Card.Subtitle>
							<Card.Text>8 am - 5 pm</Card.Text>
							{user.id !== null ?
								<Button variant="primary" onClick={() => order(productId)}>Order</Button>
								:

								<Link className="btn btn-danger btn-block" to="/login">Log in to Order</Link>
							}
							
						</Card.Body>		
					</Card>
				</Col>
			</Row>
		</Container>
	)
}