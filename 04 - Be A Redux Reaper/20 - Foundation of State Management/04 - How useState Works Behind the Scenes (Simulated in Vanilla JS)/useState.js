let states = [];
let stateIndex = 0;

function useState(initialValue) {
    const currentIndex = stateIndex;

    // Initialize only once
    if (states[currentIndex] === undefined) {
        states[currentIndex] = initialValue;
    }

    // Setter updates value and triggers "render"
    function setValue(newValue) {
        states[currentIndex] = newValue;
        render();
    }

    stateIndex++;
    return [states[currentIndex], setValue];
}

function Counter() {
  const [count, setCount] = useState(0);
  console.log("Render:", count);

  return {
    click: () => setCount(count + 1)
  };
}

function render() {
  stateIndex = 0;      // reset before each render
  app = Counter();     // re-run the component
}


let app;
render();          // Render 1 → count = 0
app.click();       // Trigger state change
// → setCount → render again → count = 1
app.click();       // → count = 2
