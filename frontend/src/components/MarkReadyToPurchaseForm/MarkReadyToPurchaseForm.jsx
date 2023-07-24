import React, { useState } from "react";
import { markReadyToPurchase } from "../backEndConnectors/contractConnectors";

function MarkReadyToPurchaseForm() {
	const [batchId, setBatchId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		setErrorMsg("");
		setSuccessMsg("");

		try {
			const result = await markReadyToPurchase(batchId);
			if (result.success) {
				setSuccessMsg(result.msg);
			} else {
				setErrorMsg(result.msg);
			}
		} catch (error) {
			setErrorMsg("Failed to mark ready to purchase");
		}

		setIsLoading(false);
	};

	return (
		<div className="flex items-center justify-center mt-10">
			<div className="flex flex-col justify-center items-center p-6 rounded-lg shadow-md bg-gray-100 w-2/3">
				<h2 className="text-2xl font-bold mb-4 text-center">
					Mark For Purchase
				</h2>
				<form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
					<input
						type="text"
						value={batchId}
						onChange={(e) => setBatchId(e.target.value)}
						placeholder="Enter Batch ID"
						className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4 mb-4"
					/>
					<button
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-1/4"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Mark Ready to Purchase"}
					</button>
				</form>

				{errorMsg && <p className="text-red-500">{errorMsg}</p>}
				{successMsg && <p className="text-green-500">{successMsg}</p>}
			</div>
		</div>
	);
}

export default MarkReadyToPurchaseForm;
