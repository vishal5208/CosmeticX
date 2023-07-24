const hre = require("hardhat");
const fs = require("fs");

async function main() {
	// const Zighed_abderraouf_project = await hre.ethers.deployContract(
	// 	"Zighed_abderraouf_project"
	// );

	// let zighed_abderraouf_project =
	// 	await Zighed_abderraouf_project.waitForDeployment();

	// console.log(`Contract deployed to ${zighed_abderraouf_project.target}`);

	const Zighed_abderraouf_project = await ethers.getContractFactory(
		"Zighed_abderraouf_project"
	);
	let zighed_abderraouf_project = await Zighed_abderraouf_project.deploy();
	await zighed_abderraouf_project.deployed();

	console.log("Contrat is deployed at : ", zighed_abderraouf_project.address);

	// // Get contract ABIs
	const zighed_abderraouf_project_abi =
		zighed_abderraouf_project.interface.format("json");

	// Write contract addresses and ABIs to file
	const contracts = {
		Zighed_abderraouf_project: [
			zighed_abderraouf_project_abi,
			zighed_abderraouf_project.address,
		],
	};
	fs.writeFileSync(
		"../frontend/src/constants/contracts.json",
		JSON.stringify(contracts, null, 2)
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
