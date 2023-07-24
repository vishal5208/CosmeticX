import React, { useState } from "react";
import { sellItem } from "../backEndConnectors";

function SellItem() {
	const [batchId, setBatchId] = useState("");
	const [itemId, setItemId] = useState("");
	const [consumer, setConsumer] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		setErrorMsg("");
		setSuccessMsg("");

		try {
			const result = await sellItem(batchId, itemId, consumer);
			if (result.success) {
				setSuccessMsg(result.msg);
			} else {
				setErrorMsg(result.msg);
			}
		} catch (error) {
			setErrorMsg("Failed to sell item");
		}

		setIsLoading(false);
	};

	return (
		<div className="flex items-center justify-center mt-10">
			<div className="flex flex-col justify-center items-center p-6 rounded-lg shadow-md bg-gray-100 w-2/3">
				<h2 className="text-2xl font-bold text-center mb-4">Sell Item</h2>
				<form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
					<label className="font-bold mb-1">Batch ID:</label>
					<input
						type="text"
						value={batchId}
						onChange={(e) => setBatchId(e.target.value)}
						placeholder="Batch ID"
						className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<label className="font-bold mb-1">Item ID:</label>
					<input
						type="number"
						value={itemId}
						onChange={(e) => setItemId(e.target.value)}
						placeholder="Item ID"
						className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<label className="font-bold mb-1">Consumer Address:</label>
					<input
						type="text"
						value={consumer}
						onChange={(e) => setConsumer(e.target.value)}
						placeholder="Consumer Address"
						className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-1/6"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Sell Item"}
					</button>
				</form>

				{errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
				{successMsg && <p className="text-green-500 mt-2">{successMsg}</p>}
			</div>
		</div>
	);
}

export default SellItem;
