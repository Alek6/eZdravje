/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */

function generiranje() { 
    for (var i = 1; i <= 3; i++) { 
        generirajPodatke(i); 
    } 
    $('#izpisEHRID').text("3 novi pacienti so na voljo v izbirnem meniju."); 
} 

var rezultat = ""; 
function generirajPodatke(stPacienta) { 
    var ehrId = ""; 
    sessionId = getSessionId(); 
    var ime = "";
    var priimek = "";
    var datumRojstva = ""; 
    var starost = "";
    
    if (stPacienta == 1) { 
        ime = "Cristian"; 
        priimek = "Dorbolò"; 
        datumRojstva = "2010-07-20T00:31";
        starost = 6; 
        rezultat = "<option value=''></option>"; 
    } else if (stPacienta == 2) { 
        ime = "Aleksej"; 
        priimek = "Petricig"; 
        datumRojstva = "1994-11-22T01:25";
        starost = 21; 
    } else if (stPacienta == 3) { 
        ime = "Alma"; 
        priimek = "Capra";    
        datumRojstva = "1928-04-15T20:56";
        starost = 88; 
    } else { 
        return; 
    } 
       
   $.ajaxSetup({ 
         headers: {"Ehr-Session": sessionId} 
     }); 
     $.ajax({ 
         url: baseUrl + "/ehr", 
         type: 'POST', 
         success: function (data) { 
             ehrId = data.ehrId; 
             var partyData = { 
                 firstNames: ime, 
                 lastNames: priimek, 
                 dateOfBirth: datumRojstva,
                 age: starost,
                 partyAdditionalInfo: [{key: "ehrId", value: ehrId}] 
             }; 
             $.ajax({ 
                 url: baseUrl + "/demographics/party", 
                 type: 'POST', 
                 contentType: 'application/json', 
                 data: JSON.stringify(partyData), 
                 success: function (party) {
                     rezultat += "<option value='" + ehrId + "'>" + ime + " " + priimek + "</option>"; 
                     if (stPacienta == 3) { 
                         rezultat += "<option value=''></option>"; 
                     } 
                     $('#izberiPacienta').html(rezultat); 
                     generirajVitalneZnake(stPacienta, ehrId); 
                     //return ehrId; 
                 }, 
                 error: function(err) { 
                     $('#sporociloZgoraj').html("Prišlo je do napake: " + JSON.parse(err.responseText).userMessage);
                 } 
             }); 
         } 
     }); 
} 

function generirajMeritve(stPacienta, ehrId) { 
     if (stPacienta == 1) { 
         vnesiPodatke(ehrId, "2015-10-01T09:08", "173.5", "58", "36.7"); 
         vnesiPodatke(ehrId, "2015-11-01T09:08", "171.5", "52", "36.5"); 
         vnesiPodatke(ehrId, "2015-12-01T09:08", "172.4", "56", "36.7"); 
         vnesiPodatke(ehrId, "2016-01-01T09:08", "173.7", "55", "36.7"); 
         vnesiPodatke(ehrId, "2016-02-01T09:08", "175.4", "66", "36.9"); 
         vnesiPodatke(ehrId, "2016-03-01T09:08", "173.4", "52", "37.1"); 
         vnesiPodatke(ehrId, "2016-04-01T09:08", "173.5", "54", "36.6"); 
         vnesiPodatke(ehrId, "2016-05-01T09:08", "174.1", "52", "36.7"); 
         vnesiPodatke(ehrId, "2016-06-01T09:08", "173.2", "55", "36.3"); 
     } else if (stPacienta == 2) { 
         vnesiPodatke(ehrId, "2015-09-15T09:08", "184.4", "85", "36.7"); 
         vnesiPodatke(ehrId, "2015-10-15T09:08", "184.4", "87", "36.7"); 
         vnesiPodatke(ehrId, "2015-11-15T09:08", "184.6", "86", "37.2"); 
         vnesiPodatke(ehrId, "2015-12-15T09:08", "184.4", "88", "37.7"); 
         vnesiPodatke(ehrId, "2016-01-03T09:08", "184.4", "86", "36.5"); 
         vnesiPodatke(ehrId, "2016-02-27T09:08", "184.2", "84", "37.3"); 
         vnesiPodatke(ehrId, "2016-04-15T09:08", "184.5", "83", "37.1"); 
         vnesiPodatke(ehrId, "2016-05-29T09:08", "184.4", "80", "36.8"); 
         vnesiPodatke(ehrId, "2016-06-04T09:08", "184.4", "87", "36.9"); 
     } else if (stPacienta == 3) { 
         vnesiPodatke(ehrId, "2015-06-08T09:08", "170.2", "101", "36.8"); 
         vnesiPodatke(ehrId, "2015-07-08T09:08", "170.1", "104", "36.7"); 
         vnesiPodatke(ehrId, "2015-09-08T09:08", "170.4", "103", "36.6"); 
         vnesiPodatke(ehrId, "2015-10-08T09:08", "170.2", "104", "36.7"); 
         vnesiPodatke(ehrId, "2015-11-08T09:08", "170.2", "105", "36.7"); 
         vnesiPodatke(ehrId, "2015-12-14T09:08", "170.4", "106", "37.5"); 
         vnesiPodatke(ehrId, "2016-01-16T09:08", "170.5", "110", "36.3"); 
         vnesiPodatke(ehrId, "2016-03-24T09:08", "170.4", "109", "38.2"); 
         vnesiPodatke(ehrId, "2016-05-20T09:08", "170.2", "109", "36.5"); 
     } 
}  

function vnesiPodatke(ehrId, datum, visina, teza, temperatura) { 
     sessionId = getSessionId(); 
     $.ajaxSetup({ 
 		headers: {"Ehr-Session": sessionId} 
     }); 
 	var podatki = { 
 		"ctx/language": "en", 
 		"ctx/territory": "SI", 
 		"ctx/time": datum, 
 		"vital_signs/height_length/any_event/body_height_length": visina, 
 		"vital_signs/body_weight/any_event/body_weight": teza, 
 		"vital_signs/body_temperature/any_event/temperature|magnitude": temperatura, 
 		"vital_signs/body_temperature/any_event/temperature|unit": "°C"  
 	}; 
 	var parametriZahteve = { 
 		ehrId: ehrId, 
 		templateId: 'Vital Signs', 
 		format: 'FLAT' 
 	}; 
 	$.ajax({ 
 		url: baseUrl + "/composition?" + $.param(parametriZahteve), 
 		type: 'POST', 
 		contentType: 'application/json', 
 		data: JSON.stringify(podatki), 
 		error: function(err) { 
             $('#sporociloZgoraj').html("Prišlo je do napake pri vpisovanju podatkov: " + JSON.parse(err.responseText).userMessage); 
 		} 
 	}); 
} 


