import React, { useEffect, useState } from "react";
import { getCosmetics } from "../backEndConnectors";

export function CosmeticDetails({ batchId }) {
	const [cosmetics, setCosmetics] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
	const [showDetails, setShowDetails] = useState(false);

	useEffect(() => {
		fetchCosmetics();
	}, [batchId]);

	const fetchCosmetics = async () => {
		setIsLoading(true);
		setErrorMsg("");

		try {
			const result = await getCosmetics(batchId);
			if (result.success) {
				setCosmetics(result.cosmetics);
				setShowDetails(true);
			} else {
				setErrorMsg(result.msg);
				setShowDetails(false);
			}
		} catch (error) {
			setErrorMsg("Failed to fetch cosmetic details");
			setShowDetails(false);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		const interval = setInterval(fetchCosmetics, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<div
				className={`bg-gray-100 p-8 rounded-lg shadow-md transition-opacity duration-300 ${
					showDetails ? "opacity-100" : "opacity-0"
				}`}
			>
				<h2 className="text-2xl font-bold mb-4">Cosmetic Details</h2>
				{isLoading ? (
					<p>Loading cosmetic details...</p>
				) : errorMsg ? (
					<p className="text-red-500">{errorMsg}</p>
				) : (
					cosmetics && (
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="font-bold">Brand:</p>
								<p>{cosmetics.brand}</p>
							</div>
							<div>
								<p className="font-bold">Item:</p>
								<p>{cosmetics.item}</p>
							</div>
							<div>
								<p className="font-bold">Manufacturer:</p>
								<p>{cosmetics.manufacturer}</p>
							</div>
							<div>
								<p className="font-bold">Distributor:</p>
								<p>{cosmetics.distributor}</p>
							</div>
							<div>
								<p className="font-bold">Retailer:</p>
								<p>{cosmetics.retailer}</p>
							</div>
							<div>
								<p className="font-bold">State:</p>
								<p>{cosmetics.state}</p>
							</div>
							<div>
								<p className="font-bold">Item Count:</p>
								<p>{cosmetics.itemCount}</p>
							</div>
							<div>
								<p className="font-bold">Has Owner Approval:</p>
								<p>{cosmetics.hasOwnerApproval ? "Yes" : "No"}</p>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}
