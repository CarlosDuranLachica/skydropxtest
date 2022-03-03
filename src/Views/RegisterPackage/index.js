// dependencias
import { useNavigate } from "react-router-dom";

// hooks react redux
import { useDispatch } from "react-redux";

// importamos la acción
import { shipmentsAction } from "../../Redux/Reducers";

// style
import { Card, Row, Form, Input, InputNumber, Button } from "antd";

const Index = () => {
  let navigate = useNavigate();

  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(shipmentsAction(values));
    navigate("/SelectPackageService");
  };

  const layout = {
    labelCol: { span: 9, style: {} },
    wrapperCol: { span: 9 },
  };

  const validateMessages = {
    required: "Falta ${label}!",
    types: {
      number: "${label} no es un numero!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <Card className="container-card shadow">
      <h1>Registro de envios</h1>
      <Form
        {...layout}
        validateMessages={validateMessages}
        name="control-ref"
        onFinish={(e) => onFinish(e)}
        style={{
          width: "60%",
          maxWidth: "755px",
          minWidth: "300px",
          margin: "0 auto",
        }}
      >
        <Form.Item
          name="zip_from"
          label="CP de quien envia"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="zip_to"
          label="CP de quien recibe"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <h3 style={{ width: "100%" }}>Datos del paquete</h3>

        <Form.Item
          label="Peso"
          name={["parcel", "weight"]}
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber placeholder="KG" />
        </Form.Item>

        <Form.Item
          label="Alto"
          name={["parcel", "height"]}
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber placeholder="CM" />
        </Form.Item>

        <Form.Item
          label="Ancho"
          name={["parcel", "width"]}
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber placeholder="CM" />
        </Form.Item>

        <Form.Item
          label="Largo"
          name={["parcel", "length"]}
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber placeholder="CM" />
        </Form.Item>

        <Row justify="center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default Index;
