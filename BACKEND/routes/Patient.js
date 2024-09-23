const router = require("express").Router();
let Patient = require("../models/Patient");

// Add new patient
router.route("/add").post((req, res) => {
    const { nic, name, email, dob, gender, address, height, weight, number, patientCondition, doctorsNotes } = req.body;

    const newPatient = new Patient({
        nic, name, email, dob, gender, address, height, weight, number, patientCondition, doctorsNotes
    });

    newPatient.save()
        .then(() => {
            res.json("Patient Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error adding patient", error: err.message });
        });
});

// Get all patients
router.route("/").get((req, res) => {
    Patient.find()
        .then((patients) => {
            res.json(patients);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error retrieving patients", error: err.message });
        });
});

// Update patient by ID
router.put("/update/:id", async (req, res) => {
    const userId = req.params.id;
    const { nic, name, email, dob, gender, address, height, weight, number, patientCondition, doctorsNotes } = req.body;

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            userId,
            { nic, name, email, dob, gender, address, height, weight, number, patientCondition, doctorsNotes },
            { new: true, runValidators: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ message: "Patient updated successfully", updatedPatient });
    } catch (err) {
        console.error("Error updating patient:", err);
        res.status(500).json({ message: "Error updating patient", error: err.message });
    }
});

// Delete patient by ID
router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    await Patient.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "user deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error deleting user", error: err.message });
        });
});

// Get patient by ID
router.route("/get/:id").get(async (req, res) => {
    const userId = req.params.id;

    await Patient.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ status: "Error", message: "Patient not found" });
            }
            res.status(200).send({ status: "user fetched", user });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error retrieving user", error: err.message });
        });
});

module.exports = router;
