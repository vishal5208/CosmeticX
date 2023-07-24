import React, { useState } from "react";
import { addCosmetics } from "../backEndConnectors/contractConnectors";

export function AddCosmeticsForm() {
	const [brand, setBrand] = useState("");
	const [item, setItem] = useState("");
	const [itemCount, setItemCount] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [batchId, setBatchId] = useState("");

	const handleBrandChange = (event) => {
		setBrand(event.target.value);
	};

	const handleItemChange = (event) => {
		setItem(event.target.value);
	};

	const handleItemCountChange = (event) => {
		setItemCount(event.target.value);
	};

	const handleAddCosmetics = async () => {
		setIsLoading(true);
		setErrorMsg("");

		console.log(brand, item, itemCount);

		const result = await addCosmetics({ brand, item, itemCount });

		setIsLoading(false);

		if (!result.success) {
			setErrorMsg(result.msg);
		} else {
			const { batchId } = result;
			setBrand("");
			setItem("");
			setItemCount("");
			setBatchId(batchId);
		}
	};

	const handleCopyBatchId = () => {
		navigator.clipboard.writeText(batchId);
		alert("Batch ID copied to clipboard!");
	};

	return (
		<div className="flex flex-col items-center justify-center pt-5 pb-10 mt-0">
			<div className="flex flex-col p-8 rounded-lg shadow-md bg-gray-100 w-2/3">
				<p className="font-bold text-2xl mb-5 text-center">Add Cosmetics</p>
				<div className="mb-4 flex flex-col">
					<label className="font-bold">Brand:</label>
					<input
						type="text"
						value={brand}
						onChange={handleBrandChange}
						className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4 flex flex-col">
					<label className="font-bold">Item:</label>
					<input
						type="text"
						value={item}
						onChange={handleItemChange}
						className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4 flex flex-col">
					<label className="font-bold">Item Count:</label>
					<input
						type="number"
						value={itemCount}
						onChange={handleItemCountChange}
						className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="flex flex-col gap-4">
					<button
						className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-medium uppercase w-1/5"
						onClick={handleAddCosmetics}
						disabled={isLoading}
					>
						{isLoading ? "Adding..." : "Add Cosmetics"}
					</button>
					{batchId && (
						<div className="flex gap-4 self-center items-center justify-center">
							<span className="text-green-500">Batch ID: {batchId}</span>
							<button
								className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-2 py-2 text-xs"
								onClick={handleCopyBatchId}
							>
								Copy
							</button>
						</div>
					)}
					{errorMsg && <span className="text-red-500">{errorMsg}</span>}
				</div>
			</div>
		</div>
	);
}
