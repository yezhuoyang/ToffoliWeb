class QuantumGate {
    constructor(name, matrix) {
        this.name = name;
        this.matrix = matrix; // Assume matrix is a 2D array representing the gate
    }
}



class HadamardGate extends QuantumGate {
    constructor(qubitindex) {
        super("Hadamard", [[1/Math.sqrt(2), 1/Math.sqrt(2)], [1/Math.sqrt(2), -1/Math.sqrt(2)]]);
        this.qubitindex = qubitindex;
        this.is_singlequbit = true;
    }
}


class PauliX extends QuantumGate {
    constructor(qubitindex) {
        super("PauliX", [[0, 1], [1, 0]]);
        this.qubitindex = qubitindex;
        this.is_singlequbit = true;
    }
}


class PauliY extends QuantumGate {
    constructor(qubitindex) {
        super("PauliY", [[0, Math.complex(0, -1)], [Math.complex(0, 1), 0]]);
        this.qubitindex = qubitindex;
        this.is_singlequbit = true;
    }
}


class PauliZ extends QuantumGate {
    constructor(qubitindex) {
        super("PauliX", [[1, 0], [0, -1]]);
        this.qubitindex = qubitindex;
        this.is_singlequbit = true;
    }
}


class Phase extends QuantumGate {
    constructor(qubitindex) {
        super("Phase", [[1, 0], [0, Math.complex(0, 1)]]);
        this.qubitindex = qubitindex;
        this.is_singlequbit = true;
    }
}


class CNOT extends QuantumGate {
    constructor(qubitindex1, qubitindex2) {
        // Define the Hadamard matrix for 1 qubit
        super("CNOT", [[1, 0,0,0], [0,1,0,0],[0,0,0,1],[0,0,1,0]]);
        this.qubitindex1 = qubitindex1;
        this.qubitindex2 = qubitindex2;
        this.is_singlequbit = false;
    }
}

const ToffoliMatrix= [[1, 0,0,0,0,0,0,0], [0, 1,0,0,0,0,0,0],[0, 0,1,0,0,0,0,0],[0, 0,0,1,0,0,0,0], [0, 0,0,0,1,0,0,0], [0, 0,0,0,0,1,0,0],[0, 0,0,0,0,0,0,1],[0, 0,0,0,0,0,1,0]];

class Toffoli extends QuantumGate {
    constructor(qubitindex1, qubitindex2,qubitindex3) {
        // Define the Hadamard matrix for 1 qubit
        super("Toffoli", ToffoliMatrix);
        this.qubitindex1 = qubitindex1;
        this.qubitindex2 = qubitindex2;
        this.qubitindex3 = qubitindex3;
        this.is_singlequbit = false;
    }
}


const name_gate_dict = {
    "Hadamard": HadamardGate,
    "PauliX": PauliX,
    "PauliY": PauliY,
    "PauliZ": PauliZ,
    "Phase": Phase,
    "CNOT": CNOT
};

const identity_matrix_1_qubit = [[1, 0], [0, 1]];


const identity_matrix_2_qubit = [[1, ,0,0,0], [0, 1,0,0],
                                [0,0,1,0],[0,0,0,1]];

const identity_matrix_3_qubit = [[1, 0,0,0,0,0,0,0], [0, 1,0,0,0,0,0,0],
                                    [0, 0,1,0,0,0,0,0],[0, 0,0,1,0,0,0,0],
                                     [0, 0,0,0,1,0,0,0], [0, 0,0,0,0,1,0,0],
                                     [0, 0,0,0,0,0,1,0],[0, 0,0,0,0,0,0,1]];


// Quantum state and gate operations
class QuantumCircuit {
    constructor() {
        this.numQubits = 3;
        this.matrix = identity_matrix_3_qubit;
        this.gates = [];
    }

    //Extand the 8*8 matrix of a single gate, return a matrix
    extend_single_gate(gate){
        return ToffoliMatrix;
    }

    //Extand the 8*8 matrix of a two qubit gate
    extend_two_qubit_gate(gate){
        return ToffoliMatrix;
    }



    add_1_qubit_gate(gatename, qubitindex) {
        this.gates.push(new name_gate_dict[gatename](qubitindex));
    }


    add_2_qubit_gate(gatename, qubitindex1, qubitindex2) {
        this.gates.push(new name_gate_dict[gatename](qubitindex1,qubitindex2));
    }


    //Caclulate the whole 8*8 matrix of the circuit
    calculate_matrix(){
        for (let i = 0; i < this.gates.length; i++) {
            console.log(this.gatesp[i].name); // Outputs the element at index i
            if (this.gates[i].is_singlequbit){
                gate_matrix=this.extend_single_gate(this.gates[i]);
            }
            else{
                gate_matrix=this.extend_two_qubit_gate(this.gates[i]);
            }
            this.matrix = math.multiply(gate_matrix, this.matrix);
        }
        return this.matrix;
    }



}

