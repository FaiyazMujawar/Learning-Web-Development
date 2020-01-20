let drums = document.querySelectorAll(".drum");

drums.forEach(drum => {
    drum.addEventListener("click", () => {
        alert("I got clicked!");
    })
})