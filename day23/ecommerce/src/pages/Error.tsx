import { Link } from "react-router-dom";
export default function Error() {
  return (
    <div className="error">
      Error Go Back to Home
      <Link to="/">Home</Link>
    </div>
  );
}
