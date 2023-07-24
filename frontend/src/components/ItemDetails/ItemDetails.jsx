import React, { useState } from "react";
import { getCosmeticItemDetails } from "../backEndConnectors";

const ItemDetails = () => {
	const [batchId, setBatchId] = useState("");
	const [itemId, setItemId] = useState("");
	const [details, setDetails] = useState(null);
	const [error, setError] = useState(null);

	const handleGetDetails = async () => {
		try {
			const result = await getCosmeticItemDetails(batchId, itemId);
			setDetails(result);
			setError(null);
		} catch (error) {
			setDetails(null);
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center mt-10">
			<div className="flex flex-col justify-center items-center p-6 rounded-lg shadow-md bg-gray-100 w-2/3">
				<h2 className="text-2xl font-bold mb-4">Cosmetic Item Details</h2>
				<div className="mb-4 w-full">
					<label htmlFor="batchId" className="block mb-1 font-semibold">
						Batch ID:
					</label>
					<input
						id="batchId"
						type="text"
						value={batchId}
						onChange={(e) => setBatchId(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4 w-full">
					<label htmlFor="itemId" className="block mb-1 font-semibold">
						Item ID:
					</label>
					<input
						id="itemId"
						type="text"
						value={itemId}
						onChange={(e) => setItemId(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<button
					onClick={handleGetDetails}
					className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200 self-start"
				>
					Get Details
				</button>
				{error && <p className="text-red-500 mt-4">Error: {error}</p>}
				{details && (
					<div className="mt-4">
						{details.success ? (
							<div className="grid grid-cols-1 gap-4">
								<div>
									<p className="font-bold">Item ID:</p>
									<p>{details.cosmetics._itemId}</p>
								</div>
								<div>
									<p className="font-bold">Batch ID:</p>
									<p>{details.cosmetics._batchId}</p>
								</div>
								<div>
									<p className="font-bold">Item Sold:</p>
									<p>{details.cosmetics.itemSold.toString()}</p>
								</div>
								<div>
									<p className="font-bold">Consumer:</p>
									<p>{details.cosmetics.consumer}</p>
								</div>
							</div>
						) : (
							<p>{details.msg}</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemDetails;
