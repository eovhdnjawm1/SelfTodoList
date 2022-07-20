
import { ECategory, IToDo, toDostate } from '../atoms';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';




function ToDo({ text, category, id }: IToDo) {

	//  1번
	// const onClick = (newCategory: IToDo["category"]) => {
	// 	console.log("i want to ", newCategory)
	// }

	// 2번
	const setToDos = useSetRecoilState(toDostate)
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		// console.log("i want go to", event.currentTarget.name)
		const { currentTarget: { name },
		} = event;

		// 클릭한 것의 state id를 찾음
		// 카테고리를 변경하는데 내용과 아이디는 그대로 간다.
		setToDos(oldtoDos => {
			const targetIndex = oldtoDos.findIndex((toDo) => toDo.id === id)
			console.log(targetIndex);
			// const oldToDo = oldtoDos[targetIndex];
			const newToDo = { text, id, category: name as any }
			return [
				...oldtoDos.slice(0, targetIndex),
				newToDo,
				...oldtoDos.slice(targetIndex + 1)];
		})
	}

	const deleteToDos = (event: React.MouseEvent<HTMLButtonElement>) => {
		setToDos(oldtoDos => {
			const targetIndex = oldtoDos.findIndex((toDo) => toDo.id === id)
			return [
				...oldtoDos.slice(0, targetIndex),
				...oldtoDos.slice(targetIndex + 1)];
		})
	}


	return (
		<>
			<li>
				<span style={{ color: 'black' }}>{text}</span>
				{/* 1번 */}
				{/* {category !== "DOING" &&
					<button onClick={() => onClick("DOING")}>Doing</button>}

				{category !== "TO_DO" &&
					<button onClick={() => onClick("TO_DO")}>To Do</button>}

				{category !== "DONE" &&
					<button onClick={() => onClick("DONE")}>Done</button>} */}

				{/* 2번 */}
				{category !== ECategory.해야할일 &&
					<button name='해야할일' onClick={onClick}><span>I need</span> </button>}

				{category !== ECategory.하는중 &&
					<button name='하는중' onClick={onClick}><span>Doing</span></button>}

				{category !== ECategory.완료 &&
					<button name='완료' onClick={onClick}><span>Completion</span></button>}
				{category !== ECategory.제거 &&
					<button name='제거' onClick={deleteToDos}><span>Delete</span></button>}
			</li>
		</>
	)
}

export default ToDo;