// var numberOfLifts = document.querySelector("#number-of-lifts");
// var numberOfFloors = document.querySelector("#number-of-floors");
const submitButton = document.querySelector(".submit-button");
const FinalPage = document.querySelector(".final-page");
const errorMessage = document.querySelector("#error-message");

let liftRequestQueue = [];

//Check for any Lift Request in every 200msec.
document.addEventListener("DOMContentLoaded", function () {
  let id = setInterval(checkQueue, 200);
});

submitButton.addEventListener("click", clickHandler);

function clickHandler() {
  const numberOfLifts = document.querySelector("#number-of-lifts");
  const numberOfFloors = document.querySelector("#number-of-floors");

  const floorCount = Number(numberOfFloors.value);
  const liftCount = Number(numberOfLifts.value);
  //console.log("type of --->",typeof floorCount)

  // console.log(numberOfFloors.value)
  // console.log(numberOfLifts.value);
  // checking for invalid flooor count or lift count

  if (
    floorCount <= 0 ||
    floorCount >= 100 ||
    liftCount <= 0 ||
    liftCount > 10
  ) {
    errorMessage.innerText ="enter valid input";
    return;
  }
  else if(liftCount > floorCount)
  {
    errorMessage.innerText = "number of floors should be greater then number of lifts";
    return;
  }

  // CreateFloors(floorCount);
  // CreateLifts(liftCount);
    document.getElementById("lift-form-container").style.display = "none";
  FinalPage.innerHTML = CreateFloors(floorCount);
  }

addEventListener("click", (e) => {
  if (
    e.target.classList.contains("up-button") ||
    e.target.classList.contains("down-button")
  ) {
    liftRequestQueue.push(e.target.dataset.floorno);
  }
});

// function renderFloors(totalFloors)
// {
//     const floorsContainer = document.querySelector("#floors-container");
//     for (let floorNumber = totalFloors; floorNumber > 0; floorNumber--) {
//       const presentFloor = document.createElement("section");
//       presentFloor.className = "floor";
//       const floorId = `floor-${floorNumber}`;
//       presentFloor.id = floorId;
//       presentFloor.innerHTML = `
//                 <section class="floor-details">
//                     <button class="up" data-floorNo="${floorNumber}">UP</button>
//                     <p class="floor-number">Floor-${floorNumber}</p>
//                     <button class="down" data-floorNo="${floorNumber}">DOWN</button>
//                 </section>
//         `;

//       floorsContainer.appendChild(presentFloor);

//     }
//     const groundFloor = document.createElement("section");
//     groundFloor.className = "floor";
//     groundFloor.id = `floor-0`;
//     groundFloor.innerHTML = `
//             <section class="floor-details ">
//                 <button class="up" data-floorNo="0">UP</button>
//                 <p class="floor-number">Floor-0</p>
//             </section>
//     `;
//     floorsContainer.appendChild(groundFloor);

// }

// function renderLifts(totalLifts)
// {
//   const groundFloor = document.querySelector("#floors-container>#floor-0");
//   for (let liftNumber = 1; liftNumber <= totalLifts; liftNumber++) {
//     const currentLift = document.createElement("section");
//     currentLift.className = "lift-container";
//     // currentLift.id = `Lift-${liftNumber}`;
//     currentLift.innerHTML = `
//             <div class="Lift" data-pos="${liftNumber}" data-status="free"></div>

//         `;

//     groundFloor.appendChild(currentLift);
//   }
// }

// fucntion to move llift
function CreateFloors(totalFloors) {
  let floors = totalFloors;
  let resultantDisplay = ``;
  if (floors === 1) {
    resultantDisplay += `<div class='floor-wrapper-container'>
            <div class="floor-wrapper"></div>
            <div class="Floor">
                <div class="floor-boundary-lines"></div>
                <div class="floor-number-wrapper">
                     Floor <span class="floor-number"> 0 </span>
                </div>
            </div>
        </div>`;
  } else {
    for (let i = floors - 1; i >= 0; i--) {
      resultantDisplay += `<div class='floor-wrapper-container'>
            <div class="floor-wrapper">
                <div class="lift-buttons">
                    ${
                      i === floors - 1
                        ? ""
                        : `<button class="up-button" data-floorNo="${i}">UP</button>`
                    }
                    ${
                      i === 0
                        ? ""
                        : `<button class="down-button" data-floorNo="${i}">DOWN</button>`
                    }
                </div>
                <div class="lift-wrapper">
                    ${i === 0 ? CreateLifts() : ""}
                </div>
            </div>
            <div class="Floor">
                <div class="floor-boundary-lines"></div>
                <div class="floor-number-wrapper">
                    Floor <span class="floor-number"> ${i}</span>
                </div>
            </div>
        </div>`;
    }
  }
  return resultantDisplay;
}

//Generating Lifts

function CreateLifts() {
  let lifts = document.querySelector("#number-of-lifts").value;
  let resultantLiftDisplay = ``;
  for (i = 0; i < lifts; i++) {
    resultantLiftDisplay += `<div class="Lift" data-pos="${i}" data-status="${"free"}">
            <div class="left-door" id="left-door"></div>
            <div class="right-door" id="right-door"></div>
        </div>`;
  }
  return resultantLiftDisplay;
}

function moveLift(targetFloor) {
  // console.log("target floor inside move lift", targetFloor);
  const lifts = Array.from(document.getElementsByClassName("Lift"));
  // console.log("lifts in move lift function", lifts);
  const availableLift = lifts.find((lift) => {
    console.log(lift.dataset);
    return lift.dataset.status === "free";
  });
  // console.log("available lifts", availableLift);

  const availableLiftOnTargetFloor = lifts.find((lift) => {
    lift.dataset.status === "free" && Number(lift.dataset.pos) === targetFloor;
  });

  // The lift is already present on the current floor
  if (availableLiftOnTargetFloor) {
    availableLiftOnTargetFloor.setAttribute("data-status", "busy");
    return;
  }

  //If lift is somewhere else than the targeted floor
  let distanceToTravel = Math.abs(
    targetFloor - Number(availableLift.dataset.pos)
  );
  availableLift.style.transition = `transform ${distanceToTravel * 2}s linear`;
  availableLift.style.transform = `translateY(${-200 * targetFloor}px)`;
  availableLift.setAttribute("data-status", "busy");

  //Make the status of lift free after certain time
  setTimeout(() => {
    DoorAnimation(availableLift);
  }, distanceToTravel * 2000);

  setTimeout(() => {
    availableLift.setAttribute("data-status", "free");
    availableLift.setAttribute("data-pos", targetFloor);
  }, distanceToTravel * 2000 + 5000);
}

// Check whether the lifts are free or not (  lift  then return TRUE or  return FALSE)
function checkAvailability() {
  console.log("check availabiltity called");
  const lifts = Array.from(document.getElementsByClassName("Lift"));
  console.log("lifts", lifts);
  const availableLift = lifts.find((lift) => lift.dataset.status === "free");
  console.log("available lift ", availableLift);
  if (availableLift) {
    return true;
  } else {
    return false;
  }
}

//Check for any requests in the queue and process it
function checkQueue() {
  // console.log("cheeck queue");
  if (liftRequestQueue.length === 0) {
    return;
  } else {
    let target = liftRequestQueue[0];
    // console.log("target", target);
    if (checkAvailability()) {
      liftRequestQueue.shift();
      // console.log("inside checkAvailability if statement");

      moveLift(target);
    } else {
      return;
    }
  }
}

//Door Animation

function DoorAnimation(availableLift) {
  setTimeout(() => {
    availableLift.children[0].classList.add("leftDoorAnimate");
    availableLift.children[1].classList.add("rightDoorAnimate");
  }, 500);
  setTimeout(() => {
    availableLift.children[0].classList.remove("leftDoorAnimate");
    availableLift.children[1].classList.remove("rightDoorAnimate");
  }, 3000);
}
