
import { useForm } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDostate } from '../atoms';
import { IToDo } from '../atoms';
import styled from 'styled-components';





const FormStyled = styled.form`
			display: flex;
		flex-direction: column;
		align-items: center;
		
`


interface IForm {
	toDo: string;
}

function CreateToDo() {

	const setToDos = useSetRecoilState(toDostate);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const category = useRecoilValue(categoryState);

	const handleValid = ({ toDo }: IForm) => {
		setValue("toDo", "");
		// 직접적으로 설정할 수 있고 다른 함수를 받을 수 있음
		// 하지만 바로 받을 수는 없고 return으로 받음
		setToDos(oldToDos => [{
			text: toDo,
			id: Date.now(),
			category
		}, ...oldToDos]);
	};

	return (
		<>
			<FormStyled onSubmit={handleSubmit(handleValid)}>
				<input {...register("toDo", {
					required: "Please write todo",
				})} placeholder='Write!' />
				<button>
					<span>
						Submit
					</span>
				</button>
			</FormStyled>
		</>
	)
}

export default CreateToDo;