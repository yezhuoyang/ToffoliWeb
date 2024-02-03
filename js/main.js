// Import the QuantumCircuit from quantumSimulator.js
const QuantumCircuit = require('./quantumSimulator');
// Define your main function


function main() {
    circuit=new QuantumCircuit();
    circuit.add_1_qubit_gate("Hadamard", 0);
    circuit.add_1_qubit_gate("Hadamard", 1);
    circuit.add_1_qubit_gate("Hadamard", 2);
    console.log(circuit.calculate_matrix());
}

// Call the main function
main();