
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const textInput = document.getElementById("text");
const sizeInput = document.getElementById("size");
const blurInput = document.getElementById("blur");
const customColor = document.getElementById("customColor");
const sizeValue = document.getElementById("sizeValue");
const blurValue = document.getElementById("blurValue");
const status = document.getElementById("status");

let background = "#8ACE00";
let uppercase = false;

function render() {
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, W, H);

  const text = uppercase
    ? textInput.value.toUpperCase()
    : textInput.value;

  let fontSize = Number(sizeInput.value);
  const maxWidth = W * 0.91;
  const blur = Number(blurInput.value);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#111111";
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = blur * (W / 1024);

  // Sesuaikan font agar teks muat di kanvas.
  ctx.font = `italic ${fontSize}px Arial, Helvetica, sans-serif`;

  while (ctx.measureText(text || " ").width > maxWidth && fontSize > 16) {
    fontSize--;
    ctx.font = `italic ${fontSize}px Arial, Helvetica, sans-serif`;
  }

  ctx.fillText(text, W / 2, H / 2, maxWidth);
  ctx.shadowBlur = 0;

  sizeValue.textContent = sizeInput.value;
  blurValue.textContent = `${blurInput.value} px`;
}

textInput.addEventListener("input", render);
sizeInput.addEventListener("input", render);
blurInput.addEventListener("input", render);

document.querySelectorAll(".swatch").forEach(button => {
  button.addEventListener("click", () => {
    background = button.dataset.color;

    document.querySelectorAll(".swatch").forEach(swatch => {
      swatch.classList.toggle("active", swatch === button);
    });

    customColor.value = background;
    render();
  });
});

customColor.addEventListener("input", () => {
  background = customColor.value;
  document.querySelectorAll(".swatch").forEach(swatch => {
    swatch.classList.remove("active");
  });
  render();
});

document.getElementById("caseButton").addEventListener("click", event => {
  uppercase = !uppercase;
  event.currentTarget.textContent = uppercase
    ? "Aa / lowercase"
    : "Aa / UPPERCASE";
  render();
});

document.getElementById("download").addEventListener("click", () => {
  try {
    const link = document.createElement("a");
    link.download = "brat-sticker.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    status.textContent = "Stiker siap! Cek folder Downloads lu.";
  } catch (error) {
    status.textContent = "Gagal download. Coba browser lain.";
  }
});

render();
