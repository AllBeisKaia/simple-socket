window.onload = () => {
  const bodyEl = document.getElementById("wrapper");

  const unit = document.querySelector(".unit");

  unit.style.backgroundColor = Math.random() < 0.5 ? "red" : "green";

  // ws connection

  const ws = new WebSocket("ws://localhost:5000");

  const step = 5;

  bodyEl.addEventListener("keyup", (e) => {
    let top = unit.style.top ? unit.style.top : 0;
    let left = unit.style.left ? unit.style.left : 0;

    let c = e.code;

    if (c == "ArrowUp") {
      unit.style.top = parseInt(top) - 5 + "px";
    } else if (c == "ArrowDown") {
      unit.style.top = parseInt(top) + 5 + "px";
    } else if (c == "ArrowLeft") {
      unit.style.left = parseInt(left) - 5 + "px";
    } else if (c == "ArrowRight") {
      unit.style.left = parseInt(left) + 5 + "px";
    }

    let positionData = {
      top: unit.style.top,
      left: unit.style.left,
    };

    ws.send(JSON.stringify(positionData));
  });

  ws.onopen = () => {
    console.log('ws connected')
  }

  ws.onmessage = (res) => {
    let mes = JSON.parse(res.data);

    unit.style.top = mes.top;
    unit.style.left = mes.left;
  };
};
