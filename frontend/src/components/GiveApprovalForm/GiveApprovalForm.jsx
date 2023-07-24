import React, { useState } from "react";
import { giveApprovalToBatch } from "../backEndConnectors";

const GiveApprovalForm = () => {
	const [batchId, setBatchId] = useState("");
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);

	const handleBatchIdChange = (e) => {
		setBatchId(e.target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const result = await giveApprovalToBatch(batchId);
		if (result.success) {
			setSuccess(true);
			setMessage(result.msg);
		} else {
			setSuccess(false);
			setMessage(result.msg);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center pt-5 pb-10 mt-4">
			<div className="p-8 rounded-lg shadow-md bg-gray-100 w-2/3">
				<p className="font-bold text-2xl mb-5 text-center">
					Give Approval to Batch
				</p>
				<form className="flex flex-col" onSubmit={handleFormSubmit}>
					<label htmlFor="batchId" className="font-bold">
						Batch ID:
					</label>
					<input
						type="text"
						id="batchId"
						value={batchId}
						onChange={handleBatchIdChange}
						className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter Batch ID"
						required
					/>
					<button
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 w-1/5"
						type="submit"
					>
						Grant Approval
					</button>
				</form>
				{message && (
					<div className={success ? "success" : "error"}>{message}</div>
				)}
			</div>
		</div>
	);
};

export default GiveApprovalForm;
