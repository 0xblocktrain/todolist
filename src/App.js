import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContract, useSigner } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract";

function App() {
	const [tasks, setTasks] = useState([]);

	const { address } = useAccount();
	const { data: signer } = useSigner();
	const contract = useContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		signerOrProvider: signer,
	});

	console.log("CONTRACT ", contract);

	const getTasks = async () => {
		try {
			let tasks = [];
			let tasks_count = await contract.count();
			console.log("TOTAL NUMBER OF TASKS ", tasks_count.toString());
			if (tasks_count) {
				tasks_count = +tasks_count;
				// Fetch tasks
				for (let i = 0; i < tasks_count; i++) {
					const task = await contract.tasks(i);
					if (task) {
						tasks.push(task);
					}
				}
			}
			// Set task in the state
			setTasks(tasks);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (contract) {
			getTasks();
		}
	}, [contract]);

	return (
		<div className="flex flex-col justify-center items-center bg-black text-white">
			<div className="flex items-center justify-between w-full px-4 py-2">
				<p className="text-xl font-bold">Todo-List</p>
				{address && <ConnectButton />}
			</div>
			<div
				style={{ minHeight: "95vh" }}
				className="flex flex-col items-center justify-center gap-4 w-full"
			>
				<h1 className="text-4xl font-extrabold">Todo List</h1>
				{!address && <ConnectButton />}

        {/* Add Task */}

        {/* All Tasks */}
				<div className="flex items-center justify-center flex-col">
					{tasks.length > 0 &&
						tasks.map((taskItem, i) => {
							return (
								<div className="flex items-center justify-between" key={i}>
                  {/* Check if task is not completed */}
                  {
                    !taskItem[1] && (
                      <p>{taskItem[0]}</p>
                    )
                  }
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default App;
