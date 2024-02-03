document.addEventListener('DOMContentLoaded', function() {
    let circuitDiagram = document.querySelector('.circuit-diagram');
    let qubits = document.querySelectorAll('.qubit');
    const gateWidth = 100; // Width of one gate, adjust as needed
    let gateCount = 0; // Global count of gates added to the circuit
    const gateHeight = 20; // Height of one gate, adjust as needed

    // Function to reset all qubits' opacity
    function resetQubitOpacity() {
        qubits.forEach(qubit => qubit.style.opacity = 1);
    }

    document.querySelectorAll('.fixed-gate').forEach(gate => {
        gate.setAttribute('draggable', true);
        gate.addEventListener('dragstart', function(e) {
            const clone = this.cloneNode(true);
            clone.classList.add('draggable-gate');
            clone.classList.remove('fixed-gate');
            document.body.appendChild(clone);
            e.dataTransfer.setData('text/html', clone.outerHTML);
            e.dataTransfer.setDragImage(clone, 0, 0);
            setTimeout(() => document.body.removeChild(clone), 0);
        });
    });

    circuitDiagram.addEventListener('dragover', function(e) {
        e.preventDefault();
        resetQubitOpacity(); // Reset opacity for all qubits initially

        let circuitRect = circuitDiagram.getBoundingClientRect();
        let gateY = e.clientY - circuitRect.top + window.scrollY; // Y position of gate relative to circuit

        // Determine the closest qubit by vertical position
        let closestQubit = null;
        let minDistance = Infinity;
        qubits.forEach(qubit => {
            let qubitRect = qubit.getBoundingClientRect();
            let qubitCenterY = qubitRect.top + (qubitRect.height / 2) - circuitRect.top;
            let distance = Math.abs(gateY - qubitCenterY);
            if (distance < minDistance) {
                closestQubit = qubit;
                minDistance = distance;
            }
        });

        if (closestQubit) {
            closestQubit.style.opacity = 0.5; // Highlight the closest qubit
        }
    });


    // Function to check overlap and return qubit if exists
    function doesGateOverlapWithQubit(gateX, gateY) {
        for (let qubit of qubits) {
            let qubitRect = qubit.getBoundingClientRect();
            let circuitRect = circuitDiagram.getBoundingClientRect();

            let qubitX0 = circuitRect.left; // Assuming x0 is the left edge of the circuit diagram
            let qubitY0 = qubitRect.top;

            if (gateX > qubitX0 && gateY < qubitY0 && gateY + gateHeight > qubitY0) {
                return qubit; // Return the qubit with which the gate overlaps
            }
        }
        return null; // No overlap with any qubit
    }

    // Reset qubit line opacity on drag leave or drop
    function resetQubitOpacity() {
        qubits.forEach(qubit => {
            qubit.style.opacity = 1; // Reset opacity
        });
    }
    
    circuitDiagram.addEventListener('drop', function(e) {
        e.preventDefault();
        resetQubitOpacity(); // Reset opacity for all qubit lines
    
        // Assume data contains identifier or HTML of the gate, or you could use other attributes to recreate the gate
        let data = e.dataTransfer.getData('text/html');
        let droppedElement = document.createElement('div');
        droppedElement.innerHTML = data;
        let gateHTML = droppedElement.querySelector('.draggable-gate');
    
        if (!gateHTML) {
            return; // Exit if no gate found
        }
    
        let gateX = e.clientX - this.getBoundingClientRect().left + window.scrollX;
        let gateY = e.clientY - this.getBoundingClientRect().top + window.scrollY;
    
        // Create a new gate element for insertion
        let newGate = document.createElement('div');
        newGate.className = 'draggable-gate'; // Set class name to match your draggable gates
        newGate.innerHTML = gateHTML.innerHTML; // Copy inner HTML from dropped gate
        newGate.style.position = 'absolute';
        newGate.style.left = (gateCount * gateWidth) + 'px'; // Position based on sequential count
        let overlappingQubit = doesGateOverlapWithQubit(gateX, gateY);
        if (overlappingQubit) {
            newGate.style.top = (overlappingQubit.getBoundingClientRect().top - circuitDiagram.getBoundingClientRect().top) + 'px';
            overlappingQubit.appendChild(newGate); // Append the newly created gate to the overlapping qubit
            gateCount++; // Increment global gate count
        }
    });
    

    // Consider adding a 'dragleave' event to reset opacity when the gate is not over any qubit
    circuitDiagram.addEventListener('dragleave', function(e) {
        resetQubitOpacity();
    });
});
