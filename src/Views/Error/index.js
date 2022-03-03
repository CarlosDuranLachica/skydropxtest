// hooks react redux
import { useSelector } from "react-redux";

// icons
import Error_image from "../../Icons/Error_image.png";

// style
import { Button, Col } from "antd";

const Index = () => {
  const error = useSelector((store) => store.DataSkydropx.error);
  return (
    <Col>
      <img
        src={Error_image}
        alt="Imagen de error"
        style={{ maxWidth: "80%", margin: "0 auto 20px" }}
      />
      <div style={{ fontSize: "23px", margin: "0 auto 20px" }}>
        <h1>Error</h1>
        <h3>{error.message}</h3>
        <h5>{error.code}</h5>
      </div>
      <Button
        type="primary"
        onClick={() => {
          window.location.href = window.location.origin;
        }}
      >
        Regresar
      </Button>
    </Col>
  );
};

export default Index;
