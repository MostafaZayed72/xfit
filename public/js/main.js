/* start collapse */
// Get all elements with data-toggle="collapse"
// const toggleButtons = document.querySelectorAll('[data-toggle="collapse"]');

// Add event listener to each toggle button
// toggleButtons.forEach(function (toggleButton) {
//    toggleButton.addEventListener("click", function () {
//       const targetId = this.getAttribute("data-target");
//       const targetElement = document.getElementById(targetId);

//       // Toggle the visibility of the target element
//       targetElement.classList.toggle("hidden");
//    });
// });
/* end collapse */

/* start dropdown */
// Get all elements with the class name 'dropdown-toggle'
// const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

// Loop through the dropdownButtons and add a click event listener to each
// dropdownButtons.forEach(function (button) {
//    const dropdownMenu = button.parentNode.querySelector(".dropdown-menu");
//    if (dropdownMenu) {
//       button.addEventListener("click", function () {
//          dropdownMenu.style.display = "block";
//       });

//       window.addEventListener("mouseup", (e) => {
//          dropdownMenu.style.display = "none";
//       });
//    }
// });
/* end dropdown */
/* start modal */

window.addEventListener("mouseup", (e) => {
   /* open dropdown */
   if (e.target.classList.value.includes("dropdown-toggle"))
      openDropdown(e.target);

   /* close dropdown */
   // if (
   //    !e.target.parentNode.classList.value.includes("dropdown") ||
   //    !e.target.parentNode.classList.value.includes("dropdown-menu")
   // )
   //    closeDropdown();

   /* open modal */
   if (e.target.attributes["data-toggle"]?.value == "modal") {
      openModal(e.target.attributes["data-target"]?.value);
   }

   /* close modal */
   if (e.target.classList.value.includes("modal")) closeModal();

   // Toggle collapsed element
   if (e.target.attributes["data-toggle"]?.value == "collapse") {
      toggleCollapsed(e.target.attributes["data-target"]?.value);
   }
});

window.addEventListener("keydown", function (e) {
   if (e.key == "Escape") {
      closeModal();
      closeDropdown();
   }
});

function openDropdown(clickedTarget) {
   const dropdownMenu =
      clickedTarget.parentNode.querySelector(".dropdown-menu");
   if (dropdownMenu) {
      dropdownMenu.style.display = "block";

      // dropdownMenu.addEventListener("focusout", (e) => {
      //    dropdownMenu.style.display = "none";
      // });
   }
}

function closeDropdown() {
   const dropdownMenus = document.querySelectorAll(".dropdown-menu");
   dropdownMenus.forEach((dropdownMenu) => {
      dropdownMenu.style.display = "none";
   });
}

function openModal(modalID) {
   const modal = document.getElementById(modalID);
   if (modal) {
      modal.style.display = "flex";
      if (modal.getElementsByTagName("input")[0])
         modal.getElementsByTagName("input")[0].focus();
   } else console.log("cannot find " + modalID);
}

function closeModal() {
   const modals = document.querySelectorAll(".modal");
   modals.forEach((modal) => {
      modal.style.display = "none";
   });
}

function toggleCollapsed(targetID) {
   const targetElement = document.getElementById(targetID);
   targetElement.classList.toggle("hidden");
}
