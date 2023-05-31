// var numberOfLifts = document.querySelector("#number-of-lifts");
// var numberOfFloors = document.querySelector("#number-of-floors");
 var submitButton = document.querySelector(".submit-button");





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
  

    
}
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
                    <button class="lift-control up">UP</button>
                    <p class="floor-number">Floor-${floorNumber}</p> 
                    <button class="lift-control down">DOWN</button>
                </section>
        `;
     
      floorsContainer.appendChild(presentFloor);
    
    }
    const groundFloor = document.createElement("section");
    groundFloor.className = "floor";
    groundFloor.id = `floor-0`;
    groundFloor.innerHTML = `
            <section class="floor-details">
                <button class="lift-control up" >UP</button>
                <p class="floor-number">Floor-0</p> 
            </section>
    `;
    groundFloor
      .querySelector(".up")
      .addEventListener("click", (event) => handleLiftCall(event));
    floorsContainer.appendChild(groundFloor);

}

