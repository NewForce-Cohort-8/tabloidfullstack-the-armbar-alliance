import { useEffect, useState } from "react";
import { Container, Input, InputGroup, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { editCategory, getCategoryById } from "../Managers/CategoryManager";


export const EditCategory = () => {
	const [category, setCategory] = useState({
		name: ""
        
	});
	const navigate = useNavigate();
    const { id } = useParams()


    useEffect(() => {
        getCategoryById(id)
            .then((data) => {
                setCategory(data)
            })
        }, [id])


	const handleSubmit = (e) => {
		
		return editCategory(category).then(() => navigate("/categories"));
	};
	return (
		<Container>
			<InputGroup>
				<Input
					placeholder='Name'
                    value={category.name}
					onChange={(e) => {
						const copy = { ...category };
						copy.name = e.target.value;
						setCategory(copy);
					}}
				/>
				<Button color='primary' onClick={(e) => handleSubmit(e)}>
					Save
				</Button>
			</InputGroup>
		</Container>
	);
};


