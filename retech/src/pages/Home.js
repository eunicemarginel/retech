import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';
// import CourseCard from '../components/CourseCard';

export default function Home() {
	
	const data = {
		title: "reTech Marketplace",
		content: "Quality and Sustainable Tech",
		destination: "/products",
		label: "Shop Deals!"
	}

	return (
		<>
			<Banner data={data}/>
			<FeaturedProducts/>
			<Highlights/>
		</>
	)
}