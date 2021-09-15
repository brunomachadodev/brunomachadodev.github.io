function handleShowExtraText(idNumber) {
  const dots = document.getElementById(`dots-${idNumber}`);
  const moreText = document.getElementById(`extra-${idNumber}`);
  const buttonText = document.getElementById(`ler-${idNumber}`);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    buttonText.innerHTML = "Ler mais";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    buttonText.innerHTML = "Ler menos";
    moreText.style.display = "inline";
  }
}

var elem = document.getElementsByClassName("dots");

Array.from(elem).forEach((a, index) => {
  let i = index + 1;

  document.getElementById(`ler-${i}`).addEventListener("click", () => {
    handleShowExtraText(i);
  });
});
