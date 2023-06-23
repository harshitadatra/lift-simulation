// var numberOfLifts = document.querySelector("#number-of-lifts");
// var numberOfFloors = document.querySelector("#number-of-floors");
 var submitButton = document.querySelector(".submit-button");


let liftRequestQueue = [];

//Check for any Lift Request in every 200msec.
document.addEventListener("DOMContentLoaded", function () {
  let id = setInterval(checkQueue, 200);
});



submitButton.addEventListener("click",clickHandler);
 
function clickHandler()
{
    const numberOfLifts = document.querySelector('#number-of-lifts');
    const numberOfFloors = document.querySelector('#number-of-floors');

    const floorCount = numberOfFloors.value;
    const liftCount = numberOfLifts.value;

    console.log(numberOfFloors.value)
    console.log(numberOfLifts.value);
    // checking for invalid flooor count or lift count

    if(floorCount<=0 || floorCount >=100 || liftCount<=0 || liftCount >10)
    {
        alert("enter valid input");
        return;
    }

    renderFloors(floorCount);
    renderLifts(liftCount);
  

    
}
addEventListener("click", (e) => {
console.log("butotn")
  if (
    e.target.classList.contains("up") ||
    e.target.classList.contains("down")
  ) {
    liftRequestQueue.push(e.target.dataset.floorno);
  }
});
function renderFloors(totalFloors)
{
    const floorsContainer = document.querySelector("#floors-container");
    for (let floorNumber = totalFloors; floorNumber > 0; floorNumber--) {
      const presentFloor = document.createElement("section");
      presentFloor.className = "floor";
      const floorId = `floor-${floorNumber}`;
      presentFloor.id = floorId;
      presentFloor.innerHTML = `
                <section class="floor-details">
                    <button class=" up" data-floorNo="${floorNumber}">UP</button>
                    <p class="floor-number">Floor-${floorNumber}</p> 
                    <button class=" down" data-floorNo="${floorNumber}">DOWN</button>
                </section>
        `;
     
      floorsContainer.appendChild(presentFloor);
    
    }
    const groundFloor = document.createElement("section");
    groundFloor.className = "floor";
    groundFloor.id = `floor-0`;
    groundFloor.innerHTML = `
            <section class="floor-details ">
                <button class=" up"  data-floorNo="0">UP</button>
                <p class="floor-number">Floor-0</p> 
            </section>
    `;
   
    floorsContainer.appendChild(groundFloor);

}

function renderLifts(totalLifts)
{
  const groundFloor = document.querySelector("#floors-container>#floor-0");
  for (let liftNumber = 1; liftNumber <= totalLifts; liftNumber++) {
    const currentLift = document.createElement("section");
    currentLift.className = "Lift";
    currentLift.id = `Lift-${liftNumber}`;
    currentLift.innerHTML = `
            <section></section>
            
        `;
   
    groundFloor.appendChild(currentLift);
  }
}

// fucntion to move llift 

function moveLift(targetFloor) {
  const lifts = Array.from(document.getElementsByClassName("Lift"));
  const availableLift = lifts.find((lift) => lift.dataset.status === "free");
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

// Check if any lift is free (TRUE: Any lift is free; else FALSE)
function checkAvailability() {
  const lifts = Array.from(document.getElementsByClassName("Lift"));
  const availableLift = lifts.find((lift) => lift.dataset.status === "free");
  if (availableLift) {
    return true;
  } else {
    return false;
  }
}

//Check for any requests in the queue and process it
function checkQueue() {
  console.log("checke sskjhfkdjf")
  if (liftRequestQueue.length === 0) {
    return;
  } else {
    let target = liftRequestQueue[0];
    if (checkAvailability()) {
      liftRequestQueue.shift();
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

