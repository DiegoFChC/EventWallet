import "./header.css";

export const Header = ({ title, information }) => {
  return (
    <div className="Header">
      <h1>{title}</h1>
      <h4>{information}</h4>
    </div>
  );
};
