import React, { useState } from "react";
import { assignDistributor, assignRetailer } from "../backEndConnectors";

export function AssignRoles() {
	const [distributorAddress, setDistributorAddress] = useState("");
	const [retailerAddress, setRetailerAddress] = useState("");
	const [batchId0, setBatchId0] = useState("");
	const [batchId1, setBatchId1] = useState("");
	const [isLoading0, setIsLoading0] = useState(false);
	const [isLoading1, setIsLoading1] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleAssignDistributor = async () => {
		if (!distributorAddress || !batchId0) {
			setErrorMsg("Please enter a distributor address and batch ID");
			return;
		}

		setIsLoading0(true);
		setErrorMsg("");

		try {
			const result = await assignDistributor(distributorAddress, batchId0); // Call the assignDistributor function
			if (result.success) {
				// Handle success
				console.log(result);
			} else {
				setErrorMsg(result.msg);
			}
		} catch (error) {
			setErrorMsg(error.message);
		}

		setIsLoading0(false);
	};

	const handleAssignRetailer = async () => {
		if (!retailerAddress || !batchId1) {
			setErrorMsg("Please enter a retailer address and batch ID");
			return;
		}

		setIsLoading1(true);
		setErrorMsg("");

		try {
			const result = await assignRetailer(retailerAddress, batchId1);
			if (result.success) {
				// Handle success
				console.log(result);
			} else {
				setErrorMsg(result.msg);
			}
		} catch (error) {
			setErrorMsg(error.message);
		}

		setIsLoading1(false);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="p-8 rounded-lg shadow-md bg-gray-100 w-2/3">
				<h2 className="text-2xl font-bold mb-4 text-center">Assign Roles</h2>
				<div className="space-y-4">
					<div className="flex flex-col">
						<label htmlFor="distributorAddress" className="font-bold">
							Distributor Address:
						</label>
						<input
							type="text"
							id="distributorAddress"
							value={distributorAddress}
							onChange={(e) => setDistributorAddress(e.target.value)}
							className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="batchId0" className="font-bold">
							Batch ID:
						</label>
						<input
							type="text"
							id="batchId0"
							value={batchId0}
							onChange={(e) => setBatchId0(e.target.value)}
							className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						onClick={handleAssignDistributor}
						disabled={isLoading0}
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
					>
						{isLoading0 ? "Assigning Distributor..." : "Assign Distributor"}
					</button>
				</div>

				<div className="mt-6 space-y-4">
					<div className="flex flex-col">
						<label htmlFor="retailerAddress" className="font-bold">
							Retailer Address:
						</label>
						<input
							type="text"
							id="retailerAddress"
							value={retailerAddress}
							onChange={(e) => setRetailerAddress(e.target.value)}
							className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="batchId1" className="font-bold">
							Batch ID:
						</label>
						<input
							type="text"
							id="batchId1"
							value={batchId1}
							onChange={(e) => setBatchId1(e.target.value)}
							className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						onClick={handleAssignRetailer}
						disabled={isLoading1}
						className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
					>
						{isLoading1 ? "Assigning Retailer..." : "Assign Retailer"}
					</button>
				</div>

				{errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}
			</div>
		</div>
	);
}
