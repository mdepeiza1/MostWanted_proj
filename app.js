"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let numberOfCriteria = promptFor("Would you like to search multiple traits? Enter 'yes' or 'no'", yesNo).toLowerCase();
      switch(numberOfCriteria){
        case 'yes':
          searchResults = searchByCriteria(people);
          break;
        case 'no':
          searchResults = searchByTrait(people);
          break;
      }
      break;
      default:
    app(people);
      break;
  }
  
  mainMenu(searchResults, people);
}

function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);

  switch(displayOption){
    case "info":
    displayInfo(person);
    break;
    case "family":
    displayFamily(person, people);
    break;
    case "descendants":
    displayDescendants(person, people);
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
  let foundPerson = [];

  foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}

function searchByTrait(people){
  let trait = promptFor("What color eyes does the person have?", chars);
  let peopleFound = people.filter(function(person){
    if(person.eyeColor === trait){
      return true;
    }
    else{
      return false;
    }
  })
        
  displayPeople(peopleFound);
  return choosePerson(people);
}

function searchByCriteria(people){
  let firstCriteria = promptFor("Is the person male or female?", chars);
  let secondCriteria = promptFor("When were they born?", date);
  let thirdCriteria = promptFor("How tall are they?", num);
  let fourthCriteria = promptFor("How much do they weigh?", num);
  let fifthCriteria = promptFor("What is their occupation?", chars);
  let peopleFound = people.filter(function(person){
    if(person.gender === firstCriteria || person.occupation === secondCriteria || person.height === thirdCriteria || person.weight === fourthCriteria || person.dob === fifthCriteria)//
    {
      return true;
    }
    else{
      return false;
    }
    })
                      
  displayPeople(peopleFound);
  return choosePerson(people);
  }

  function choosePerson(people){
  let chosenPerson = promptFor("Please enter first name of person you would like to view?", chars);
  let personFound = people.filter(function(person){
    if(person.firstName.toLowerCase() === chosenPerson.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
    })
  return personFound[0];
  }

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  let personInfo = "ID: " + person.id + "\n";
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n";

  alert(personInfo);
}

function displayInfo(person){
  let personInfo = "ID: " + person.id + "\n";
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n";

  alert(personInfo);
}

function displayFamily(initialPerson, people){
  let foundPersonParents = people.filter(function(personSearchedFor){

    if(initialPerson.parents.length === 0)
    {
      return false;
    }
    else if(initialPerson.parents.length === 1 && (initialPerson.parents[0] === personSearchedFor.id)){
      return true;
    }
    else if(initialPerson.parents.length === 2 && ((initialPerson.parents[0] === personSearchedFor.id)||(initialPerson.parents[1] === personSearchedFor.id))){
      return true;
    }
  })

  let foundPersonSpouse = people.filter(function(personSearchedFor){

    if(initialPerson.currentSpouse === personSearchedFor.id){
      return true;
    }
    else{
      return false;
    }
  })

  let foundPersonSiblings = people.filter(function(personSearchedFor){

    if(foundPersonParents.length === 0){
      return false;
    }
    else if(initialPerson.parents.length === 1 && (initialPerson.parents[0] === personSearchedFor.parents[0] || initialPerson.parents[0] === personSearchedFor.parents[1])){
      return true;
    }
    else if(initialPerson.parents.length === 2 && (((initialPerson.parents[0] === personSearchedFor.parents[0])||(initialPerson.parents[0] === personSearchedFor.parents[1]))
    ||((initialPerson.parents[1] === personSearchedFor.parents[1]) || (initialPerson.parents[1] === personSearchedFor.parents[0])))){
      return true;
    }
  })

  let personFamilyInfo = "";

  for(let x = 0; x < foundPersonParents.length; x++){
    personFamilyInfo += "Parent " + parseInt(x+1) + ": " + foundPersonParents[x].firstName + " " + foundPersonParents[x].lastName + "\n";
  }  
  if(foundPersonSpouse.length != 0)
  {
    personFamilyInfo += "Spouse: " + foundPersonSpouse[0].firstName + " " + foundPersonSpouse[0].lastName + "\n";
  }
  for(let x = 0; x < foundPersonSiblings.length; x++){
    personFamilyInfo += "Sibling " + parseInt(x+1) + ": " + foundPersonSiblings[x].firstName + " " + foundPersonSiblings[x].lastName + "\n";
  }  

  alert(personFamilyInfo);
}

function displayDescendants(initialPerson, people){
   let foundPersonDescendants = people.filter(function(personSearchedFor){
      if((personSearchedFor.parents.length !== 0) && ((initialPerson.id === personSearchedFor.parents[0]) || (initialPerson.id === personSearchedFor.parents[1])))
      {
        return true;
      }
  else 
      {
        return false;
      }
    })
  let descendantsToDisplay = [];

  if(foundPersonDescendants.length !== 0)
  {
    for(let j = 0; j < foundPersonDescendants.length; j++){
      if(foundPersonDescendants[j] !== null)
      {
        descendantsToDisplay.push(foundPersonDescendants[j]);
      }
    } 
  }

  if(foundPersonDescendants.length !== 0)
  {
    for(let x = 0; x < foundPersonDescendants.length; x++){
      descendantsToDisplay.push(displayDescendants(foundPersonDescendants[x], people));
    } 
  }
  let displayDescendantsToScreen = "";
  if(descendantsToDisplay.length !== 0)
  {
    for(let i = 0; i < descendantsToDisplay.length; i++){
      if(descendantsToDisplay[i].firstName !== undefined)
      {
        displayDescendantsToScreen += "Descendant " + parseInt(i+1) + ": " + descendantsToDisplay[i].firstName + 
        " " + descendantsToDisplay[i].lastName + "\n";
      }
    } 
  }
  if(displayDescendantsToScreen !== "")
  {
    alert(displayDescendantsToScreen);
  }
  return descendantsToDisplay;
}
  
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  if(isNaN(input)){
    return (typeof(input) == "string");
  }
}

function date(input){
    return (typeof(input) == "string");
}

function num(input){
  if(isNaN(input)){
    return false;
  }
  else{
    return (typeof(input) == "string");
  }
}
