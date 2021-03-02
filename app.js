"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
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
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars); //added chars

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayInfo(person);
    break;
    case "family":
    // TODO: get person's family
    displayFamily(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
    displayDescendants(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
  let foundPerson = [];

  switch(typeof(firstName) === "string"){
    case true:
      switch(typeof(lastName) === "string"){
        case true:
          foundPerson = people.filter(function(person){
            if(person.firstName === firstName && person.lastName === lastName){
              return true;
            }
            else{
              return false;
            }
          })
        break;
        default:
        return searchByName(people);//might have to change this
      }
    break;
    default:
    return searchByName(people);
  }
  
  // TODO: find the person using the name they entered
  //return foundPerson;
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

  if(peopleFound.length == 1)
  {
    return peopleFound[0];
  }
  else if(peopleFound.length > 1)
  {
    let numFromList = parseInt(promptFor("Please select the number of the person from the list (1 to " + peopleFound.length + ").", chars));//might change chars to num
    return peopleFound[numFromList-1];
  }
  else
  {
    return null;
  }
}

function searchByCriteria(people){
  let firstCriteria = promptFor("Is the person male or female?", chars);
  let secondCriteria = promptFor("When were they born?", chars);
  let thirdCriteria = promptFor("How tall are they?", chars);
  let fourthCriteria = promptFor("How much do they weigh?", chars);
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
  if(peopleFound.length == 1)
  {
    return peopleFound[0];
  }
  else if(peopleFound.length > 1)
  {
    let numFromList = parseInt(promptFor("Please select the number of the person from the list (1 to " + peopleFound.length + ").", chars));//might change chars to num
    return peopleFound[numFromList-1];
  }
  else
  {
    return null;
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.

  //let personInfo = "First Name: " + person.firstName + "\n";
  //personInfo += "Last Name: " + person.lastName + "\n";

  // TODO: finish getting the rest of the information to display
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
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.

  //let personInfo = "First Name: " + person.firstName + "\n";
  //personInfo += "Last Name: " + person.lastName + "\n";

  // TODO: finish getting the rest of the information to display
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
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.

  //let personInfo = "First Name: " + person.firstName + "\n";
  //personInfo += "Last Name: " + person.lastName + "\n";

  // TODO: finish getting the rest of the information to display

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

    /*if(person.parents.id === id){
      return true;
    }
    else{
      return false;
    }*/
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
        displayDescendantsToScreen += "Parent " + parseInt(i+1) + ": " + descendantsToDisplay[i].firstName + 
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
  


// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return (typeof(input) == "string"); // default validation only
}

// helper function to pass in as default promptFor validation
/*function chars(input){
  return true; // default validation only
}*/


// helper function to pass in as number validation
function num(input){
  return (typeof(input) == "number"); // default validation only
}
