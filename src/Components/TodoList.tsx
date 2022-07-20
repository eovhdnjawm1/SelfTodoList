import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, ECategory, toDostate } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo'
import { toDoSelector } from '../atoms';
import styled from 'styled-components';


const MainContainer = styled.section`
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	max-width: 550px;
	min-width: 250px;
	height: auto;
	background: #f1f5f8;
  background-image: radial-gradient(#bfc0c1 7.2%, transparent 0);
  background-size: 25px 25px;
  border: 2px solid white;
	border-radius: 15px;
	font-family: 'Dancing Script', cursive;
	box-shadow: 4px 3px 7px 2px #00000040;
  padding: 1rem;
  box-sizing: border-box;

	h1 {
		transform: rotate(2deg);
  		padding: 0.2rem 1.2rem;
  		border-radius: 20% 5% 20% 5%/5% 20% 25% 20%;
  		  background-color: rgba(0, 255, 196, 0.7);
			color: rgba(0,0,0, .7);

  		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 80px;
	}

	select {
		background-color: #0563af;
		font-family: 'Dancing Script', cursive;
  		color: white;
  		padding: 12px;
  		width: 180px;
  		border: none;
  		font-size: 20px;
  		box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  		-webkit-appearance: button;
  		appearance: button;
  		outline: none;
		border-radius: 10px;
	}

	input {
		box-sizing: border-box;
  		background-color: transparent;
  		padding: 0.7rem;
  		border-bottom-right-radius: 15px 3px;
  		border-bottom-left-radius: 3px 15px;
  		border: solid 3px transparent;
  		border-bottom: dashed 3px #ea95e0;
  		font-family: "Gochi Hand", cursive;
  		font-size: 1rem;
  		color: rgba(63, 62, 65, 0.7);
  		width: 70%;
  		margin-bottom: 20px;
	}

	input:focus{
		outline: none;
  		border: solid 3px #ea95e0;
  		border-radius: 5px;
	}

	button {
		padding: 0;
  		border: none;
  		transform: rotate(4deg);
  		transform-origin: center;
  		font-family: "Gochi Hand", cursive;
  		text-decoration: none;
  		padding-bottom: 3px;
  		border-radius: 5px;
  		box-shadow: 0 2px 0 #494a4b;
  		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  		background-image: url("data:image/gif;base64,R0lGODlhBAAEAIABAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUY1OENCRDdDMDYxMUUyOTEzMEE1MEM5QzM0NDVBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUY1OENCRTdDMDYxMUUyOTEzMEE1MEM5QzM0NDVBMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1RjU4Q0JCN0MwNjExRTI5MTMwQTUwQzlDMzQ0NUEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk1RjU4Q0JDN0MwNjExRTI5MTMwQTUwQzlDMzQ0NUEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAAQABAAAAgYEEpdoeQUAOw==");
  		background-color: rgba(0, 255, 196, 0.7);
  		margin: 10px;

	}

	button span {
		background: #f1f5f8;
		display: block;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		border: 2px solid #494a4b;
	}

	button:active button:focus {
		transform: translateY(4px);
  		padding-bottom: 0px;
  		outline: 0;
	}
`

function ToDoListAfter() {
	const todos = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState);
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as any);
	}


	return (

		<MainContainer>
			<h1>To-Do List</h1>
			<select onInput={onInput} value={category}>
				<option value={ECategory.해야할일}>Today I need to</option>
				<option value={ECategory.하는중}>Doing</option>
				<option value={ECategory.완료}>Completion</option>
			</select>
			<hr />
			<CreateToDo />
			<hr />
			<ul>

				{todos?.map((toDo) => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</ul>



		</MainContainer>
	)
}

export default ToDoListAfter;