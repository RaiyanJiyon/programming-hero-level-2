const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log("After setCount:", count);
}