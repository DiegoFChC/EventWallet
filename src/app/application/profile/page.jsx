import "./profile.css";

export default function Profile() {
  return (
    <div className="Profile">
      // Header
      <div className="container">
        <h1>Bienvenido NOMBRE</h1>
        <div className="form">
          <div className="inputs">
            <label for="name">Nombres</label>
            <input type="text" id="name" name="name" disabled />
          </div>
          <div className="inputs">
            <label for="lastname">Apellidos</label>
            <input type="text" id="lastname" name="name" disabled />
          </div>
          <div className="inputs">
            <label for="nickname">Nombres</label>
            <input type="number" id="days" name="name" disabled />
          </div>
          <div className="inputs">
            <label for="name">Nombres</label>
            <input type="number" id="days" name="days" disabled />
          </div>
          <button>Editar datos</button>
        </div>
        <div className="options">
          <button>Cambiar contraseña</button>
          <button>Desactivar mi cuenta</button>
        </div>
      </div>
    </div>
  );
}
