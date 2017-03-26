var symptoms = require("../models/symptomsData.json");

exports.diagnosePatient = function(req, res) {

    //var patientSymptoms = req.body.symptoms;
    var patientSymptoms = req.body.js_code;
    console.log("-----------------------------",patientSymptoms);

    /*
    var patientSymptoms = [
        "Headache",
        "Fever",
    ];
    */

    var diseases = new Map();
    // For each symptom
    patientSymptoms.forEach(function(symp) {

        // Find symptom in the data store
        symptoms.Symptoms.forEach(function(element) {
            var symptomName = element.Name;
            if(symptomName.match(new RegExp(symp, "i"))) {
                // Map it to the disease
                element.Diseases.forEach(function(disease) {
                    if(!diseases.get(disease)) {
                        diseases.set(disease, 1);
                    } else {
                        var oldFreq = diseases.get(disease);
                        diseases.delete(disease);
                        diseases.set(disease, oldFreq + 1);
                    }
                });
            }
        });
    });

    var mostProbableDisease = diseases.keys().next().value;
    for(var [key, value] of diseases) {
        if(diseases.get(mostProbableDisease) < value) {
            mostProbableDisease = key;
        }
    };

    // If too less symptoms
    /*
    if(diseases.get(mostProbableDisease) < 3) {
        var spawn = require('child_process').spawn;
        var symptomArray;
        py = spawn('python', ['pythonDiseaseScript.py']);
        py.stdout.on('data', function(data){
            symptomArray = data;
            console.log(symptomArray);
        });
        py.stdin.write(JSON.stringify(patientSymptoms));
        py.stdin.end();
    }
    */
    console.log(mostProbableDisease);

    res.send(mostProbableDisease);
};
