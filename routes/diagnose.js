var symptoms = require("../models/symptomsData.json");

exports.diagnosePatient = function(req, res) {
    symptoms.Symptoms.forEach(function(element) {
        console.log(element.Name);
        element.Diseases.forEach(function(disease) {
            console.log(disease);
        });
    });
    res.send('POST request to the Diagnosis');
};
